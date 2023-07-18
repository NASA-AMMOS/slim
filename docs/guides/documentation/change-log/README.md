# Change Log

A change log provides a *human readable* list of significant changes, additions, deprecations, removals for software over time. It is meant to be able to be read by *people*. Change logs should be documented within a file called `CHANGELOG.md` and be updated per key release. See [semantic release](https://semver.org) for guidance on releasing cycles and versioning of your software. 

⚠️ A `CHANGELOG.md` can replicate wording from a releases page (e.g. GitHub Releases), but should not be left out *in place of* a releases page. Down-stream inheritors of your software may not have access to your releases page, and will expect a `CHANGELOG.md` to be present as part of your software distribution.

## Keep a Changelog

This change log standard seeks to provide a template for *human readable* change logs, among other key guidance on the change logging process.

Starter Kit:
- [Guidance](https://keepachangelog.com/en/1.0.0/#how)
- [Demo 1](https://github.com/riverma/terraformly/blob/main/CHANGELOG.md)
- [Demo 2](https://github.com/olivierlacan/keep-a-changelog/blob/main/CHANGELOG.md)
- [Webpage](https://keepachangelog.com/en/1.0.0/)

To leverage this template, make sure to do the following:
1. Talk with your team about leveraging this template, and seek wide agreement before you adopt
2. Copy the demo `CHANGELOG.md` above, and place in a file within your repository called `CHANGELOG.md` 
3. Edit the `CHANGELOG.md` file with your specific release information. If you have many historic releases prior to the creation of this file, mark the latest release as the first entry, and commit to updating this for future releases as the happen.
4. Add an entry to your `README.md` under the `Changelog` section to point to your `CHANGELOG.md` file.