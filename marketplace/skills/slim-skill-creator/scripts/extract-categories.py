#!/usr/bin/env python3
"""
Extract categories and analyze tags from SLIM marketplace registry.json.
"""
import json
import sys
import argparse
from pathlib import Path
from collections import Counter, defaultdict

class CategoryExtractor:
    def __init__(self, registry_path):
        self.registry_path = Path(registry_path)
        self.registry_data = self.load_registry()

    def load_registry(self):
        """Load and parse the registry.json file."""
        try:
            with open(self.registry_path, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            print(f"❌ Registry file not found: {self.registry_path}")
            sys.exit(1)
        except json.JSONDecodeError as e:
            print(f"❌ Invalid JSON in registry file: {e}")
            sys.exit(1)

    def extract_categories(self):
        """Extract all categories from skills in the registry."""
        categories = []
        category_skills = defaultdict(list)

        for skill in self.registry_data.get('skills', []):
            category = skill.get('category', '')
            if category:
                categories.append(category)
                category_skills[category].append(skill.get('name', 'unknown'))

        return categories, category_skills

    def analyze_category_structure(self):
        """Analyze the hierarchical structure of categories."""
        categories, category_skills = self.extract_categories()

        # Group by main category (before first slash)
        main_categories = defaultdict(list)
        for category in categories:
            if '/' in category:
                main_cat = category.split('/')[0]
                sub_cat = category.split('/', 1)[1]
                main_categories[main_cat].append(sub_cat)
            else:
                main_categories[category].append('')

        return main_categories, category_skills

    def extract_tags(self):
        """Extract and count all tags from skills."""
        tag_counter = Counter()
        tag_categories = defaultdict(list)

        for skill in self.registry_data.get('skills', []):
            skill_name = skill.get('name', 'unknown')
            category = skill.get('category', '')
            for tag in skill.get('tags', []):
                tag_counter[tag] += 1
                tag_categories[tag].append((skill_name, category))

        return tag_counter, tag_categories

    def suggest_tags_for_category(self, target_category, limit=10):
        """Suggest relevant tags for a given category."""
        tag_counter, tag_categories = self.extract_tags()

        # Find tags used by skills in similar categories
        category_tags = Counter()

        for tag, skill_info_list in tag_categories.items():
            for skill_name, category in skill_info_list:
                # Check if categories are similar
                if target_category in category or category in target_category:
                    category_tags[tag] += tag_counter[tag]
                # Check for main category match
                elif '/' in category and '/' in target_category:
                    target_main = target_category.split('/')[0]
                    cat_main = category.split('/')[0]
                    if target_main == cat_main:
                        category_tags[tag] += tag_counter[tag] * 0.5  # Weight similar main categories

        return category_tags.most_common(limit)

    def get_category_suggestions(self, keywords=None):
        """Suggest categories based on keywords."""
        main_categories, category_skills = self.analyze_category_structure()
        suggestions = []

        if not keywords:
            return list(main_categories.keys())

        keywords = [k.lower() for k in keywords]

        # Score categories based on keyword matches
        category_scores = defaultdict(int)

        for category in self.registry_data.get('skills', []):
            cat_name = category.get('category', '').lower()
            cat_desc = category.get('description', '').lower()
            cat_tags = [tag.lower() for tag in category.get('tags', [])]

            for keyword in keywords:
                # Direct category match
                if keyword in cat_name:
                    category_scores[category.get('category', '')] += 3

                # Description match
                if keyword in cat_desc:
                    category_scores[category.get('category', '')] += 2

                # Tag match
                if keyword in cat_tags:
                    category_scores[category.get('category', '')] += 1

        # Return top scoring categories
        sorted_suggestions = sorted(category_scores.items(), key=lambda x: x[1], reverse=True)
        return [cat for cat, score in sorted_suggestions if score > 0]

    def print_category_analysis(self):
        """Print comprehensive category analysis."""
        print("📂 SLIM Marketplace Category Analysis")
        print("=" * 60)

        main_categories, category_skills = self.analyze_category_structure()

        print(f"\n📊 Summary:")
        total_skills = len(self.registry_data.get('skills', []))
        total_categories = len(set(self.extract_categories()[0]))
        print(f"  Total skills: {total_skills}")
        print(f"  Total categories: {total_categories}")
        print(f"  Main category groups: {len(main_categories)}")

        print(f"\n🏗️  Category Structure:")
        for main_cat, sub_cats in sorted(main_categories.items()):
            skill_count = sum(len(category_skills[f"{main_cat}/{sub}" if sub else main_cat])
                            for sub in sub_cats)
            print(f"  {main_cat}/ ({skill_count} skills)")

            for sub_cat in sorted(set(sub_cats)):
                if sub_cat:  # Only show subcategories
                    full_cat = f"{main_cat}/{sub_cat}"
                    sub_skill_count = len(category_skills[full_cat])
                    print(f"    ├── {sub_cat} ({sub_skill_count} skills)")

        print(f"\n📋 All Categories (with skill counts):")
        categories, category_skills = self.extract_categories()
        category_counts = Counter(categories)

        for category, count in sorted(category_counts.items()):
            skills = category_skills[category]
            print(f"  {category} ({count} skills): {', '.join(skills[:3])}" +
                  (f" +{len(skills)-3} more" if len(skills) > 3 else ""))

    def print_tag_analysis(self, top_n=20):
        """Print comprehensive tag analysis."""
        print("\n🏷️  Tag Analysis")
        print("=" * 60)

        tag_counter, tag_categories = self.extract_tags()

        print(f"📊 Summary:")
        print(f"  Total unique tags: {len(tag_counter)}")
        print(f"  Total tag uses: {sum(tag_counter.values())}")

        print(f"\n🔝 Top {top_n} Most Used Tags:")
        for tag, count in tag_counter.most_common(top_n):
            categories = set(cat for _, cat in tag_categories[tag])
            category_list = ', '.join(sorted(categories)[:3])
            if len(categories) > 3:
                category_list += f" +{len(categories)-3} more"
            print(f"  {tag:20} ({count:2} uses) - Categories: {category_list}")

        # Find tags by category
        print(f"\n📂 Tags by Main Category:")
        main_categories, _ = self.analyze_category_structure()

        for main_cat in sorted(main_categories.keys()):
            cat_tags = Counter()
            for tag, skill_info_list in tag_categories.items():
                for skill_name, category in skill_info_list:
                    if category.startswith(main_cat):
                        cat_tags[tag] += 1

            if cat_tags:
                top_tags = [f"{tag}({count})" for tag, count in cat_tags.most_common(5)]
                print(f"  {main_cat:25} {', '.join(top_tags)}")

def print_suggestions_for_skill(extractor, skill_description, skill_keywords=None):
    """Print category and tag suggestions for a new skill."""
    print("\n🎯 Suggestions for New Skill")
    print("=" * 60)

    # Extract keywords from description
    if not skill_keywords:
        # Simple keyword extraction (could be improved with NLP)
        import re
        words = re.findall(r'\b\w+\b', skill_description.lower())
        # Filter common words
        common_words = {'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'can', 'may', 'might', 'must', 'shall'}
        skill_keywords = [word for word in words if len(word) > 3 and word not in common_words][:10]

    print(f"Skill description: {skill_description}")
    print(f"Extracted keywords: {', '.join(skill_keywords)}")

    # Suggest categories
    category_suggestions = extractor.get_category_suggestions(skill_keywords)
    print(f"\n📂 Suggested Categories:")
    for i, category in enumerate(category_suggestions[:5], 1):
        print(f"  {i}. {category}")

    # Suggest tags for top category
    if category_suggestions:
        top_category = category_suggestions[0]
        tag_suggestions = extractor.suggest_tags_for_category(top_category)
        print(f"\n🏷️  Suggested Tags (based on '{top_category}' category):")
        for tag, score in tag_suggestions[:10]:
            print(f"  {tag} (relevance: {score:.1f})")

def main():
    parser = argparse.ArgumentParser(description="Extract categories and analyze tags from SLIM marketplace")
    parser.add_argument("--registry", default="website/static/data/registry.json",
                       help="Path to registry.json file")
    parser.add_argument("--categories", action="store_true",
                       help="Show category analysis")
    parser.add_argument("--tags", action="store_true",
                       help="Show tag analysis")
    parser.add_argument("--suggest", help="Suggest categories/tags for a skill description")
    parser.add_argument("--keywords", help="Comma-separated keywords for suggestions")
    parser.add_argument("--top-tags", type=int, default=20,
                       help="Number of top tags to show")

    args = parser.parse_args()

    registry_path = Path(args.registry)
    if not registry_path.exists():
        print(f"❌ Registry file not found: {registry_path}")
        sys.exit(1)

    extractor = CategoryExtractor(registry_path)

    if args.categories or (not args.tags and not args.suggest):
        extractor.print_category_analysis()

    if args.tags:
        extractor.print_tag_analysis(args.top_tags)

    if args.suggest:
        keywords = None
        if args.keywords:
            keywords = [k.strip() for k in args.keywords.split(',')]
        print_suggestions_for_skill(extractor, args.suggest, keywords)

if __name__ == "__main__":
    main()