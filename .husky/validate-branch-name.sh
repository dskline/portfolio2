#!/usr/bin/env bash

branch_name=$(git rev-parse --abbrev-ref HEAD)

# Regex for valid branch prefixes: {issue-type}/{tag} (lower kebab-case)
valid_prefixes=(
    "feat"      # for new features
    "fix"       # for bug fixes
    "style"     # for code style changes
    "chore"     # for maintenance tasks
    "docs"      # for documentation changes
    "test"      # for adding or updating tests
    "ci"        # for continuous integration changes
    "perf"      # for performance improvements
    "refactor"  # for code refactoring
    "security"  # for security-related changes
    "release"   # for version release
)

# Construct the regex pattern from the valid prefixes
valid_branch_pattern="^(${valid_prefixes[0]}"
for prefix in "${valid_prefixes[@]:1}"; do
    valid_branch_pattern+="|${prefix}"
done
valid_branch_pattern+=")/.*[a-z0-9-]$"

# Allow common main/development branches to bypass the pattern check
if [[ "$branch_name" == "main" || "$branch_name" == "preview" ]]; then
    echo "Bypassing branch name check for excluded branches."
    exit 0
fi

if [[ "$branch_name" =~ $valid_branch_pattern ]]; then
    echo "Branch name '$branch_name' is valid."
    exit 0 # Branch name is valid
else
    echo "--------------------------------------------------------------------------------"
    echo "Error: Invalid branch name: '$branch_name'"
    echo "Branch name must start with one of the following prefixes:"
    for prefix in "${valid_prefixes[@]}"; do
        echo "  - $prefix"
    done
    echo "Allowed characters: lowercase letters, numbers, hyphens"
    echo "Allowed main branches: main, preview"
    echo "--------------------------------------------------------------------------------"
    exit 1 # Prevent commit
fi
