#!/usr/bin/env python3
"""
Update registry.json with new skill entries for SLIM marketplace.
"""
import json
import sys
import argparse
import shutil
from pathlib import Path
from datetime import datetime

def backup_registry(registry_path):
    """Create a backup of the registry file."""
    backup_path = registry_path.with_suffix(f'.json.backup.{datetime.now().strftime("%Y%m%d_%H%M%S")}')
    shutil.copy2(registry_path, backup_path)
    print(f"📋 Created backup: {backup_path}")
    return backup_path

def load_registry(registry_path):
    """Load and parse the registry.json file."""
    try:
        with open(registry_path, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"❌ Registry file not found: {registry_path}")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"❌ Invalid JSON in registry file: {e}")
        sys.exit(1)

def save_registry(registry_data, registry_path):
    """Save registry data back to file with proper formatting."""
    try:
        with open(registry_path, 'w') as f:
            json.dump(registry_data, f, indent=2, ensure_ascii=False)
        print(f"✅ Registry updated successfully: {registry_path}")
    except Exception as e:
        print(f"❌ Error saving registry: {e}")
        sys.exit(1)

def validate_json_syntax(registry_path):
    """Validate that the registry file contains valid JSON."""
    try:
        with open(registry_path, 'r') as f:
            json.load(f)
        return True
    except json.JSONDecodeError as e:
        print(f"❌ JSON validation failed: {e}")
        return False

def check_skill_exists(registry_data, skill_name):
    """Check if a skill already exists in the registry."""
    for skill in registry_data.get('skills', []):
        if skill.get('name') == skill_name:
            return True
    return False

def generate_skill_entry(skill_name, display_name, description, category, tags, example="", version="1.0.0"):
    """Generate a complete registry entry for a skill."""
    return {
        "name": skill_name,
        "displayName": display_name,
        "description": description,
        "category": category,
        "tags": tags if isinstance(tags, list) else tags.split(','),
        "lastUpdated": datetime.now().strftime("%Y-%m-%d"),
        "skill_file_url": f"/slim/marketplace/skills/{skill_name}/SKILL.md",
        "type": "skill",
        "example": example or f"Create {display_name.lower()} for this project",
        "zip_file_path": f"assets/zip/{skill_name}.zip"
    }

def add_skill_to_registry(registry_path, skill_name, display_name, description, category, tags, example="", version="1.0.0"):
    """Add a new skill entry to the registry."""

    # Create backup
    backup_path = backup_registry(registry_path)

    # Load registry
    registry_data = load_registry(registry_path)

    # Check if skill already exists
    if check_skill_exists(registry_data, skill_name):
        print(f"⚠️  Skill '{skill_name}' already exists in registry")
        response = input("Update existing entry? (y/N): ").lower().strip()
        if response not in ['y', 'yes']:
            print("Cancelled")
            return False

        # Remove existing entry
        registry_data['skills'] = [s for s in registry_data['skills'] if s.get('name') != skill_name]
        print(f"🔄 Removed existing entry for '{skill_name}'")

    # Generate new skill entry
    skill_entry = generate_skill_entry(skill_name, display_name, description, category, tags, example, version)

    # Add to registry
    if 'skills' not in registry_data:
        registry_data['skills'] = []

    registry_data['skills'].append(skill_entry)

    # Sort skills alphabetically by name
    registry_data['skills'] = sorted(registry_data['skills'], key=lambda x: x.get('name', ''))

    # Save registry
    save_registry(registry_data, registry_path)

    # Validate JSON syntax
    if validate_json_syntax(registry_path):
        print(f"✅ JSON validation passed")
        return True
    else:
        print(f"❌ JSON validation failed, restoring backup")
        shutil.copy2(backup_path, registry_path)
        return False

def get_existing_categories(registry_path):
    """Extract existing categories from the registry."""
    registry_data = load_registry(registry_path)
    categories = set()

    for skill in registry_data.get('skills', []):
        category = skill.get('category', '')
        if category:
            categories.add(category)

    return sorted(list(categories))

