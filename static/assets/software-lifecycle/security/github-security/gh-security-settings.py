#!/usr/bin/env python3

"""
GitHub Security Settings Manager
Manages specific GitHub security settings for a repository:
- Private vulnerability reporting
- Dependency graph
- Dependabot alerts
- Dependabot security updates
- Code scanning
- Secret scanning push protection
"""

import argparse
import json
import logging
import sys
from typing import Dict, Optional, Tuple

import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
from rich.console import Console
from rich.table import Table
from rich import print as rprint

# Setup logging
logging.basicConfig(level=logging.WARNING)
logger = logging.getLogger(__name__)

# Initialize Rich console
console = Console()


class GitHubSecurityManager:
    """Manages GitHub security settings for a repository"""

    def __init__(self, owner: str, repo: str, token: str):
        self.owner = owner
        self.repo = repo
        self.token = token
        self.base_url = "https://api.github.com"
        self.session = self._create_session()

    def _create_session(self) -> requests.Session:
        """Create a requests session with retry strategy"""
        session = requests.Session()
        retry_strategy = Retry(
            total=3,
            backoff_factor=1,
            status_forcelist=[429, 500, 502, 503, 504],
        )
        adapter = HTTPAdapter(max_retries=retry_strategy)
        session.mount("http://", adapter)
        session.mount("https://", adapter)

        session.headers.update({
            'Authorization': f'token {self.token}',
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        })
        return session

    def github_api(self, method: str, endpoint: str, data: Optional[Dict] = None) -> Tuple[int, Dict]:
        """Make GitHub API calls and return status code and response body"""
        url = f"{self.base_url}{endpoint}"

        try:
            if data:
                response = self.session.request(method, url, json=data)
            else:
                response = self.session.request(method, url)

            # Try to parse JSON response, return empty dict if not JSON
            try:
                response_data = response.json()
            except (json.JSONDecodeError, ValueError):
                response_data = {}

            return response.status_code, response_data

        except requests.RequestException as e:
            console.print(f"[red]✗[/red] Request failed: {e}")
            return 0, {}

    def check_repository(self) -> bool:
        """Check if repository exists and is accessible"""
        status_code, data = self.github_api('GET', f'/repos/{self.owner}/{self.repo}')

        if status_code == 200:
            return True
        else:
            console.print(f"[red]✗[/red] Repository not found or no access (HTTP {status_code})")
            return False

    def check_private_reporting(self) -> bool:
        """Check if private vulnerability reporting is enabled"""
        # Try the dedicated endpoint first
        status_code, data = self.github_api('GET', f'/repos/{self.owner}/{self.repo}/private-vulnerability-reporting')

        if status_code == 200:
            return data.get('enabled', False)
        elif status_code == 404 or status_code == 422:
            # Feature not available or disabled
            return False

        # Fallback to repository endpoint
        status_code, data = self.github_api('GET', f'/repos/{self.owner}/{self.repo}')

        if status_code == 200:
            security_analysis = data.get('security_and_analysis', {})
            private_reporting = security_analysis.get('private_vulnerability_reporting', {})
            return private_reporting.get('status') == 'enabled'
        else:
            return False

    def check_dependency_graph(self) -> bool:
        """Check if dependency graph is enabled"""
        # Try the repository endpoint first
        status_code, data = self.github_api('GET', f'/repos/{self.owner}/{self.repo}')

        if status_code == 200:
            # Check if the repository is private
            is_private = data.get('private', False)

            # For private repos, check security_and_analysis
            if is_private:
                security_analysis = data.get('security_and_analysis', {})
                dependency_graph = security_analysis.get('dependency_graph', {})
                if dependency_graph:
                    return dependency_graph.get('status') == 'enabled'

            # For public repos, we need to check the vulnerability alerts
            # If vulnerability alerts are enabled, dependency graph is enabled
            status_code, _ = self.github_api('GET', f'/repos/{self.owner}/{self.repo}/vulnerability-alerts')
            return status_code == 204

        return False

    def check_dependabot_alerts(self) -> bool:
        """Check if Dependabot alerts are enabled"""
        status_code, _ = self.github_api('GET', f'/repos/{self.owner}/{self.repo}/vulnerability-alerts')
        return status_code == 204

    def check_dependabot_updates(self) -> bool:
        """Check if Dependabot security updates are enabled"""
        status_code, response_data = self.github_api('GET', f'/repos/{self.owner}/{self.repo}/automated-security-fixes')
        logger.debug(f"Dependabot security updates check: status_code={status_code}, response={response_data}")

        if status_code == 200:
            # GitHub returns 200 with JSON response containing enabled status
            return response_data.get('enabled', False)
        elif status_code == 204:
            # Some repositories might still return 204 for enabled
            return True
        else:
            # Any other status code means disabled or error
            return False

    def check_secret_scanning(self) -> bool:
        """Check if secret scanning is enabled"""
        status_code, data = self.github_api('GET', f'/repos/{self.owner}/{self.repo}')

        if status_code == 200:
            security_analysis = data.get('security_and_analysis', {})
            secret_scanning = security_analysis.get('secret_scanning', {})
            return secret_scanning.get('status') == 'enabled'
        else:
            return False

    def check_secret_protection(self) -> bool:
        """Check if secret scanning push protection is enabled"""
        status_code, data = self.github_api('GET', f'/repos/{self.owner}/{self.repo}')

        if status_code == 200:
            security_analysis = data.get('security_and_analysis', {})
            push_protection = security_analysis.get('secret_scanning_push_protection', {})
            return push_protection.get('status') == 'enabled'
        else:
            return False

    def check_settings(self) -> None:
        """Check and display current security settings"""
        if not self.check_repository():
            return

        # Create Rich table
        table = Table(show_header=True, header_style="bold blue")
        table.add_column("Repo", style="cyan", no_wrap=True)
        table.add_column("Status", justify="center")
        table.add_column("Setting", style="magenta")

        repo_name = f"{self.owner}/{self.repo}"

        # Check all security settings
        settings = [
            ("Private Repository Reporting", self.check_private_reporting()),
            ("Dependency Graph", self.check_dependency_graph()),
            ("Dependabot Alerts", self.check_dependabot_alerts()),
            ("Dependabot Security Updates", self.check_dependabot_updates()),
            ("Secret Scanning", self.check_secret_scanning()),
            ("Secret Scanning Push Protection", self.check_secret_protection())
        ]

        for setting_name, is_enabled in settings:
            status = "[green]✓[/green]" if is_enabled else "[red]✗[/red]"
            table.add_row(repo_name, status, setting_name)

        console.print()
        console.print(table)
        console.print()

    def enable_private_reporting(self) -> None:
        """Enable private vulnerability reporting"""
        logger.debug("Enabling private vulnerability reporting...")

        # Use the dedicated endpoint
        data = {"enabled": True}
        status_code, _ = self.github_api('PUT', f'/repos/{self.owner}/{self.repo}/private-vulnerability-reporting', data)

        if status_code == 204:
            console.print(f"[green]✓[/green] Private vulnerability reporting enabled")
        else:
            console.print(f"[red]✗[/red] Failed to enable private vulnerability reporting (HTTP {status_code})")

    def enable_dependency_graph(self) -> None:
        """Enable dependency graph"""
        logger.debug("Enabling dependency graph...")
        data = {
            "security_and_analysis": {
                "dependency_graph": {"status": "enabled"}
            }
        }
        status_code, _ = self.github_api('PATCH', f'/repos/{self.owner}/{self.repo}', data)

        if status_code == 200:
            console.print(f"[green]✓[/green] Dependency graph enabled")
        else:
            console.print(f"[red]✗[/red] Failed to enable dependency graph (HTTP {status_code})")

    def enable_dependabot_alerts(self) -> None:
        """Enable Dependabot alerts"""
        logger.debug("Enabling Dependabot alerts...")
        status_code, _ = self.github_api('PUT', f'/repos/{self.owner}/{self.repo}/vulnerability-alerts')

        if status_code == 204:
            console.print(f"[green]✓[/green] Dependabot alerts enabled")
        else:
            console.print(f"[red]✗[/red] Failed to enable Dependabot alerts (HTTP {status_code})")

    def enable_dependabot_updates(self) -> None:
        """Enable Dependabot security updates"""
        logger.debug("Enabling Dependabot security updates...")
        status_code, _ = self.github_api('PUT', f'/repos/{self.owner}/{self.repo}/automated-security-fixes')

        if status_code == 204:
            console.print(f"[green]✓[/green] Dependabot security updates enabled")
        else:
            console.print(f"[red]✗[/red] Failed to enable Dependabot security updates (HTTP {status_code})")

    def enable_secret_scanning(self) -> None:
        """Enable secret scanning"""
        logger.debug("Enabling secret scanning...")
        data = {
            "security_and_analysis": {
                "secret_scanning": {"status": "enabled"}
            }
        }
        status_code, _ = self.github_api('PATCH', f'/repos/{self.owner}/{self.repo}', data)

        if status_code == 200:
            console.print(f"[green]✓[/green] Secret scanning enabled")
        else:
            console.print(f"[red]✗[/red] Failed to enable secret scanning (HTTP {status_code})")

    def enable_secret_protection(self) -> None:
        """Enable secret scanning push protection"""
        logger.debug("Enabling secret scanning push protection...")

        # First make sure secret scanning is enabled
        data = {
            "security_and_analysis": {
                "secret_scanning": {"status": "enabled"},
                "secret_scanning_push_protection": {"status": "enabled"}
            }
        }
        status_code, _ = self.github_api('PATCH', f'/repos/{self.owner}/{self.repo}', data)

        if status_code == 200:
            console.print(f"[green]✓[/green] Secret scanning push protection enabled")
        else:
            console.print(f"[red]✗[/red] Failed to enable secret scanning push protection (HTTP {status_code})")

    def disable_private_reporting(self) -> None:
        """Disable private vulnerability reporting"""
        logger.debug("Disabling private vulnerability reporting...")

        # Use the dedicated endpoint
        status_code, response_data = self.github_api('DELETE', f'/repos/{self.owner}/{self.repo}/private-vulnerability-reporting')

        if status_code == 204:
            console.print(f"[green]✓[/green] Private vulnerability reporting disabled")
        elif status_code == 404:
            # If 404, the feature might already be disabled or not available
            console.print(f"[green]✓[/green] Private vulnerability reporting is already disabled or not available")
        elif status_code == 422:
            # 422 can happen when the feature is already disabled
            console.print(f"[green]✓[/green] Private vulnerability reporting is already disabled")
        else:
            console.print(f"[red]✗[/red] Failed to disable private vulnerability reporting (HTTP {status_code})")

    def disable_dependency_graph(self) -> None:
        """Disable dependency graph"""
        logger.debug("Disabling dependency graph...")

        # Try to disable dependency graph via vulnerability alerts endpoint
        status_code, _ = self.github_api('DELETE', f'/repos/{self.owner}/{self.repo}/vulnerability-alerts')

        if status_code == 204:
            console.print(f"[green]✓[/green] Dependency graph disabled")
        elif status_code == 404:
            # If 404, the feature might already be disabled or not available
            console.print(f"[green]✓[/green] Dependency graph is already disabled or not available")
        else:
            console.print(f"[red]✗[/red] Failed to disable dependency graph (HTTP {status_code})")

    def disable_dependabot_alerts(self) -> None:
        """Disable Dependabot alerts"""
        logger.debug("Disabling Dependabot alerts...")
        status_code, _ = self.github_api('DELETE', f'/repos/{self.owner}/{self.repo}/vulnerability-alerts')

        if status_code == 204:
            console.print(f"[green]✓[/green] Dependabot alerts disabled")
        elif status_code == 404:
            # If 404, the feature might already be disabled or not available
            console.print(f"[green]✓[/green] Dependabot alerts are already disabled or not available")
        else:
            console.print(f"[red]✗[/red] Failed to disable Dependabot alerts (HTTP {status_code})")

    def disable_dependabot_updates(self) -> None:
        """Disable Dependabot security updates"""
        logger.debug("Disabling Dependabot security updates...")
        status_code, response_data = self.github_api('DELETE', f'/repos/{self.owner}/{self.repo}/automated-security-fixes')

        if status_code == 204:
            console.print(f"[green]✓[/green] Dependabot security updates disabled")
        elif status_code == 404:
            # If 404, the feature might already be disabled or not available
            console.print(f"[green]✓[/green] Dependabot security updates are already disabled or not available")
        elif status_code == 422:
            # 422 can happen when the feature is already disabled or when Dependabot alerts are disabled
            # In this case, we should consider it a success since the end state is what we want
            console.print(f"[green]✓[/green] Dependabot security updates are already disabled")
        else:
            console.print(f"[red]✗[/red] Failed to disable Dependabot security updates (HTTP {status_code})")

    # CodeQL/Code scanning methods removed - functionality no longer supported

    def disable_secret_scanning(self) -> None:
        """Disable secret scanning"""
        logger.debug("Disabling secret scanning...")
        data = {
            "security_and_analysis": {
                "secret_scanning": {"status": "disabled"}
            }
        }
        status_code, _ = self.github_api('PATCH', f'/repos/{self.owner}/{self.repo}', data)

        if status_code == 200:
            console.print(f"[green]✓[/green] Secret scanning disabled")
        elif status_code == 404:
            # If 404, the feature might already be disabled or not available
            console.print(f"[green]✓[/green] Secret scanning is already disabled or not available")
        else:
            console.print(f"[red]✗[/red] Failed to disable secret scanning (HTTP {status_code})")

    def disable_secret_protection(self) -> None:
        """Disable secret scanning push protection"""
        logger.debug("Disabling secret scanning push protection...")
        data = {
            "security_and_analysis": {
                "secret_scanning_push_protection": {"status": "disabled"}
            }
        }
        status_code, _ = self.github_api('PATCH', f'/repos/{self.owner}/{self.repo}', data)

        if status_code == 200:
            console.print(f"[green]✓[/green] Secret scanning push protection disabled")
        elif status_code == 404:
            # If 404, the feature might already be disabled or not available
            console.print(f"[green]✓[/green] Secret scanning push protection is already disabled or not available")
        else:
            console.print(f"[red]✗[/red] Failed to disable secret scanning push protection (HTTP {status_code})")

    def enable_features(self, features: str) -> None:
        """Enable specified security features"""
        feature_methods = {
            'all': [
                self.enable_private_reporting,
                self.enable_dependency_graph,
                self.enable_dependabot_alerts,
                self.enable_dependabot_updates,
                self.enable_secret_scanning,
                self.enable_secret_protection
            ],
            'private-reporting': [self.enable_private_reporting],
            'dependency-graph': [self.enable_dependency_graph],
            'dependabot-alerts': [self.enable_dependabot_alerts],
            'dependabot-updates': [self.enable_dependabot_updates],
            'secret-scanning': [self.enable_secret_scanning],
            'secret-protection': [self.enable_secret_protection]
        }

        methods = feature_methods.get(features)
        if not methods:
            self.print_status('error', f"Unknown feature: {features}")
            return

        for method in methods:
            method()

    def disable_features(self, features: str) -> None:
        """Disable specified security features"""
        feature_methods = {
            'all': [
                self.disable_private_reporting,
                self.disable_dependency_graph,
                self.disable_dependabot_alerts,
                self.disable_dependabot_updates,
                self.disable_secret_scanning,
                self.disable_secret_protection
            ],
            'private-reporting': [self.disable_private_reporting],
            'dependency-graph': [self.disable_dependency_graph],
            'dependabot-alerts': [self.disable_dependabot_alerts],
            'dependabot-updates': [self.disable_dependabot_updates],
            'secret-scanning': [self.disable_secret_scanning],
            'secret-protection': [self.disable_secret_protection]
        }

        methods = feature_methods.get(features)
        if not methods:
            self.print_status('error', f"Unknown feature: {features}")
            return

        for method in methods:
            method()


