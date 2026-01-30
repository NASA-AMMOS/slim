# GenAI Marketplace

An AI-native platform where GenAI development best practices are discoverable and executable by AI agents through Claude Code skills, MCP servers, and autonomous agents.

**Jet Propulsion Laboratory**

## Architecture

This repository follows a "Single Source of Truth" philosophy:

- **static/marketplace/**: Complete skills, agents, and MCP servers with content only (no metadata files)
- **static/data/registry.json**: Manually curated marketplace metadata registry
- **website/**: Docusaurus-based website for browsing and discovering best practices

## Getting Started

### For Users

Browse available skills at the GenAI Marketplace website, then install via:

**Claude Code:**
```bash
/plugin install https://github.jpl.nasa.gov/GenAI/genai-marketplace/tree/main/static/marketplace/skills/<skill-name>
```

### For Contributors

1. Add your skill content to `static/marketplace/skills/<skill-name>/` (SKILL.md, assets, scripts, etc.)
2. Manually add/update the skill entry in `.claude-plugin/marketplace.json`
3. Test the website: `npm run build && npm run serve`
4. Submit a pull request

**Note:** Skills contain only content files (SKILL.md, assets, scripts, references). All metadata is maintained in the marketplace.json file.

## External Registries

This marketplace imports skills from the following external registries:
- [SLIM (Software Lifecycle Improvement & Modernization)](https://nasa-ammos.github.io/slim/)

## Available Skills

Browse the full catalog at the [GenAI Marketplace](https://github.jpl.nasa.gov/pages/GenAI/genai-marketplace/).

## Contact

For questions or support, contact: [rishi.verma@jpl.nasa.gov](mailto:rishi.verma@jpl.nasa.gov)

## Credits

- Based on [SLIM](https://nasa-ammos.github.io/slim/) by NASA AMMOS
- UI components adapted from [aitmpl.com](https://aitmpl.com) (MIT License)
- Maintained by JPL GenAI team
