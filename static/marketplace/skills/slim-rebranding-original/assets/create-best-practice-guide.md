# Create Best Practice Guide (Step 11)

This guide provides instructions for integrating with `slim-skill-creator` to help users create a new SLIM best practice from their rebranded website.

## Purpose

After successfully rebranding a SLIM website, users may want to share their customized instance as a new best practice. This step optionally invokes the `slim-skill-creator` to facilitate that process.

## When to Execute

**Timing**: After Step 10 (Summary Report) completes successfully

**Trigger**: User selects "Create a new SLIM best practice" from next steps options

**Optional**: User can skip this step entirely

---

## Step 11 Workflow

### Part 1: Check for slim-skill-creator Availability

**Action**: Search for `slim-skill-creator` in available skills/marketplace

**Methods**:

1. **Check installed skills** (preferred):
   ```bash
   # Check if skill is installed
   ls -la ~/.claude/skills/ | grep slim-skill-creator
   ```

2. **Check marketplace registry** (if available):
   ```javascript
   // If window.allMarketplaceItems is accessible
   const skillCreator = window.allMarketplaceItems?.find(
     item => item.name === 'slim-skill-creator'
   );
   ```

3. **Try to invoke directly** (fallback):
   ```
   Simply attempt to invoke and handle error if not found
   ```

---

### Part 2: If NOT Available

**Message to User**:

```
The slim-skill-creator is not installed. Would you like to install it?

slim-skill-creator helps you create and integrate new best practices
(skills, agents, MCP servers) into SLIM marketplaces.

To install:
/plugin install slim-skill-creator@slim-marketplace

After installation, you can run:
"Help me create a new SLIM best practice for my {PROJECT_NAME} website"
```

**User Options**:
1. **Install now** → Provide installation command and wait
2. **Skip** → End workflow gracefully

**If user chooses to install**:
- Provide clear command
- Wait for user to run it
- Confirm installation succeeded
- Proceed to Part 3

**If user skips**:
- Provide reminder message
- End Step 11
- End overall workflow

---

### Part 3: If Available (or After Installation)

**Message to User**:

```
Great! The slim-skill-creator is available. I'll help you create a new best practice.

What type of best practice would you like to create for your {PROJECT_NAME} website?

1. Skill - A reusable workflow or template
2. Agent - An autonomous multi-step process (recommended for website templates)
3. MCP Server - Integration with external services

Recommendation: Choose "Agent" to share your complete SLIM website rebranding workflow
```

**User Selection**: Capture user choice (1, 2, or 3)

---

### Part 4: Invoke slim-skill-creator with Context

**Based on user selection**, invoke slim-skill-creator with appropriate context:

#### If User Selects "Agent" (Recommended)

**Invocation**:

```
I'm now invoking the slim-skill-creator to create a new agent best practice.

Context being provided:
- Type: Agent
- Base template: Your rebranded SLIM website
- Branch: {BRANCH_NAME} (e.g., rebrand/website-slim-to-autodocs)
- Registry: {X} imported best practices
- Customizations: Hero section, page templates, marketplace configuration
- Target: Shareable SLIM website template for {DOMAIN}

The slim-skill-creator will guide you through:
1. Naming your agent
2. Describing its purpose
3. Documenting the workflow
4. Adding to the registry
5. Testing and validation

Handing off to slim-skill-creator...
```

**Handoff Prompt** (to slim-skill-creator):

```
Help me create a new SLIM agent best practice based on my rebranded website.

Context:
- Project name: {PROJECT_NAME}
- Domain: {DOMAIN} (e.g., documentation automation, research operations)
- Rebranding branch: {BRANCH_NAME}
- Changes made:
  * Hero section customized (removed corners, updated branding)
  * Registry with {X} external entries
  * Generated pages: contribute, FAQ, about
  * Empty marketplace handling
  * Project-specific configuration

Goal: Create an agent that others can use to create their own {DOMAIN}-focused SLIM instance

Suggested agent name: {project-name}-website-template
```

#### If User Selects "Skill"

**Invocation**:

