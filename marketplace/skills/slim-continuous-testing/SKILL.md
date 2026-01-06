---
name: slim-continuous-testing
description: Implement comprehensive continuous testing strategies with documentation templates and automated pre-commit configurations for static analysis, security scanning, and code quality checks across multiple programming languages. Use when projects need testing automation setup, documentation templates for testing procedures, pre-commit hook configurations, or guidance on establishing continuous testing practices. Triggers include requests for "testing setup", "automated testing", "pre-commit hooks", "code quality checks", "test documentation", or "continuous integration testing".
---

# Continuous Testing Framework

## Overview

This skill helps establish comprehensive continuous testing strategies for software projects by providing documentation templates and automated configurations. It combines testing best practices with practical implementation tools, enabling projects to maintain high code quality through automated checks and clear testing procedures.

The skill provides two core templates that work together: comprehensive testing documentation and automated pre-commit configurations that enforce quality standards before code commits.

## Workflow

### Step 1: Assess Current Testing State

Before implementing continuous testing, evaluate the project's current state:

**Questions to ask the user:**
1. What programming languages does the project use?
2. Are there existing tests in the project?
3. What testing frameworks are currently in use (if any)?
4. Is there existing CI/CD infrastructure?
5. What level of testing automation is desired?

**Project Analysis:**
- Check for existing test directories (`tests/`, `test/`, `spec/`)
- Look for testing configuration files (`pytest.ini`, `jest.config.js`, etc.)
- Identify the primary programming language and frameworks
- Review current development workflow and tools

### Step 2: Determine Testing Strategy

Based on the assessment, help users choose appropriate testing approaches:

**Testing Categories to Consider:**
- **Static Code Analysis**: Syntax, style, and basic error checking
- **Unit Tests**: Function and component-level testing
- **Security Tests**: Vulnerability scanning and security linting
- **Build Tests**: Compilation and package creation verification
- **Integration Tests**: Component interaction testing
- **Performance Tests**: Load and performance benchmarking

**Template Selection Decision Tree:**
- **Need testing documentation?** → Use TESTING.md template
- **Need automated quality checks?** → Use pre-commit-config.yaml template
- **Need comprehensive testing setup?** → Use both templates together

### Step 3: Template Selection and Customization

Present the available templates and help users select what they need:

#### Option A: Testing Documentation Template

**When to use:** Projects need standardized testing documentation and procedures.

**Template:** `assets/TESTING.md`

**Customization steps:**
1. Replace `[INSERT PROJECT NAME HERE]` with the actual project name
2. Select appropriate testing categories from the provided checklist
3. Customize testing category sections with project-specific details:
   - Update file paths and locations
   - Specify testing frameworks being used
   - Add manual and automatic execution instructions
   - Define results storage locations
4. Add project-specific testing categories if needed
5. Include team-specific contributing guidelines

#### Option B: Pre-commit Automation Template

**When to use:** Projects need automated code quality and security checks.

**Template:** `assets/pre-commit-config.yaml`

**Customization steps:**
1. Select appropriate hooks based on programming languages:
   - **Python projects**: Keep isort, black, ruff, bandit hooks
   - **JavaScript projects**: Add ESLint, Prettier hooks
   - **Multi-language projects**: Keep language-agnostic and relevant language-specific hooks
2. Adjust hook configurations:
   - Update file size limits in `check-added-large-files`
   - Modify bandit configuration paths if using pyproject.toml
   - Add or remove specific hooks based on project needs
3. Configure language-specific tools:
   - Add `.markdownlintrc` if using markdown linting
   - Set up appropriate ignore patterns
   - Configure security scanning severity levels

#### Option C: Comprehensive Setup (Recommended)

**When to use:** Projects want both documentation and automation (most common scenario).

**Implementation approach:**
1. Start with the testing documentation template to establish procedures
2. Implement pre-commit automation to enforce quality standards
3. Ensure both templates reference each other appropriately

### Step 4: Implementation and Integration

#### For Testing Documentation (TESTING.md):

1. **Place the file** in the project root directory
2. **Update README.md** to reference the testing documentation:
   ```markdown
   ## Testing

   See [TESTING.md](TESTING.md) for comprehensive testing information.
   ```
3. **Integrate with CI/CD** by referencing testing procedures in pipeline configurations
4. **Team onboarding**: Include TESTING.md in contributor documentation

#### For Pre-commit Configuration:

1. **Install pre-commit** in the project:
   ```bash
   pip install pre-commit
   # or
   brew install pre-commit
   ```

2. **Place configuration** as `.pre-commit-config.yaml` in project root

3. **Install hooks**:
   ```bash
   pre-commit install
   ```

4. **Test the setup**:
   ```bash
   pre-commit run --all-files
   ```

5. **Update development documentation** to include pre-commit setup instructions

### Step 5: Validation and Team Adoption

#### Testing Documentation Validation:
- [ ] All placeholder values have been replaced
- [ ] Testing categories match project needs
- [ ] File paths and commands are accurate
- [ ] Team members can follow the procedures
- [ ] Documentation is linked from main project README

#### Pre-commit Validation:
- [ ] Configuration file is properly formatted
- [ ] All selected hooks are relevant to the project
- [ ] Hooks run successfully on existing codebase
- [ ] Team has been informed about new commit requirements
- [ ] CI/CD pipeline acknowledges pre-commit checks

### Step 6: Maintenance and Evolution

**Regular Review Tasks:**
- Update testing documentation as new test categories are added
- Adjust pre-commit hooks as project requirements change
- Review hook performance and adjust configurations for efficiency
- Keep testing frameworks and tools up to date

**Scaling Considerations:**
- Add more specialized testing categories as project grows
- Implement additional hooks for new languages or tools
- Consider team-specific customizations for different development areas
- Integrate with advanced CI/CD workflows and quality gates

## Language-Specific Guidance

### Python Projects
- Keep bandit for security scanning
- Use black for code formatting
- Include isort for import organization
- Consider adding mypy for type checking

### JavaScript/TypeScript Projects
- Add ESLint and Prettier hooks
- Include testing framework-specific linting
- Consider security scanning with tools like audit

### Multi-Language Projects
- Focus on language-agnostic hooks first
- Add language-specific hooks as separate entries
- Use fail_fast strategically to balance speed and coverage

## Integration with CI/CD

The templates work well with existing CI/CD pipelines:

**GitHub Actions Integration:**
- Pre-commit hooks can run in CI to catch issues missed locally
- TESTING.md procedures can be automated in workflow files
- Use both templates to establish consistent quality gates

**Other CI Systems:**
- Most CI systems can execute pre-commit hooks
- Testing documentation provides clear automation guidelines
- Templates support various testing framework integrations

## Assets Available

This skill includes two comprehensive templates:

- **`TESTING.md`**: Complete testing documentation template with multiple testing categories, execution instructions, and team collaboration guidance
- **`pre-commit-config.yaml`**: Multi-language pre-commit configuration with security scanning, code quality checks, and formatting tools

Both templates are designed to work independently or together, providing flexibility for different project needs and maturity levels.