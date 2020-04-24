## Example working on existing repo 
1. Clone the repo (`git clone`) to a local folder
2. Create a new branch (`git checkout -b my_branch_name`)
3. Make changes and save your files. You are now using your "working area", 
working tree, one of the three git areas.
4. `git status` will show you two things at this point: 
what files you have changed, and "untracked" files. Essentially 
you have "dirty" changes - these changes are not saved anywhere 
except in your local computer in your new branch. Git
Is not tracking changes to the new files; only that they exist. 
Any new files you created in the previous step are 
untracked by default, meaning git will not track changes (yet)
5. `git add` to add any untracked files to git 
(so that git will start tracking changes to the files)  
6. `git commit` will "harden" these changes - it will commit the 
changes to the existing files and add the previously untracked 
files to git so that changes to those files in the future will be tracked
7. `git push --set-upstream origin my_branch_name` to upload your new 
branch and its changes to the original (remote) repo. *upstream* 
is basically linking this new local branch to a new remote branch. 
Your local branch and the remote branch do not have to have the 
same name but it's likely easier if you keep it that way. 
Also note that you only need to do this linking once. Future
Changes to this branch will only need to use `git push` since
Git tracks the linking already. 
*origin* is not really a git keyword per se (you could use any word actually) 
But it is convention to associate the word "origin" with the branch
You are pushing to. 
8. Go create a pull request. A pull request is a concept external to git. 
It's an organizational workflow, not a characteristic of git itself.
9. Someone will now need to review your pull request/PR. If they approve, they will
approve the pull request, or they will decline if it they do not approve. This is
your basic code review. 
10. Your approved PR is now `git merge` into `master` - you did it!
11. At this point your local branch is possibly out of sync with other changes 
that have also merged into master since when you started your development. 
Best practice now to sync your local folder with master: 
`git switch master; git pull;` will download the latest changes to your computer. 


Some tips on writing a good commit message: https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html
 
