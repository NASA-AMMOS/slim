# SLIM - Software Lifecycle Improvement & Modernization

An AI-native platform where DevOps best practices are discoverable and executable by AI agents through Claude Code skills, MCP servers, and autonomous agents.

## Architecture

This repository follows a "Single Source of Truth" philosophy:

- **static/marketplace/**: Complete skills, agents, and MCP servers with content only (no metadata files)
- **static/data/registry.json**: Hand-authored **source of truth** for all marketplace metadata
- **.claude-plugin/marketplace.json**: Claude Code plugin manifest, **generated** from `registry.json` by `src/conf/generate-marketplace.js` (runs during `npm run prebuild`)
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
2. Add/update the skill entry in `static/data/registry.json`
3. Run `npm run prebuild` to regenerate `.claude-plugin/marketplace.json`
4. Test the website: `npm run serve`
5. Commit both `registry.json` and `marketplace.json`, then submit a pull request

**Note:** Skills contain only content files (SKILL.md, assets, scripts, references). All metadata is hand-authored in `registry.json`; `marketplace.json` is generated from it.

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
