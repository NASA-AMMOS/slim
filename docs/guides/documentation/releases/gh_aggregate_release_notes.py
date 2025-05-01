import requests
import yaml
import argparse
from urllib.parse import urlparse
from time import sleep
from tqdm import tqdm
import random

def read_config(file_path):
    """
    Reads the YAML configuration file and returns its contents.
    
    Args:
        file_path (str): The path to the YAML configuration file.
        
    Returns:
        dict: The contents of the YAML file if successful, None otherwise.
    """
    with open(file_path, 'r') as stream:
        try:
            return yaml.safe_load(stream)
        except yaml.YAMLError as exc:
            print(exc)
            return None

def get_release_notes(url, github_token):
    """
    Extracts the owner, repo, and tag from the given GitHub URL and retrieves the release notes using the GitHub API.
    Implements retries with exponential backoff and jitter for handling API rate limits and network issues.
    
    Args:
        url (str): The URL of the GitHub release tag page.
        github_token (str): The GitHub token used for authentication.
    
    Returns:
        str: The release notes text if successful, empty string otherwise.
    """
    parsed_url = urlparse(url)
    hostname = parsed_url.hostname
    path_parts = parsed_url.path.split('/')
    owner, repo, tag = path_parts[1], path_parts[2], path_parts[-1]

    # Be agnostic to GitHub.com or GitHub Enterprise repo URLs
    api_url_prefix = f"https://api.github.com/repos/{owner}/{repo}" if hostname == "github.com" else f"https://{hostname}/api/v3/repos/{owner}/{repo}"
    api_url = f"{api_url_prefix}/releases/tags/{tag}"
    headers = {
        "Authorization": f"token {github_token}",
        "Accept": "application/vnd.github.v3+json"
    }

    max_retries = 5
    retry_num = 0
    backoff_factor = 2
    while retry_num < max_retries:
        response = requests.get(api_url, headers=headers)
        if response.status_code == 200:
            return response.json().get("body", "")
        else:
            print(f"Error fetching release notes for {url}: {response.status_code}. Retrying...")
            sleep_time = backoff_factor * (2 ** retry_num) + random.uniform(0, 1)
            sleep(sleep_time)
            retry_num += 1

    print(f"Failed to fetch release notes after {max_retries} attempts.")
    return ""

def main(config_file):
    """
    Main function to aggregate GitHub release notes.
    It reads a YAML configuration file for GitHub repository URLs and a GitHub token,
    then retrieves and prints the release notes for each repository URL listed.
    
    Args:
        config_file (str): The path to the YAML configuration file containing the GitHub token and URLs.
    """
    config = read_config(config_file)
    if not config:
        print("Failed to read configuration.")
        return
    
    github_token = config.get("github_token")
    urls = config.get("urls", [])

    release_notes = ""

    for url in tqdm(urls, desc="Downloading release notes"):
        notes = get_release_notes(url, github_token)
        if notes:
            repo_name = url.split("/")[4]  # Assumes a specific URL structure.
            release_notes += f"# {repo_name}\n\n{notes}\n\n"

    print(release_notes)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Aggregates GitHub release notes from a configuration file.")
    parser.add_argument('config_file', type=str, help="Path to the YAML configuration file")
    args = parser.parse_args()

    main(args.config_file)
