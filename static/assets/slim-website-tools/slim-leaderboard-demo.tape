# SLIM Leaderboard Demo - Scanning Terraformly Repository

# Output settings
Output slim-leaderboard-demo.gif

# Require git for the demo
Require git

# Terminal settings
Set Shell "bash"
Set FontSize 24
Set Width 1200
Set Height 800
Set Theme "Dracula"

# Show the SLIM Leaderboard version
Type "slim-leaderboard --version"
Sleep 1s
Enter
Sleep 2s

# Show help to demonstrate available options
Type "slim-leaderboard --help"
Sleep 1s
Enter
Sleep 4s

# Clear screen for main demo
Type "clear"
Enter
Sleep 1s

# Scan individual repository using --repositories argument
Type "slim-leaderboard --repositories https://github.com/riverma/terraformly --output_format TREE --emoji"
Sleep 1s
Enter
Sleep 10s

# Clear screen for second example
Type "clear"
Enter
Sleep 1s

# Create a config file for scanning select NASA-AMMOS repositories
Type "echo 'Creating config file for NASA-AMMOS repositories...'"
Enter
Sleep 1s

# Speed up typing for file creation
Set TypingSpeed 20ms

Type "cat > nasa-ammos-config.json << 'EOF'"
Enter
Type '{'
Enter
Type '  "targets": ['
Enter
Type '      {'
Enter
Type '        "type": "repository",'
Enter
Type '        "name": "https://github.com/NASA-AMMOS/slim"'
Enter
Type '      },'
Enter
Type '      {'
Enter
Type '        "type": "repository",'
Enter
Type '        "name": "https://github.com/NASA-AMMOS/slim-leaderboard"'
Enter
Type '      },'
Enter
Type '      {'
Enter
Type '        "type": "repository",'
Enter
Type '        "name": "https://github.com/NASA-AMMOS/slim-starterkit-python"'
Enter
Type '      }'
Enter
Type '  ]'
Enter
Type '}'
Enter
Type "EOF"
Enter

# Reset typing speed to normal
Set TypingSpeed 100ms
Sleep 2s

# Show the contents of the config file
Type "cat nasa-ammos-config.json"
Sleep 1s
Enter
Sleep 3s

# Run scan using config file - this will be much faster with just 3 repos
Type "slim-leaderboard --output_format TREE --emoji nasa-ammos-config.json"
Sleep 1s
Enter
Sleep 12s