---
name: github-mcp-server
description: MCP server providing GitHub repository access and management capabilities including issues, PRs, and repository operations
---

# GitHub MCP Server

## Overview

The GitHub MCP Server provides seamless integration with GitHub repositories, enabling AI assistants to interact with GitHub issues, pull requests, repository contents, and other GitHub API operations directly through the Model Context Protocol (MCP).

## When to Use This MCP Server

Use the GitHub MCP Server when you need to:
- Access GitHub repository information and metadata
- Read and create GitHub issues and pull requests
- Browse repository contents and file structures
- Interact with GitHub API operations from within Claude Code
- Manage GitHub repositories programmatically
- Query repository activity, commits, and collaboration data

## Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- GitHub account with personal access token
- Claude Code CLI installed

### Installation

Install the GitHub MCP Server globally via npm:

```bash
npm install -g @github/github-mcp-server
```

### Authentication Setup

The GitHub MCP Server requires a GitHub personal access token for API access:

1. **Create a Personal Access Token**:
   - Go to GitHub → Settings → Developer settings → Personal access tokens
   - Generate a new token with appropriate repository permissions
   - Save the token securely

2. **Configure Environment**:
   - Set the `GITHUB_TOKEN` environment variable
   - Or configure through Claude Code MCP settings

### Claude Code Integration

After installation, configure the MCP server in Claude Code:

```bash
# The MCP server should be available as 'github-mcp-server'
# Configuration details will be handled through Claude Code's MCP management
```

## Key Capabilities

The GitHub MCP Server provides access to:

### Repository Operations
- Browse repository contents and file structures
- Read file contents and repository metadata
- Access repository settings and configuration

### Issues and Pull Requests
- List, create, and update GitHub issues
- Manage pull request workflows
- Access issue and PR comments and discussions

### Repository Management
- Access repository information and statistics
- Manage repository collaborators and permissions
- Query repository activity and commit history

## Configuration

The MCP server uses environment variables for configuration:

- `GITHUB_TOKEN`: Personal access token for GitHub API access
- `GITHUB_API_URL`: Custom GitHub API URL (for GitHub Enterprise)

## Usage Examples

Once configured with Claude Code, you can:

```
Ask Claude to:
- "Show me the open issues in my repository"
- "Create a new issue for the bug we discussed"
- "List the recent pull requests"
- "What files were changed in the last commit?"
```

## Troubleshooting

### Common Issues

1. **Authentication Errors**: Ensure your GitHub token has the required permissions
2. **API Rate Limits**: GitHub API has rate limits; the server handles these automatically
3. **Network Issues**: Check connectivity to GitHub API endpoints

### Getting Help

- **Upstream Documentation**: [GitHub MCP Server Repository](https://github.com/github/github-mcp-server)
- **GitHub API Documentation**: [GitHub REST API](https://docs.github.com/en/rest)
- **MCP Protocol**: [Model Context Protocol Specification](https://modelcontextprotocol.io/)

## Additional Resources

- [GitHub MCP Server GitHub Repository](https://github.com/github/github-mcp-server) - Full documentation and source code
- [GitHub API Documentation](https://docs.github.com/en/rest) - Complete GitHub API reference
- [MCP Protocol Documentation](https://modelcontextprotocol.io/) - Model Context Protocol specification
- [Claude Code Documentation](https://docs.anthropic.com/claude-code) - Claude Code CLI documentation

## Best Practices

1. **Token Security**: Store GitHub tokens securely and rotate them regularly
2. **Permission Scope**: Use tokens with minimal required permissions
3. **Rate Limiting**: Be mindful of GitHub API rate limits for heavy usage
4. **Error Handling**: The MCP server provides detailed error messages for troubleshooting

## Contributing

The GitHub MCP Server is maintained by GitHub. For issues, feature requests, or contributions, visit the [official repository](https://github.com/github/github-mcp-server).