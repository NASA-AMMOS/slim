#!/usr/bin/env python3
"""
Create SLIM marketplace skill directory structure with proper organization.
"""
import os
import sys
import argparse
from pathlib import Path

def create_skill_directory(skill_name, base_path="website/static/marketplace/skills"):
    """
    Create a SLIM marketplace skill directory with proper structure.

    Args:
        skill_name: Name of the skill (lowercase with hyphens)
        base_path: Base path for marketplace skills

    Returns:
        Path to created skill directory
    """
    # Validate skill name
    if not skill_name or not skill_name.replace('-', '').replace('_', '').isalnum():
        raise ValueError("Skill name must contain only letters, numbers, hyphens, and underscores")

    # Create full path
    skill_path = Path(base_path) / skill_name

    # Check if directory already exists
    if skill_path.exists():
        print(f"Warning: Directory {skill_path} already exists")
        response = input("Continue anyway? (y/N): ").lower().strip()
        if response not in ['y', 'yes']:
            print("Cancelled")
            return None

    # Create directory structure
    directories = [
        skill_path,
        skill_path / "scripts",
        skill_path / "assets"
    ]

    for directory in directories:
        directory.mkdir(parents=True, exist_ok=True)
        print(f"Created directory: {directory}")

    # Create placeholder files
    placeholder_files = {
        skill_path / "SKILL.md": f"""---
name: {skill_name}
description: [INSERT COMPREHENSIVE DESCRIPTION INCLUDING WHEN TO USE]
---

# [INSERT DISPLAY NAME]

## Overview
[INSERT OVERVIEW OF WHAT THIS SKILL DOES]

## Dependencies

### Required Skills
- `[skill-name]`: [Description of why needed]

### Required MCP Servers
- `[mcp-server-name]`: [Description of functionality provided]

### External Requirements
- [Any external dependencies, APIs, or system requirements]

## Prerequisites
[LIST PREREQUISITES HERE]

## Interactive Workflow

### Step 1: [FIRST STEP]
[DETAILED INSTRUCTIONS]

### Step 2: User Selection
**I will present options and gather your preferences:**

**Option A**: [First approach]
- Use when: [conditions]
- Benefits: [advantages]

**Option B**: [Second approach]
- Use when: [different conditions]
- Benefits: [different advantages]

*Which option would you prefer? Please specify A or B.*

## Best Practices
[IMPLEMENTATION GUIDANCE]

## FAQ
[COMMON QUESTIONS]

## Troubleshooting
[COMMON ISSUES AND SOLUTIONS]

## Assets Available
[LIST OF BUNDLED RESOURCES]
""",
        skill_path / "scripts" / "example_script.py": f"""#!/usr/bin/env python3
\"\"\"
Example script for {skill_name} skill.
Delete this file and add your actual scripts.
\"\"\"

def main():
    print("Example script for {skill_name}")
    # Add your script functionality here

if __name__ == "__main__":
    main()
""",
        skill_path / "assets" / "example_template.md": f"""# Example Template for {skill_name.title().replace('-', ' ')}

This is an example template file. Replace with your actual templates and assets.

## Placeholders
- [INSERT_PLACEHOLDER]: Description of what to replace
- [ANOTHER_PLACEHOLDER]: Another item to customize

## Usage
Instructions for using this template...
"""
    }

    for file_path, content in placeholder_files.items():
        if not file_path.exists():
            with open(file_path, 'w') as f:
                f.write(content)
            print(f"Created placeholder: {file_path}")
        else:
            print(f"File already exists: {file_path}")

    print(f"\n✅ Skill directory structure created successfully!")
    print(f"📁 Location: {skill_path}")
    print(f"\nNext steps:")
    print(f"1. Edit {skill_path}/SKILL.md with your skill's content")
    print(f"2. Add your scripts to {skill_path}/scripts/")
    print(f"3. Add your templates/assets to {skill_path}/assets/")
    print(f"4. Run validate-skill.py to check your skill")
    print(f"5. Run update-registry.py to add to marketplace")

    return skill_path

def main():
    parser = argparse.ArgumentParser(description="Create SLIM marketplace skill directory structure")
    parser.add_argument("skill_name", help="Name of the skill (lowercase with hyphens)")
    parser.add_argument("--base-path", default="website/static/marketplace/skills",
                       help="Base path for marketplace skills")

    args = parser.parse_args()

    try:
        skill_path = create_skill_directory(args.skill_name, args.base_path)
        if skill_path:
            sys.exit(0)
        else:
            sys.exit(1)
    except Exception as e:
        print(f"Error creating skill directory: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()