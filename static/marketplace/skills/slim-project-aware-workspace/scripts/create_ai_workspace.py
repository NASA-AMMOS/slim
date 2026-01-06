#!/usr/bin/env python3
"""
AI Task Workspace Creator Script

Creates an AI task workspace directory structure with:
- Main workspace directory named by user
- dynamic/ subdirectory with current date folder (YYYY-MM-DD format)
- static/ subdirectory with project documentation templates

The script creates date-based organization within the dynamic folder and copies
all .md template files from the skill's assets directory to the static subdirectory.
Other skills can create subfolders within the daily dynamic folder.
"""

import os
import shutil
import sys
from datetime import datetime
from pathlib import Path


def create_ai_workspace_structure(workspace_name, base_path=".", templates_path=None):
    """
    Create an AI task workspace directory structure with date-based dynamic organization.

    Args:
        workspace_name (str): Name of the workspace directory to create
        base_path (str): Base path where to create the workspace (default: current directory)
        templates_path (str): Path to template files (default: assets directory relative to script)
    """
    # Default to the assets directory relative to this script
    if templates_path is None:
        script_dir = Path(__file__).parent
        templates_path = script_dir.parent / "assets"
    else:
        templates_path = Path(templates_path)

    # Create main workspace directory
    workspace_path = Path(base_path) / workspace_name
    workspace_path.mkdir(exist_ok=True)
    print(f"✅ Created AI task workspace: {workspace_path}")

    # Create dynamic subdirectory with today's date folder
    dynamic_path = workspace_path / "dynamic"
    dynamic_path.mkdir(exist_ok=True)
    print(f"✅ Created dynamic directory: {dynamic_path}")

    # Create today's date folder in YYYY-MM-DD format
    today = datetime.now().strftime("%Y-%m-%d")
    today_path = dynamic_path / today
    today_path.mkdir(exist_ok=True)
    print(f"✅ Created today's folder: {today_path} ({today})")

    # Create static subdirectory
    static_path = workspace_path / "static"
    static_path.mkdir(exist_ok=True)
    print(f"✅ Created static directory: {static_path}")

    # Copy template files from templates_path
    if templates_path.exists():
        # Find all .md files in the templates directory
        template_files = list(templates_path.glob("*.md"))

        if template_files:
            for template_file in template_files:
                if template_file.name == "AGENTS.md":
                    # AGENTS.md goes in workspace root for AI agent guidance
                    dest_file = workspace_path / template_file.name
                    shutil.copy2(template_file, dest_file)
                    print(f"✅ Copied AI agent guide: {template_file.name}")
                else:
                    # Other templates go in static directory
                    dest_file = static_path / template_file.name
                    shutil.copy2(template_file, dest_file)
                    print(f"✅ Copied template: {template_file.name}")
        else:
            print(f"⚠️  No .md template files found in: {templates_path}")
    else:
        print(f"❌ Templates directory not found: {templates_path}")
        return False

    # Create symbolic link for Claude AI agent
    agents_file = workspace_path / "AGENTS.md"
    if agents_file.exists():
        # Create CLAUDE.md symbolic link
        claude_file = workspace_path / "CLAUDE.md"
        try:
            # Create symbolic link pointing to AGENTS.md
            claude_file.symlink_to("AGENTS.md")
            print(f"✅ Created symbolic link: CLAUDE.md -> AGENTS.md")
        except (OSError, NotImplementedError):
            # Fall back to copying if symbolic links aren't supported
            shutil.copy2(agents_file, claude_file)
            print(f"✅ Created copy: CLAUDE.md (symbolic link not supported)")
        except Exception as e:
            print(f"⚠️  Could not create CLAUDE.md: {e}")

    print(f"\n🎉 AI Task Workspace created successfully!")
    print(f"📁 Workspace location: {workspace_path.resolve()}")
    print(f"   ├── AGENTS.md            # AI agent workspace guide")
    print(f"   ├── CLAUDE.md            # Symbolic link to AGENTS.md")
    print(f"   ├── dynamic/")
    print(f"   │   └── {today}/          # Today's work folder")
    print(f"   └── static/")

    # List the files that were created
    static_files = list(static_path.glob("*.md"))
    for static_file in sorted(static_files):
        print(f"       ├── {static_file.name}")

    print(f"\n📅 Date-based Organization:")
    print(f"• Today's folder: dynamic/{today}/")
    print(f"• Other skills can create subfolders within today's folder")
    print(f"• New date folders will be created automatically as needed")

    print(f"\nNext steps:")
    print(f"1. Navigate to the workspace: cd {workspace_name}")
    print(f"2. Read AGENTS.md (or CLAUDE.md) for AI agent usage guidelines")
    print(f"3. Customize project templates in the static/ directory")
    print(f"4. AI agents will organize their outputs in dynamic/{today}/")
    print(f"5. Daily folders help track progress over time")

    return True


def main():
    """Main function to handle command line arguments."""
    if len(sys.argv) < 2:
        print("Usage: python create_ai_workspace.py <workspace_name> [base_path] [templates_path]")
        print("\nExample: python create_ai_workspace.py MyAIWorkspace")
        print("Example: python create_ai_workspace.py MyAIWorkspace /path/to/workspaces")
        print("Example: python create_ai_workspace.py MyAIWorkspace . /path/to/templates")
        print("\nCreates an AI task workspace with:")
        print("• Date-organized dynamic folder (YYYY-MM-DD format)")
        print("• Project documentation templates")
        print("• AI agent guidance (AGENTS.md)")
        print("• Claude-specific symbolic link (CLAUDE.md)")
        print("• Structure ready for other skills to use")
        sys.exit(1)

    workspace_name = sys.argv[1]
    base_path = sys.argv[2] if len(sys.argv) > 2 else "."
    templates_path = sys.argv[3] if len(sys.argv) > 3 else None

    try:
        success = create_ai_workspace_structure(workspace_name, base_path, templates_path)
        if not success:
            sys.exit(1)
    except Exception as e:
        print(f"❌ Error creating AI workspace structure: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()