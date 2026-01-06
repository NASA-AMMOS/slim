# Meeting Agenda Generation Workflow

This workflow guides you (the AI) through the process of generating a comprehensive meeting agenda by orchestrating context gathering from multiple sources.

## Overview

You will:
1. Verify workspace setup
2. Gather user inputs
3. Discover meeting information from MEETINGS.md
4. Find or generate previous meeting summaries
5. Discover agenda template
6. Gather external context from services
7. Organize all inputs in work area
8. Generate agenda matching template format
9. Save to final location

## Step-by-Step Workflow

### Step 1: Initial Setup and Verification

**Check workspace initialization:**
1. Look for AGENTS.md in the current directory or parent directories
2. If found, read it to determine workspace root
3. Verify these static files exist:
   - `static/PROJECT.md`
   - `static/TEAM.md`
   - `static/PRODUCTS.md`
   - `static/MEETINGS.md`
   - `static/TECH.md`

**If any files are missing:**
- Inform user which files are missing
- Guide them to run `slim-project-aware-workspace` skill first
- STOP execution until workspace is properly set up

**If all files exist:**
- Proceed to Step 2

---

### Step 2: Gather User Inputs

**Prompt user for the following information:**

1. **Meeting Name**: "What is the name of the meeting?"
   - Accept partial names (e.g., "standup", "weekly", "planning")
   - Will match against MEETINGS.md in next step

2. **Date/Time Range**: "What date/time range should I use to gather context?"
   - Support natural language:
     - "last week"
     - "past two weeks"
     - "two weeks ago through last Tuesday"
     - "Nov 1 - Nov 15"
     - "2024-11-01 to 2024-11-15"
   - Interpret and convert to actual start/end dates
   - Store for use in finding summaries and querying services

3. **Agenda Date**: "When is the meeting for which you're creating this agenda?"
   - Accept formats: "YYYY-MM-DD", "Dec 15", "next Monday", etc.
   - Convert to YYYY-MM-DD format
   - This determines the output folder location

**Store all inputs for use in subsequent steps.**

---

### Step 3: Meeting Discovery Branch

**Read static/MEETINGS.md:**

1. Search for meeting name provided by user
   - Use case-insensitive, partial matching
   - Look in section headers (lines starting with `##`)

**IF MEETING FOUND:**
- Extract all metadata:
  - **Purpose**: What this meeting is for
  - **Meeting Link**: Zoom/Teams/etc. URL
  - **Frequency**: How often it occurs (Weekly, Biweekly, etc.)
  - **Day & Time**: When it occurs
  - **Duration**: How long it lasts
  - **Attendees**: Who participates
  - **Agenda Template** (if present): URL or path to template file
- Display found metadata to user for confirmation
- Proceed to Step 4

**IF MEETING NOT FOUND:**
- List available meetings from MEETINGS.md
- Ask user: "I couldn't find that meeting. Would you like to:
  A) Provide the meeting metadata manually
  B) Choose from the available meetings above
  C) Add this meeting to MEETINGS.md first"
- Based on user choice:
  - If A: Prompt for all metadata fields
  - If B: Let user select, then extract metadata
  - If C: Guide user to update MEETINGS.md, then re-run this step
- Proceed to Step 4 once metadata is available

---

### Step 4: Previous Summaries Discovery Branch

**Calculate expected meeting dates:**

1. Based on meeting frequency from MEETINGS.md:
   - Parse frequency (e.g., "Weekly", "Biweekly", "Every Monday")
   - Parse Day & Time to get day of week
   - Calculate which dates in the user-provided range would have had meetings

2. For each expected date, check if summary exists:
   - Look in: `dynamic/[YYYY-MM-DD]/meeting-summaries/`
   - Search for files matching pattern: `meeting-summary-*[meeting-name]*.md`
   - Be flexible with title matching (partial match, case-insensitive)

**IF ALL SUMMARIES EXIST:**
- List found summaries with their dates
- Proceed to Step 6

**IF SOME SUMMARIES ARE MISSING:**
- Proceed to Step 5

---

### Step 5: Missing Summaries Handling Branch

**Display to user:**
- Found summaries: [list with dates and paths]
- Missing summaries: [list with expected dates]

**Ask user:** "Some meeting summaries are missing. Would you like to:
A) Generate them now using slim-meeting-summary
B) Proceed without them
C) Provide meeting notes manually for missing dates"

**If A (Generate summaries):**
- For each missing date, provide instructions:
  ```
  To generate summary for [Meeting Name] on [Date]:
  1. Run: /plugin invoke slim-meeting-summary
  2. Provide meeting notes/transcript for [Date]
  3. Return here when complete
  ```
