#!/usr/bin/env python3
"""
Validate SLIM marketplace skills for quality and completeness.
"""
import os
import sys
import re
import yaml
import argparse
from pathlib import Path

class SkillValidator:
    def __init__(self, skill_path):
        self.skill_path = Path(skill_path)
        self.errors = []
        self.warnings = []
        self.skill_data = {}

    def add_error(self, message):
        """Add validation error."""
        self.errors.append(f"❌ {message}")

    def add_warning(self, message):
        """Add validation warning."""
        self.warnings.append(f"⚠️  {message}")

    def validate_directory_structure(self):
        """Validate basic directory structure."""
        print("🔍 Validating directory structure...")

        if not self.skill_path.is_dir():
            self.add_error(f"Skill directory does not exist: {self.skill_path}")
            return False

        # Check for SKILL.md
        skill_md = self.skill_path / "SKILL.md"
        if not skill_md.exists():
            self.add_error("SKILL.md file is missing")
        elif not skill_md.is_file():
            self.add_error("SKILL.md is not a file")

        # Check subdirectories
        expected_dirs = ["scripts", "assets"]
        for dir_name in expected_dirs:
            dir_path = self.skill_path / dir_name
            if dir_path.exists() and not dir_path.is_dir():
                self.add_error(f"{dir_name}/ exists but is not a directory")

        return len(self.errors) == 0

    def validate_skill_md(self):
        """Validate SKILL.md file format and content."""
        print("📄 Validating SKILL.md...")

        skill_md = self.skill_path / "SKILL.md"
        if not skill_md.exists():
            return False

        try:
            with open(skill_md, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            self.add_error(f"Cannot read SKILL.md: {e}")
            return False

        # Check for YAML frontmatter
        if not content.startswith('---\n'):
            self.add_error("SKILL.md missing YAML frontmatter (must start with '---')")
            return False

        # Parse frontmatter
        try:
            # Extract frontmatter
            parts = content.split('---\n', 2)
            if len(parts) < 3:
                self.add_error("Invalid YAML frontmatter format")
                return False

            frontmatter = yaml.safe_load(parts[1])
            if not frontmatter:
                self.add_error("Empty YAML frontmatter")
                return False

            self.skill_data = frontmatter
            markdown_body = parts[2]

        except yaml.YAMLError as e:
            self.add_error(f"Invalid YAML in frontmatter: {e}")
            return False

        # Validate required frontmatter fields
        required_fields = ['name', 'description']
        for field in required_fields:
            if field not in frontmatter:
                self.add_error(f"Missing required field in frontmatter: {field}")
            elif not frontmatter[field] or not str(frontmatter[field]).strip():
                self.add_error(f"Empty required field in frontmatter: {field}")

        # Validate name format
        if 'name' in frontmatter:
            name = frontmatter['name']
            if not re.match(r'^[a-z0-9-]+$', name):
                self.add_error("Skill name must be lowercase letters, numbers, and hyphens only")

        # Validate description completeness
        if 'description' in frontmatter:
            desc = frontmatter['description']
            if len(desc) < 50:
                self.add_warning("Description is quite short (less than 50 characters)")
            if 'use when' not in desc.lower() and 'when to' not in desc.lower():
                self.add_warning("Description should include 'when to use' information")

        # Check markdown body content
        self.validate_markdown_structure(markdown_body)

        return len(self.errors) == 0

    def validate_markdown_structure(self, markdown_body):
        """Validate markdown body structure and content."""
        required_sections = [
            "Overview",
            "Prerequisites",
            "Workflow"
        ]

        # Check for required sections
        for section in required_sections:
            if f"## {section}" not in markdown_body and f"#{section}" not in markdown_body:
                self.add_warning(f"Missing recommended section: {section}")

        # Check for Dependencies section (important for SLIM)
        if "## Dependencies" not in markdown_body and "# Dependencies" not in markdown_body:
            self.add_warning("Missing Dependencies section (recommended for SLIM skills)")

        # Check for interactive elements
        if "**Option A" not in markdown_body and "**Option B" not in markdown_body:
            self.add_warning("Consider adding interactive user options for better AI experience")

        # Check for placeholder content
        placeholder_patterns = [
            r'\[INSERT[^\]]*\]',
            r'\[PLACEHOLDER[^\]]*\]',
            r'\[TODO[^\]]*\]'
        ]

        for pattern in placeholder_patterns:
            matches = re.findall(pattern, markdown_body, re.IGNORECASE)
            for match in matches:
                self.add_warning(f"Found placeholder that needs replacement: {match}")

    def validate_assets(self):
        """Validate assets directory and files."""
        print("📁 Validating assets...")

        assets_dir = self.skill_path / "assets"
        if not assets_dir.exists():
            self.add_warning("No assets directory found")
            return

        if not assets_dir.is_dir():
            self.add_error("assets/ exists but is not a directory")
            return

        # Check for empty directory
        asset_files = list(assets_dir.rglob('*'))
        if not asset_files:
            self.add_warning("assets/ directory is empty")
            return

        # Validate individual files
        for asset_file in asset_files:
            if asset_file.is_file():
                # Check file size (warn if very large)
                size_mb = asset_file.stat().st_size / (1024 * 1024)
                if size_mb > 10:
                    self.add_warning(f"Large asset file: {asset_file.name} ({size_mb:.1f}MB)")

                # Check for common issues
                if asset_file.name.startswith('.'):
                    self.add_warning(f"Hidden file in assets: {asset_file.name}")

    def validate_scripts(self):
        """Validate scripts directory and files."""
        print("🐍 Validating scripts...")

        scripts_dir = self.skill_path / "scripts"
        if not scripts_dir.exists():
            self.add_warning("No scripts directory found")
            return

        if not scripts_dir.is_dir():
            self.add_error("scripts/ exists but is not a directory")
            return

        # Check for Python files
        python_files = list(scripts_dir.glob('*.py'))
        if not python_files:
            self.add_warning("No Python scripts found in scripts/")
            return

        # Basic validation of Python scripts
        for py_file in python_files:
            try:
                with open(py_file, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Check for shebang
                if not content.startswith('#!/usr/bin/env python'):
                    self.add_warning(f"Script missing shebang: {py_file.name}")

                # Check for basic structure
                if 'def main(' not in content:
                    self.add_warning(f"Script missing main() function: {py_file.name}")

                if '__name__ == "__main__"' not in content:
                    self.add_warning(f"Script missing main guard: {py_file.name}")

            except Exception as e:
                self.add_warning(f"Cannot validate script {py_file.name}: {e}")

    def validate_file_references(self):
        """Validate that referenced files actually exist."""
        print("🔗 Validating file references...")

        skill_md = self.skill_path / "SKILL.md"
        if not skill_md.exists():
            return

        try:
            with open(skill_md, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception:
            return

        # Find references to assets and scripts
        asset_refs = re.findall(r'assets/([^\s\)]+)', content)
        script_refs = re.findall(r'scripts/([^\s\)]+)', content)

        # Check asset references
        for asset_ref in asset_refs:
            asset_path = self.skill_path / "assets" / asset_ref
            if not asset_path.exists():
                self.add_error(f"Referenced asset does not exist: assets/{asset_ref}")

        # Check script references
        for script_ref in script_refs:
            script_path = self.skill_path / "scripts" / script_ref
            if not script_path.exists():
                self.add_error(f"Referenced script does not exist: scripts/{script_ref}")

    def validate_naming_conventions(self):
        """Validate naming conventions."""
        print("📝 Validating naming conventions...")

        skill_name = self.skill_path.name

        # Check directory name
        if not re.match(r'^[a-z0-9-]+$', skill_name):
            self.add_error("Skill directory name must be lowercase letters, numbers, and hyphens only")

        # Check consistency with SKILL.md name field
        if 'name' in self.skill_data:
            if self.skill_data['name'] != skill_name:
                self.add_error(f"Directory name '{skill_name}' doesn't match SKILL.md name '{self.skill_data['name']}'")

    def run_validation(self):
        """Run complete skill validation."""
        print(f"🔍 Validating skill: {self.skill_path.name}")
        print("=" * 60)

        validation_steps = [
            self.validate_directory_structure,
            self.validate_skill_md,
            self.validate_assets,
            self.validate_scripts,
            self.validate_file_references,
            self.validate_naming_conventions
        ]

        for step in validation_steps:
            try:
                step()
            except Exception as e:
                self.add_error(f"Validation step failed: {e}")

        # Report results
        print("\n" + "=" * 60)
        print("📊 Validation Results")
        print("=" * 60)

        if self.errors:
            print("❌ ERRORS:")
            for error in self.errors:
                print(f"  {error}")

        if self.warnings:
            print("\n⚠️  WARNINGS:")
            for warning in self.warnings:
                print(f"  {warning}")

        if not self.errors and not self.warnings:
            print("✅ All validation checks passed!")

        # Summary
        error_count = len(self.errors)
        warning_count = len(self.warnings)

        if error_count == 0:
            if warning_count == 0:
                print(f"\n🎉 Perfect! No issues found.")
                return True
            else:
                print(f"\n✅ Skill is valid with {warning_count} warning(s)")
                return True
        else:
            print(f"\n❌ Skill validation failed with {error_count} error(s) and {warning_count} warning(s)")
            return False

def main():
    parser = argparse.ArgumentParser(description="Validate SLIM marketplace skill")
    parser.add_argument("skill_path", help="Path to skill directory")
    parser.add_argument("--strict", action="store_true",
                       help="Treat warnings as errors")

    args = parser.parse_args()

    skill_path = Path(args.skill_path)
    if not skill_path.exists():
        print(f"❌ Skill directory does not exist: {skill_path}")
        sys.exit(1)

    validator = SkillValidator(skill_path)
    is_valid = validator.run_validation()

    if args.strict and validator.warnings:
        print("\n🚫 Strict mode: treating warnings as errors")
        is_valid = False

    sys.exit(0 if is_valid else 1)

if __name__ == "__main__":
    main()