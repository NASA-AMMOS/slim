---
title: Release Template (GitHub)
sidebar_label: Release Template (GitHub)
---

```yaml
# place in .github/release.yml

changelog:
  exclude: # exclude any PRs labels we don't want in the changelog
    labels: 
      - ignore-for-release
      - skip-changelog
  categories: # group PRs by your most important labels. Add / customize as needed.
    - title: "🚀 Features"
      labels:
        - enhancement
    - title: "🐛 Bug Fixes"
      labels:
        - bug
    - title: "📚 Documentation"
      labels:
        - documentation
    - title: 📦 Dependencies
      labels:
        - dependencies
    - title: 💻 Other Changes
      labels:
        - "*"
      exclude: # place the list of all labels you've categorized aboved to avoid duplication!
        labels:
          - enhancement
          - bug
          - documentation
          - dependencies
```