- Wait for user confirmation that summaries are generated
- Re-check for summaries in dynamic folders
- Once all are present, proceed to Step 6

**If B (Proceed without):**
- Note which summaries are missing
- Warn user that agenda may be less comprehensive
- Proceed to Step 6

**If C (Manual notes):**
- Accept notes for each missing date
- Save to work area for reference
- Proceed to Step 6

---

### Step 6: Agenda Template Discovery Branch

**Check if template was specified in MEETINGS.md:**

**IF TEMPLATE URL/PATH EXISTS in meeting metadata:**
- Attempt to read the template file
- If successful, proceed to template analysis
- If unsuccessful, fall back to asking user

**IF NO TEMPLATE in MEETINGS.md:**
- Ask user: "Do you have a specific agenda template you'd like to use?
  A) Yes, I'll provide the path/URL
  B) Yes, I'll paste the content
  C) No, use the default template"

**Based on user choice:**
- If A: Read template from provided path
- If B: Accept pasted template content
- If C: Use default from `assets/meeting-agenda-template.md`

**Analyze template structure:**
1. Identify file type (.md, .docx, .txt)
2. Extract sections (Previous Action Items, Discussion Topics, etc.)
3. Note formatting style (tables, lists, headers)
4. Store template for use in Step 8

---

### Step 7: External Context Gathering Branch

**Read static/TECH.md:**

1. Parse each section (## headers represent services)
2. For each service section:
   - Check for "MCP Server/API/Script:" line
   - Extract integration type and details

**FOR EACH SERVICE with integration:**

**Example services: GitHub, Slack, Jira, Email, etc.**

**IF queryable integration exists:**
- Prompt user with specific query instructions:
  ```
  I found [Service Name] integration in TECH.md.

  To gather context from [Service Name] for date range [start] to [end]:
  [Service-specific instructions]

  Would you like to query this service? (Y/N)
  ```
- If Yes:
  - For MCP servers: Provide MCP query commands
  - For APIs: Provide API call examples or run if possible
  - For scripts: Provide script execution commands
  - Ask user to provide results or run the query
  - Save results to work area

**IF no queryable integration:**
- Skip this service
- Move to next service

**After checking all services:**
- Ask: "Would you like to provide any additional context manually?"
- If yes, accept and save to work area

---

### Step 8: Work Area Preparation

**Create organized folder structure:**

1. **Main folder**: `dynamic/[agenda-date]/meeting-agendas/[meeting-name-slug]/`
   - Convert meeting name to slug (lowercase, hyphens, no spaces)
   - Example: "Weekly Team Standup" → "weekly-team-standup"

2. **Create prep/ subfolder** with structure:
   ```
   dynamic/[agenda-date]/meeting-agendas/[meeting-name-slug]/
   └── prep/
       ├── context/
       ├── previous-summaries/
       ├── external-context/
       └── template/
   ```

3. **Copy/save all gathered inputs:**

   **prep/context/:**
   - Copy `static/PROJECT.md` → `prep/context/PROJECT.md`
   - Copy `static/TEAM.md` → `prep/context/TEAM.md`
   - Copy `static/PRODUCTS.md` → `prep/context/PRODUCTS.md`
   - Copy `static/MEETINGS.md` → `prep/context/MEETINGS.md`

   **prep/previous-summaries/:**
   - Copy each found meeting summary
   - Name: `summary-[YYYY-MM-DD].md`

   **prep/external-context/:**
   - Save GitHub query results → `github-activity.md`
   - Save Slack messages → `slack-messages.md`
   - Save other service results with descriptive names

   **prep/template/:**
   - Save agenda template → `agenda-template.[ext]`

4. **Confirm work area is ready:**
   - List all files copied
   - Display work area location
   - Proceed to Step 9

---

### Step 9: Agenda Generation

**Now generate the final agenda using all gathered context:**

1. **Read all inputs from work area:**
   - Project context from prep/context/
   - Previous summaries from prep/previous-summaries/
   - External context from prep/external-context/
   - Template from prep/template/

2. **Extract relevant information:**

   **From previous summaries:**
   - Scan action items tables
   - Identify items with Status = "Pending" or "In Progress"
   - Group by owner for easy reference

   **From external context:**
   - Identify GitHub issues/PRs mentioned
   - Find Slack discussion topics
   - Note any deadlines or important updates

   **From TEAM.md:**
   - Get current roles for attendees
   - Verify team member names

   **From PRODUCTS.md:**
   - Check for upcoming releases/milestones
   - Note any relevant product updates

3. **Generate agenda matching template structure:**

   **Fill in metadata:**
   - Meeting name
   - Date (from user input)
   - Time (from MEETINGS.md)
   - Location/Link (from MEETINGS.md)
   - Attendees (from MEETINGS.md, with roles from TEAM.md)

   **Previous Action Items Review section:**
   - Populate table with pending items from previous summaries
   - Include Owner, Status, and any relevant notes/updates

   **Discussion Topics section:**
   - Generate topics from external context
   - For each topic:
     - Background: Summarize context (from GitHub/Slack/etc.)
     - Expected Outcome: What should be decided/achieved
   - Number topics (1, 2, 3, etc.)

   **Action Items section:**
   - Leave as placeholder table for items to be assigned during meeting
   - Include standard columns: Action Item, Owner, Due Date, Status

   **Match formatting:**
   - Use same file type as template (.md, .docx, or .txt)
   - Preserve section order and formatting style
   - Include footer with generation metadata

4. **Save final agenda:**
   - Location: `dynamic/[agenda-date]/meeting-agendas/[meeting-name-slug]/meeting-agenda-[meeting-name-slug].[ext]`
   - Extension matches template format
   - Example path: `dynamic/2024-12-15/meeting-agendas/weekly-standup/meeting-agenda-weekly-standup.md`

---

### Step 10: Completion

**Display to user:**

```
✅ Meeting agenda generated successfully!

📁 Agenda location:
   dynamic/[agenda-date]/meeting-agendas/[meeting-name]/meeting-agenda-[meeting-name].[ext]

📂 Prep work saved in:
   dynamic/[agenda-date]/meeting-agendas/[meeting-name]/prep/

📋 Agenda includes:
   - Meeting metadata from MEETINGS.md
   - [X] pending action items from previous meetings
   - [X] discussion topics from external context
   - Action items section for assignment during meeting

The agenda is ready for review and distribution!
```

**Offer next steps:**
- "Would you like me to:
  A) Display the agenda content
  B) Generate agenda for another meeting
  C) Make any changes to this agenda"

