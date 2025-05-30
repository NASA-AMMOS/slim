# License Management

<pre align="center">Institutionally authorized approaches to implementing popular open source licenses while respecting organizational copyright and markup requirements.</pre>

## Introduction

**Background**: Managing open source licenses in institutional and government-sponsored environments requires careful balance between open source compliance and organizational legal requirements. Many institutions need to include specific copyright notices, disclaimers, or attribution markup within standard licenses to meet legal, funding, or policy requirements. This guide provides institutionally authorized approaches to work with popular licenses such as Apache V2 and MIT while maintaining GitHub's license recognition and ensuring legal compliance.

Standard license templates may not accommodate institutional needs for:
- Government sponsorship acknowledgments
- Institutional copyright notices
- Funding attribution requirements
- Export control statements
- Legal disclaimers specific to the organization

This guide offers practical solutions that maintain license integrity while meeting institutional requirements.

**Use Cases**:
- Government-sponsored open source projects requiring funding acknowledgments
- Academic institutions needing to maintain institutional copyright
- Organizations with specific legal disclaimer requirements
- Projects needing export control or distribution statements
- Multi-institutional collaborations requiring proper attribution

---

## Prerequisites

* Understanding of open source licensing principles
* Familiarity with your institution's legal and policy requirements
* Access to institutional legal counsel or technology transfer office
* Knowledge of your project's funding sources and attribution requirements

---

## Quick Start

**[⬇️ Apache 2.0 with Institutional Markup Template](https://raw.githubusercontent.com/NASA-AMMOS/slim/main/static/assets/governance/license/LICENSE-APACHE-INSTITUTIONAL.txt)**

Standard Apache 2.0 license with institutional copyright and acknowledgment sections that preserve GitHub license recognition.

**[⬇️ MIT with Institutional Markup Template](https://raw.githubusercontent.com/NASA-AMMOS/slim/main/static/assets/governance/license/LICENSE-MIT-INSTITUTIONAL.txt)**

MIT license template with institutional copyright notice placement that maintains compatibility.

**[⬇️ COPYRIGHT.md Template](https://raw.githubusercontent.com/NASA-AMMOS/slim/main/static/assets/governance/license/COPYRIGHT.md)**

Separate copyright file template for detailed institutional attribution and acknowledgments.

**[⬇️ NOTICE.txt Template](https://raw.githubusercontent.com/NASA-AMMOS/slim/main/static/assets/governance/license/NOTICE.txt)**

Apache-style NOTICE file for additional institutional requirements and third-party attributions.

---

## Step-by-Step Guide

### Option 1: Enhanced LICENSE File (Recommended)

1. **Choose Your Base License**: Start with the standard Apache 2.0 or MIT license text.

2. **Add Institutional Header**: Place institutional copyright and acknowledgments in a clearly marked section at the top:
   ```
   Copyright (c) [YEAR] [INSTITUTION NAME]
   [GOVERNMENT SPONSORSHIP ACKNOWLEDGMENT]
   
   Licensed under the Apache License, Version 2.0...
   ```

3. **Verify GitHub Recognition**: Ensure GitHub still recognizes the license by keeping the original license text intact and placing institutional additions in designated sections.

### Option 2: Separate COPYRIGHT File

1. **Use Standard LICENSE**: Keep your LICENSE file exactly as the standard template (Apache 2.0, MIT, etc.).

2. **Create COPYRIGHT.md**: Add all institutional requirements, funding acknowledgments, and detailed copyright information in a separate file.

3. **Cross-Reference**: Include a brief statement in your README.md referencing both files:
   ```markdown
   ## License
   
   This project is licensed under the [Apache License 2.0](LICENSE).
   See [COPYRIGHT.md](COPYRIGHT.md) for institutional copyright and attribution details.
   ```

### Option 3: NOTICE File Approach

1. **Standard LICENSE**: Use the unmodified license file.

2. **Create NOTICE.txt**: Following Apache Software Foundation conventions, create a NOTICE file containing:
   - Copyright notices
   - Attribution requirements  
   - Government sponsorship acknowledgments
   - Export control statements

3. **Update Documentation**: Reference the NOTICE file in your project documentation.

---

## Common Institutional Requirements

### Government Sponsorship Acknowledgments

For U.S. government-funded projects:
```
This work was supported by [AGENCY NAME] under [GRANT/CONTRACT NUMBER].
U.S. Government sponsorship acknowledged.
```

For NASA projects:
```
Copyright © [YEAR] California Institute of Technology ("Caltech") and/or 
other contributors. U.S. Government sponsorship acknowledged.
```

### Export Control Statements

```
This software may be subject to U.S. export control laws. By downloading or 
using this software, you acknowledge that you comply with applicable export 
control laws and regulations.
```

### Multi-Institutional Copyright

```
Copyright (c) [YEAR] [PRIMARY INSTITUTION]
Portions copyright (c) [YEAR] [SECONDARY INSTITUTION]
All rights reserved.
```

---

## Validation and Compliance

### GitHub License Recognition

Test your LICENSE file with GitHub's license detection:
1. Upload your LICENSE file to a test repository
2. Verify GitHub displays the correct license in the repository sidebar
3. Confirm the license appears in the repository's API response

### Legal Review Checklist

- [ ] Institutional copyright properly attributed
- [ ] Government sponsorship acknowledged (if applicable)
- [ ] Funding sources credited as required
- [ ] Export control statements included (if required)
- [ ] License text remains legally valid
- [ ] GitHub license recognition maintained
- [ ] Legal counsel review completed

---

## Frequently Asked Questions (FAQ)

**Q: Will adding institutional copyright affect the open source nature of my license?**
A: No, properly structured institutional copyright notices do not change the open source license terms. They simply clarify ownership and attribution.

**Q: Can I modify the license text directly?**
A: Generally no. Standard licenses should not be modified as this can create legal uncertainty. Use header sections or separate files for institutional requirements.

**Q: What if GitHub doesn't recognize my modified LICENSE file?**
A: GitHub's license detection looks for exact matches to standard license text. Place institutional additions in header comments or separate files to maintain recognition.

**Q: Do I need both a LICENSE and COPYRIGHT file?**
A: It depends on your institutional requirements. Simple projects may only need enhanced LICENSE files, while complex multi-institutional projects may benefit from separate COPYRIGHT files.

**Q: How do I handle third-party dependencies with different licenses?**
A: Document all dependencies and their licenses in your NOTICE file or a separate DEPENDENCIES.md file. Ensure compatibility between all license types in your project.

**Q: What about international institutions or collaborations?**
A: International projects should consult with legal counsel from all participating institutions to ensure compliance with multiple legal frameworks.

---

## Credits 

**Authorship**:
- Created in response to [Issue #135](https://github.com/NASA-AMMOS/slim/issues/135)

**Acknowledgements**:
* NASA-AMMOS institutional license practices
* Apache Software Foundation NOTICE file conventions
* GitHub license detection requirements
* Community feedback on institutional copyright needs

---

## Feedback and Contributions

We welcome feedback and contributions to help improve and expand this guide. Please see our [contribution guidelines](https://nasa-ammos.github.io/slim/docs/contribute/contributing/). 