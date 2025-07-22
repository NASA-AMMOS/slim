# SLIM CLI Demo - Applying README Best Practice

# Output settings
Output slim-cli-demo-apply.gif

# Require git for the demo
Require git

# Terminal settings
Set Shell "bash"
Set FontSize 24
Set Width 1200
Set Height 800
Set Theme "Dracula"

# Show the SLIM CLI version
Type "slim --version"
Sleep 1s
Enter
Sleep 2s

# List available best practices
Type "slim list"
Sleep 1s
Enter
Sleep 3s

# Create a sample test directory
Type "mkdir -p /tmp/sample-repo && cd /tmp/sample-repo"
Sleep 500ms
Enter
Sleep 1s

# Initialize git repo
Type "git init"
Sleep 500ms
Enter
Sleep 1s

# Apply readme best practice
Type "slim apply --best-practice-ids readme --repo-dir ."
Sleep 1s
Enter
Sleep 5s

# Show what was created
Type "ls -la"
Sleep 1s
Enter
Sleep 2s

# Show the README content
Type "head -20 README.md"
Sleep 1s
Enter
Sleep 3s

# Clear screen for next example
Type "clear"
Sleep 500ms
Enter
Sleep 1s

# Part 2: GitHub URL Example
Type "echo '=== Applying to a GitHub repository ==='"
Sleep 1s
Enter
Sleep 1s

# Apply readme best practice using GitHub URL
Type "slim apply --best-practice-ids readme --repo-urls https://github.com/riverma/terraformly"
Sleep 1s
Enter
Sleep 8s