---

## Key Principles for AI Execution

1. **Be Flexible:** Handle variations in file formats, missing data, and unexpected structures gracefully

2. **Communicate Clearly:** At each decision point, present options to user and wait for input

3. **No Summary Files:** Use files in prep/ directly - don't create intermediate summary files

4. **Partial Matching:** Use case-insensitive, partial matching for meeting names and file searches

5. **Natural Language:** Interpret date ranges and user inputs in natural language

6. **Graceful Degradation:** If resources are missing, offer alternatives rather than failing

7. **Context is Key:** Use PROJECT.md, TEAM.md, PRODUCTS.md to enhance agenda quality

8. **Format Matching:** Precisely match the template's structure, sections, and formatting style

9. **User Confirmation:** Wait for user confirmation at critical steps (missing summaries, service queries)

10. **Clear Output:** Always display final file location and summary of what was included

---

## Troubleshooting Guide

**Issue**: Cannot find AGENTS.md
- **Solution**: Guide user to run slim-project-aware-workspace skill first

**Issue**: Meeting not in MEETINGS.md
- **Solution**: Offer to use manual metadata or let user update MEETINGS.md

**Issue**: No previous summaries found
- **Solution**: Offer to generate with slim-meeting-summary or proceed without

**Issue**: Cannot access external services
- **Solution**: Ask for manual context or proceed with available information

**Issue**: Template format unclear
- **Solution**: Use default template from assets/

**Issue**: Multiple meetings match search
- **Solution**: Display all matches and let user choose

---

## Example Execution

**User**: "Create agenda for weekly standup"

**AI**:
1. ✅ Found AGENTS.md, workspace initialized
2. ✅ All static files present
3. 📝 Asking for date range: "What date range for context?" → "last week"
4. 📝 Asking for agenda date: "When is the meeting?" → "next Monday"
5. 🔍 Found "Weekly Team Standup" in MEETINGS.md
6. 📊 Found 2 summaries, 0 missing
7. 📄 Using default template (none in MEETINGS.md)
8. 🌐 Found GitHub in TECH.md, prompting for query
9. 📁 Creating work area at: dynamic/2024-12-16/meeting-agendas/weekly-team-standup/
10. ✍️ Generating agenda...
11. ✅ Saved to: dynamic/2024-12-16/meeting-agendas/weekly-team-standup/meeting-agenda-weekly-team-standup.md

---

Follow this workflow step-by-step, adapting to the specific situation and user needs!
