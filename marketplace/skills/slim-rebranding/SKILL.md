---
name: slim-rebranding
description: Launch your own customized best-practices marketplace by rebranding the slim-framework. Prompts the user for project name, logo, organization, and branding, then clones a fresh copy of the NASA-AMMOS/slim-framework repository and customizes that clone — without modifying the repository this skill is run from. Use when you want to stand up your own marketplace website based on the framework.
---

# Marketplace Rebranding

This skill creates a **new, customized marketplace website** by cloning the
[`slim-framework`](https://github.com/NASA-AMMOS/slim-framework) — a de-branded,
reusable marketplace framework — and applying the user's branding to that clone.

**It does not modify the repository it is run from.** All work happens in a
fresh clone of `slim-framework`.

## Why a clone

`slim-framework` is purpose-built to be customized: branding lives in a handful
of clearly marked config values, the logo is a single SVG, and the marketplace
catalog is driven by one JSON file (`static/data/registry.json`, the hand-authored
source of truth from which the Claude Code manifest is generated). Rebranding is
therefore a matter of cloning it and editing a few values — not surgically
de-branding an existing site.

## Workflow

### Step 1 — Collect branding information

Prompt the user (use the question tool where available) for:

- **Project name** — the display title (e.g. "Acme Robotics Best Practices")
- **Tagline** — a one-line description
- **Organization** — the GitHub org or username that will host the new repo
- **Repository name** — the new repository's name (drives `baseUrl` and URLs)
- **Logo** — path or URL to an SVG or PNG logo (optional; if omitted, keep the
  framework's neutral placeholder)
- **Federated marketplaces** — registry URLs to show alongside the local catalog
  (optional). The framework ships with the SLIM marketplace wired in as an
  example remote — ask whether to keep it, replace it, or remove it.

Do not proceed until you have at least the project name, organization, and
repository name.

### Step 2 — Clone the framework

```bash
git clone https://github.com/NASA-AMMOS/slim-framework.git <repository-name>
cd <repository-name>
rm -rf .git && git init    # start a fresh history for the new project
```

### Step 3 — Apply branding to `docusaurus.config.js`

Edit the values under the `CUSTOMIZE ME` banner at the top of
`docusaurus.config.js`:

- `title` → project name
- `tagline` → tagline
- `url` → `https://<organization>.github.io`
- `baseUrl` → `/<repository-name>/`
- `organizationName` → organization
- `projectName` → repository name
- `editUrl` (twice), the navbar GitHub `href`, the footer `href`s, and the
  `copyright` string → point at `https://github.com/<organization>/<repository-name>`
- `navbar.title` and `navbar.logo.alt` → project name
- `brandingConfig.hero.cornerFeatures` text → optional project-specific messaging

### Step 4 — Set the marketplace identity

In `static/data/registry.json`, edit the top-level `marketplace` block:

- `name` → a marketplace id (lowercase, hyphenated, e.g. `acme-marketplace`) —
  used in the `/plugin install <skill>@<name>` command
- `owner.name` and `owner.email` → the organization's name and contact

### Step 5 — Replace the logo

If the user provided a logo, replace `static/img/logo.svg` (and
`static/img/favicon.svg`) with it, keeping the same filenames. If the new files
use different names, update `favicon`, `brandingConfig.logoPath`, and
`navbar.logo.src` in `docusaurus.config.js` to match. If no logo was provided,
keep the neutral placeholder.

### Step 6 — Configure federated marketplaces (optional)

In `docusaurus.config.js`, set `marketplaceConfig.registries`:

- Keep `"./static/data/registry.json"` as the first entry — the local catalog.
- Add or remove remote registry URLs according to the user's choice in Step 1.
  A registry picker appears on the site automatically when more than one is
  listed.

### Step 7 — Build and verify

```bash
npm install
npm run build
```

Fix any errors and rebuild until the build succeeds. Optionally run
`npm run serve` to preview the site locally.

### Step 8 — Hand off

The customized marketplace is ready. Tell the user to:

1. Create a new GitHub repository at `<organization>/<repository-name>`.
2. Commit the changes and push.
3. Enable GitHub Pages to publish the site.

To populate the new marketplace with best practices, point the user at the
clone's `docs/contribute/submit-best-practice.md`: add a skill folder under
`static/marketplace/skills/`, add an entry to `static/data/registry.json`, and
run `npm run prebuild`.

## Prerequisites

- `git`, Node.js, and `npm` installed
- Network access to clone `https://github.com/NASA-AMMOS/slim-framework`

## Notes

- This skill never edits the repository it is invoked from — the customized
  output is a fresh, independent clone of `slim-framework`.
- The framework ships with an empty local marketplace; the new project adds its
  own skills via `static/data/registry.json`.