def main():
    """Main function to handle command line arguments and execute actions"""
    parser = argparse.ArgumentParser(
        description='GitHub Security Settings Manager',
        epilog='''
Examples:
  # Check all security settings
  %(prog)s -o myorg -r myrepo -t ghp_xxxxx

  # Enable all security features
  %(prog)s -o myorg -r myrepo -t ghp_xxxxx -a enable

  # Enable only Dependabot alerts
  %(prog)s -o myorg -r myrepo -t ghp_xxxxx -a enable -f dependabot-alerts

  # Disable secret scanning push protection
  %(prog)s -o myorg -r myrepo -t ghp_xxxxx -a disable -f secret-protection

Features:
  all                     - All supported security features
  private-reporting       - Private vulnerability reporting
  dependency-graph        - Dependency graph
  dependabot-alerts       - Dependabot vulnerability alerts
  dependabot-updates      - Dependabot security updates
  secret-scanning         - Secret scanning
  secret-protection       - Secret scanning push protection

Required Token Permissions:
  - repo (for private repositories)
  - public_repo (for public repositories)
  - security_events (for security features)
  - admin:repo_hook (for some security settings)
        ''',
        formatter_class=argparse.RawDescriptionHelpFormatter
    )

    parser.add_argument('-o', '--owner', required=True,
                       help='GitHub repository owner/organization')
    parser.add_argument('-r', '--repo', required=True,
                       help='GitHub repository name')
    parser.add_argument('-t', '--token', required=True,
                       help='GitHub personal access token')
    parser.add_argument('-a', '--action', choices=['check', 'enable', 'disable'],
                       default='check', help='Action to perform (default: check)')
    parser.add_argument('-f', '--features',
                       choices=['all', 'private-reporting', 'dependency-graph',
                               'dependabot-alerts', 'dependabot-updates',
                               'secret-scanning', 'secret-protection'],
                       default='all', help='Features to manage (default: all)')
    parser.add_argument('-v', '--verbose', action='store_true',
                       help='Enable verbose debug logging')

    args = parser.parse_args()

    # Set logging level based on verbose flag
    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)

    # Create GitHub security manager instance
    manager = GitHubSecurityManager(args.owner, args.repo, args.token)

    # Execute the requested action
    try:
        if args.action == 'check':
            manager.check_settings()
        elif args.action == 'enable':
            console.print(f"\n[bold blue]Enabling Security Features for {args.owner}/{args.repo}[/bold blue]\n")
            manager.enable_features(args.features)
        elif args.action == 'disable':
            console.print(f"\n[bold blue]Disabling Security Features for {args.owner}/{args.repo}[/bold blue]\n")
            manager.disable_features(args.features)

    except KeyboardInterrupt:
        console.print(f"\n[yellow]Operation cancelled by user[/yellow]")
        sys.exit(1)
    except Exception as e:
        console.print(f"\n[red]Error: {e}[/red]")
        sys.exit(1)


if __name__ == '__main__':
    main()