```
I'm now invoking the slim-skill-creator to create a new skill best practice.

The slim-skill-creator will guide you through:
1. Defining your skill's purpose
2. Creating templates and assets
3. Documenting usage
4. Adding to the registry

Handing off to slim-skill-creator...
```

**Handoff Prompt**:

```
Help me create a new SLIM skill based on a component of my {PROJECT_NAME} website.

Suggestion: Extract a specific workflow (e.g., hero customization, registry import, page generation) as a standalone skill.
```

#### If User Selects "MCP Server"

**Invocation**:

```
I'm now invoking the slim-skill-creator to create a new MCP server best practice.

The slim-skill-creator will guide you through:
1. Defining the integration
2. Setting up MCP server configuration
3. Documenting API usage
4. Adding to the registry

Handing off to slim-skill-creator...
```

**Handoff Prompt**:

```
Help me create a new SLIM MCP server based on integrations in my {PROJECT_NAME} website.
```

---

### Part 5: After slim-skill-creator Completes

**No further action needed** - slim-skill-creator handles:
- Creating the best practice files
- Updating the registry
- Committing changes
- Providing next steps

**Agent's final message**:

```
✓ slim-skill-creator has completed!

Your new best practice has been created and added to the {PROJECT_NAME} marketplace.

You can now:
1. Test your new best practice locally
2. Create a pull request to share with the community
3. Document additional customizations in the README

Thank you for contributing to the SLIM ecosystem!
```

---

### Part 6: If User Declines

**If user chooses not to create a best practice**:

```
No problem! You can create a best practice later by:

1. Installing slim-skill-creator:
   /plugin install slim-skill-creator@slim-marketplace

2. Then running:
   "Help me create a new SLIM best practice"

Your rebranded website is complete and ready to use!
```

**End workflow** gracefully

---

## Integration Points

### From Step 10 (Summary Report)

After displaying the summary report, add option:

```
Would you like help with any of the following?

1. Test the website locally
2. Create a pull request
3. Deploy to GitHub Pages
4. Create a new SLIM best practice ← THIS TRIGGERS STEP 11
5. None - I'm all set!
```

If user selects option 4 → Enter Step 11

---

## Example Complete Flow

```
Agent: Your SLIM website rebranding is complete! Would you like to create a
       new SLIM best practice to share your {PROJECT_NAME} template?

User: Yes

Agent: Checking for slim-skill-creator...
       ✓ slim-skill-creator is available

       What type would you like to create?
       1. Skill
       2. Agent (recommended)
       3. MCP Server

User: 2

Agent: Great choice! Invoking slim-skill-creator to create an agent.

       Context being provided:
       - Type: Agent
       - Name: autodocs-website-template
       - Base: Your rebranded SLIM website
       - Registry: 17 external entries
       ...

       Handing off to slim-skill-creator...

[slim-skill-creator takes over and guides user through creation]

[After completion]

Agent: ✓ Your new agent "autodocs-website-template" has been created!

       Next steps:
       - Test it locally
       - Create a PR to share with the community

       Thank you for contributing to SLIM!
```

---

## Error Handling

### Error: slim-skill-creator not found

**Response**:
```
slim-skill-creator is not available.

To install:
/plugin install slim-skill-creator@slim-marketplace

Would you like me to provide installation instructions? (yes/no)
```

### Error: slim-skill-creator invocation fails

**Response**:
```
There was an issue invoking slim-skill-creator.

Please try manually:
"Help me create a new SLIM best practice"

Or create an issue if the problem persists.
```

### Error: User cancels during slim-skill-creator workflow

**Response**:
```
No problem! You can resume creating a best practice anytime.

Your rebranded website is complete and ready to use.
```

---

## Summary

Step 11 provides an **optional, helpful workflow** for users to:
1. Discover slim-skill-creator
2. Install it if needed
3. Create a shareable best practice from their rebranded website
4. Contribute back to the SLIM ecosystem

**Key points**:
- Completely optional (user can skip)
- Integrates seamlessly with slim-skill-creator
- Provides clear context and recommendations
- Handles both installed and not-installed scenarios
- Ends workflow gracefully whether user participates or not
