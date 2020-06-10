Pretty easy:
- Use `git cherry-pick <commit hash>` when you want to merge all changes from a specific *commit*
- Use `git format-patch` and `git am` when you want to merge all changes from a branch 
- Use `git checkout - -patch <file>` when you only want to merge a single file

# Patch files in Git
You really have two options in Git:
1. Create a set of *patch files* that represent “the changes in one branch vs another”
1. Just brute force merging a file from one branch to another

## Creating “patch files”
`git format-patch <branch> <options>`

1. Checks for commits in <branch> that are not in the current branch
1. Creates one patch file (ends in “.patch”) for each commit that is in <branch> but not in your current branch, named with subsequent file names
1. **Gotcha**: by default, patch files will be created in your current directory. This will create untracked files. To avoid, either:
   - Add “.patch” to .gitignore before you create the patch files (add/commit/push/merge)
   - Or create the patch files in a separate directory that is not part of Got repository 

If you want to see the difference between the two branches:

`git diff —oneline —graph <branch>..<current_branch>`

# To do / Questions
- I don’t understand why I would use `git format-patch...` followed by `git am` to apply all commits from another branch. Why not just `git merge`?
