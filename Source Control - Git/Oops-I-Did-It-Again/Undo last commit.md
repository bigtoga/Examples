https://devconnected.com/how-to-undo-last-git-commit/

```shell
# Show recent commits
git log --oneline

# View contents/diff of a specific commit
git show commit_id

# List just the files (not a diff)
git log --name-status --diff-filter="ACDMRT" -1 -U c

# Undo the most recent commit with git reset
git reset --soft HEAD~1

git log --oneline --graph
```

# In many ways, git reset is the opposite of git add