def get_common_tags(registry_path):
    """Extract common tags from existing skills."""
    registry_data = load_registry(registry_path)
    tag_counts = {}

    for skill in registry_data.get('skills', []):
        for tag in skill.get('tags', []):
            tag_counts[tag] = tag_counts.get(tag, 0) + 1

    # Return tags used by more than one skill, sorted by frequency
    common_tags = [(tag, count) for tag, count in tag_counts.items() if count > 1]
    return sorted(common_tags, key=lambda x: x[1], reverse=True)

def interactive_skill_creation():
    """Interactive mode for creating skill entries."""
    print("🔧 SLIM Skill Registry Editor")
    print("=" * 50)

    # Get registry path
    registry_path = Path("static/data/registry.json")
    if not registry_path.exists():
        registry_path = Path(input("Registry file path: "))

    print(f"Using registry: {registry_path}")

    # Show existing categories
    print("\n📂 Existing categories:")
    categories = get_existing_categories(registry_path)
    for i, cat in enumerate(categories, 1):
        print(f"  {i}. {cat}")

    print("\n🏷️  Common tags:")
    common_tags = get_common_tags(registry_path)
    for tag, count in common_tags[:10]:  # Show top 10
        print(f"  {tag} ({count} uses)")

    print("\n" + "=" * 50)

    # Gather skill information
    skill_name = input("Skill name (lowercase-with-hyphens): ").strip()
    display_name = input("Display name: ").strip()
    description = input("Description: ").strip()
    category = input("Category: ").strip()
    tags_input = input("Tags (comma-separated): ").strip()
    example = input("Example usage: ").strip()
    version = input("Version [1.0.0]: ").strip() or "1.0.0"

    # Convert tags to list
    tags = [tag.strip() for tag in tags_input.split(',') if tag.strip()]

    # Confirm details
    print(f"\n📋 Skill Details:")
    print(f"  Name: {skill_name}")
    print(f"  Display Name: {display_name}")
    print(f"  Description: {description}")
    print(f"  Category: {category}")
    print(f"  Tags: {tags}")
    print(f"  Example: {example}")
    print(f"  Version: {version}")

    confirm = input("\nAdd this skill to registry? (y/N): ").lower().strip()
    if confirm not in ['y', 'yes']:
        print("Cancelled")
        return False

    return add_skill_to_registry(registry_path, skill_name, display_name, description, category, tags, example, version)

def main():
    parser = argparse.ArgumentParser(description="Update SLIM marketplace registry with new skill")
    parser.add_argument("--registry", default="static/data/registry.json",
                       help="Path to registry.json file")
    parser.add_argument("--interactive", "-i", action="store_true",
                       help="Run in interactive mode")
    parser.add_argument("--skill-name", help="Skill name")
    parser.add_argument("--display-name", help="Display name for marketplace")
    parser.add_argument("--description", help="Skill description")
    parser.add_argument("--category", help="Skill category")
    parser.add_argument("--tags", help="Comma-separated tags")
    parser.add_argument("--example", help="Example usage string")
    parser.add_argument("--version", default="1.0.0", help="Skill version")
    parser.add_argument("--list-categories", action="store_true",
                       help="List existing categories")
    parser.add_argument("--list-tags", action="store_true",
                       help="List common tags")

    args = parser.parse_args()
    registry_path = Path(args.registry)

    # List categories or tags
    if args.list_categories:
        print("📂 Existing categories:")
        for cat in get_existing_categories(registry_path):
            print(f"  {cat}")
        return

    if args.list_tags:
        print("🏷️  Common tags:")
        for tag, count in get_common_tags(registry_path):
            print(f"  {tag} ({count} uses)")
        return

    # Interactive mode
    if args.interactive:
        success = interactive_skill_creation()
        sys.exit(0 if success else 1)

    # Command line mode
    if not all([args.skill_name, args.display_name, args.description, args.category, args.tags]):
        print("❌ Missing required arguments. Use --interactive or provide all required fields.")
        parser.print_help()
        sys.exit(1)

    success = add_skill_to_registry(
        registry_path, args.skill_name, args.display_name,
        args.description, args.category, args.tags, args.example or "", args.version
    )

    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()