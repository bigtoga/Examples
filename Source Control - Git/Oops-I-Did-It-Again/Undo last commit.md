Can undo pushed commits or local commits

## If you have pushed the commit
```python
# Revert a single commit
git revert <commit_hash>

# Revert all commits after <oldest_commit_hash> 
git revert <oldest_commit_hash>..<latest_commit_hash>
```

https://devconnected.com/how-to-undo-last-git-commit/

```shell
# Show recent commits
git log --oneline

# View contents/diff of a specific commit
git show commit_id

# List just the files (not a diff)
git log --name-status --diff-filter="ACDMRT" -1 -U c

# Undo the most recent commit with git reset
# “soft” keeps your changes you’ve made and just undoes the last commit
# “hard” would also undo your changes
git reset --soft HEAD~1

git log --oneline --graph
```

# In many ways, git reset is the opposite of git add
