# LICENSE Best Practices

<pre align="center">Guidelines for selecting, implementing, and managing software licenses while respecting institutional copyright and markup requirements.</pre>

## Introduction

**Background**: Software licensing is a critical aspect of any development project that defines how others can use, modify, and distribute your code. For NASA and government-sponsored projects, selecting and implementing appropriate licenses requires careful consideration of institutional policies, copyright requirements, and legal constraints. This guide provides practical guidance for working with popular open-source licenses like Apache 2.0 and MIT while ensuring compliance with institutional copyright and markup language requirements.

Proper licensing practices enable broader adoption of NASA software, facilitate collaboration with external partners, and ensure legal compliance. This guide will help you navigate the complexities of software licensing in institutional environments while maximizing the benefits of open-source development.

**Use Cases**:
- Setting up new open-source repositories with appropriate licensing
- Migrating existing projects to compliant licensing structures  
- Understanding institutional copyright requirements for NASA/government projects
- Selecting between popular licenses (Apache 2.0, MIT, etc.) based on project needs
- Implementing proper license headers and attribution in source code
- Managing licensing for projects with multiple contributors and dependencies

---

## Prerequisites

* Basic understanding of intellectual property and copyright concepts
* Familiarity with your institution's legal and technology transfer policies
* Access to institutional legal counsel or technology transfer office when needed
* Knowledge of your project's dependencies and their licensing requirements
* Understanding of open-source software development practices

---

## Quick Start
**[Link to LICENSE Templates and Tools](#license-templates-and-examples)**

Access our curated collection of license templates specifically designed for NASA and government projects, including proper institutional copyright markup and boilerplate text that complies with federal requirements.

---

## Step-by-Step Guide

1. **Understand Institutional Requirements**
   
   Before selecting any license, consult with your institution's technology transfer office or legal counsel to understand:
   - Institutional copyright policies and requirements
   - Restrictions on software release and licensing
   - Required copyright notices and attribution formats
   - Export control considerations (ITAR, EAR)
   - Any specific institutional markup language requirements

2. **Evaluate Project Requirements**
   
   Consider your project's specific needs:
   - **Permissive vs. Copyleft**: Determine if you need strong copyleft (GPL), weak copyleft (LGPL), or permissive licensing (MIT, Apache 2.0)
   - **Patent Protection**: Apache 2.0 includes explicit patent grants, which may be important for projects with patent considerations
   - **Attribution Requirements**: Understand what attribution you require from users
   - **Commercial Use**: Decide whether commercial use should be permitted
   - **Derivative Works**: Consider how you want derivative works to be licensed

3. **Select Appropriate License**
   
   **For NASA/Government Projects, Common Choices Include:**
   
   - **Apache License 2.0**: Recommended for most NASA projects
     - Includes explicit patent grant
     - Permissive licensing allowing commercial use
     - Requires preservation of copyright and license notices
     - Compatible with institutional copyright requirements
   
   - **MIT License**: Simple permissive license
     - Minimal requirements (just attribution)
     - Very permissive and widely compatible
     - May need additional patent language for some projects
   
   - **Custom Government Licenses**: Some institutions have specific licenses
     - NOSA (NASA Open Source Agreement)
     - Custom institutional licenses with specific terms

4. **Implement Proper Copyright Headers**
   
   Add institutional copyright notices to all source files:
   ```
   /* Copyright [YEAR] [INSTITUTION NAME]
    * 
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    * 
    *     http://www.apache.org/licenses/LICENSE-2.0
    * 
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    */
   ```

5. **Create LICENSE File**
   
   Include a complete LICENSE file in your repository root:
   - Use the full license text for your chosen license
   - Add institutional copyright notice at the top
   - Include any required government markings or notices
   - Ensure the file is named `LICENSE` (no extension) for GitHub recognition

6. **Document Licensing in README**
   
   Include licensing information in your project README:
   - Clear statement of the project's license
   - Link to the LICENSE file
   - Attribution instructions for users
   - Any special licensing considerations

7. **Handle Third-Party Dependencies**
   
   - Audit all dependencies for license compatibility
   - Document third-party licenses in a `THIRD_PARTY_LICENSES` file
   - Ensure dependency licenses are compatible with your chosen license
   - Consider using tools like `license-checker` for Node.js or `pip-licenses` for Python

8. **Establish Contributor Agreement Process**
   
   For projects accepting external contributions:
   - Implement a Contributor License Agreement (CLA) if required by your institution
   - Use GitHub's built-in contribution attribution
   - Document contribution licensing requirements in CONTRIBUTING.md
   - Consider using automated CLA tools for larger projects

9. **Regular License Compliance Checks**
   
   - Periodically audit your project's licensing compliance
   - Check for new dependencies and their licenses
   - Update copyright years as needed
   - Review institutional policy changes that might affect licensing

---

## License Templates and Examples

### Apache 2.0 License Template for NASA Projects

```text
                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

[Full Apache 2.0 license text follows...]

Copyright [YEAR] National Aeronautics and Space Administration (NASA)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

### Source Code Header Template

```text
Copyright [YEAR] [INSTITUTION NAME]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

---

## Frequently Asked Questions (FAQ)

**Q: Can I use MIT license for NASA projects?**
A: MIT license can be used for NASA projects, but Apache 2.0 is often preferred because it includes explicit patent grants and more comprehensive legal protections. Always consult with your technology transfer office.

**Q: How do I handle dependencies with different licenses?**
A: Ensure all dependency licenses are compatible with your chosen license. Create a comprehensive third-party license document and consider using automated license scanning tools.

**Q: What's the difference between copyright and licensing?**
A: Copyright establishes ownership of the work, while licensing defines how others can use it. NASA typically retains copyright while granting usage rights through open-source licenses.

**Q: Do I need a CLA for my project?**
A: CLA requirements vary by institution and project. Consult with your legal team to determine if a CLA is necessary for your specific project.

**Q: How often should I update copyright years?**
A: Update copyright years annually or when making significant changes. Some organizations use ranges (e.g., "2020-2024") to simplify maintenance.

**Q: Can I change the license of my project later?**
A: Changing licenses can be complex, especially with external contributors. It's best to choose the right license from the start, but changes are possible with proper legal guidance.

---

## Credits 

**Authorship**:
- SLIM Community Contributors
- NASA AMMOS Technology Transfer Office
- [Open Source Initiative](https://opensource.org/)

**Acknowledgements**:
* [Apache Software Foundation](https://www.apache.org/) for the Apache License 2.0
* [MIT](https://mit-license.org/) for the MIT License
* [NASA Technology Transfer Program](https://technology.nasa.gov/) for institutional guidance
* [Open Source Initiative](https://opensource.org/) for license standardization
* [GitHub](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository) for repository licensing best practices

---

## Feedback and Contributions

We welcome feedback and contributions to help improve and grow this page. Please see our [contribution guidelines](https://nasa-ammos.github.io/slim/docs/contribute/contributing/). 