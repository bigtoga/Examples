### Basics of git
Workflow is:
1. Create local folder
2. git init inside that folder (creates the .git directory)
3. git pull (url) to get the existing master branch
4. git checkout -b NewOrExistingBranch
5. Make whatever changes you want
6. git add . (a.k.a. you have staged your changes to your branch)
7. git commit -m "My message"
8. git push --set-upstream (url) NewOrExistingBranch
9. Create a pull request
10. Review and approve the PR
At this point, your local and the remote master changes are now in sync (and thus NewOrExistingBranch is empty).
5~
### Discarding local changes - before they are staged (post Step 5)
Let's inject ourselves after Step 5 (we'll talk later about Step 6+). At this point you have made local changes, but you have not added them

git status - see whatever local changes you have staged. You will see "Changed not staged for commit:" along w your changes. 

You have 3 options here:
Option 1: git stash (discard all local changes, but save them for later)

Option 2: git checkout (insert filename) (discard local, but save to external file for later)

Option 3: git reset --hard (Nuclear option - discard all local changes perm.)

### Discarding local changes - after they are staged (post Step 6)
You have run git add and now your local changes are staged but not committed. 

git status (Your branch is up to date w master. Changes to be committed (list of files you have modified and added w git add)

You have the same options as previously along with:

Option 1: git reset HEAD (filename) (Unstage the file to the current commit)

Option 2: git reset (unstage all local changes but retain them as changed - i.e. revert the git add but keep your changes)

### Discarding local changes - after they are committed (post Step 7)
Files have been modified, added to git, and "hardened" locally but still not pushed to remote repo. Two tools for this:
1. git revert commit-id (assumes you have only one commit to undo, and that you know the commit-id)
2. git bisect A..E (good for finding "What commits are open, and which one do I want to roll back?")

git revert commit-A-id (reverts the git commit but everything else is still in play - i.e. you are still post Step 6)

You can also go with the previous reset, checkout to file, etc.


