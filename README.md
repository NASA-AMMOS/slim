# SLIM - Software Lifecycle Improvement & Modernization

An AI-native platform where DevOps best practices are discoverable and executable by AI agents through Claude Code skills, MCP servers, and autonomous agents.

## Architecture

This repository follows a "Single Source of Truth" philosophy:

- **static/marketplace/**: Complete skills, agents, and MCP servers with content only (no metadata files)
- **static/data/registry.json**: Manually curated marketplace metadata registry
- **website/**: Docusaurus-based website for browsing and discovering best practices

## Getting Started

### For Users

Browse available skills at the SLIM website, then install via:

**Claude Code:**
```bash
/plugin install https://github.com/NASA-AMMOS/slim/tree/main/static/marketplace/skills/<skill-name>
```

**Gemini:**
```bash
gem install slim-<skill-name>
```

### For Contributors

1. Add your skill content to `static/marketplace/skills/<skill-name>/` (SKILL.md, assets, scripts, etc.)
2. Manually add/update the skill entry in `static/data/registry.json`
3. Test the website: `cd website && npm run serve`
4. Submit a pull request

**Note:** Skills contain only content files (SKILL.md, assets, scripts, references). All metadata is maintained in registry.json.

## Available Skills

- **new-project**: Initialize foundational project structure
- **license**: Add appropriate open source licenses
- **issue-templates**: GitHub issue templates for bugs and features
- **readme**: Comprehensive README.md templates

## License

Apache 2.0 - see LICENSE file

## Credits

- UI components adapted from [aitmpl.com](https://aitmpl.com) (MIT License)
- Maintained by NASA AMMOS SLIM team
