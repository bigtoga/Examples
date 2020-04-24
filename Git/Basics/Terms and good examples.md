## Example working on existing repo 
1. Clone the repo (`git clone`) to a local folder
2. Create a new branch (`git checkout -b my_branch_name`)
3. Make changes and save your files. You are now using your "working area", working tree, one of the three git areas.
4. `git status` will show you two things at this point: 
what files you have changed, and "untracked" files. Essentially 
you have "dirty" changes - these changes are not saved anywhere except in your local computer in your new branch. Git
Is not tracking changes to the new files; only that they exist. 
Any new files you created in the previous step are 
untracked by default, meaning git will not track changes (yet)
5. `git add` to add any untracked files to git 
(so that git will start tracking changes to the files)  
6. `git commit` will "harden" these changes - it will commit the changes to the existing files and add the previously untracked files to git so that changes to those files in the future will be tracked
7. `git push --set-upstream origin my_branch_name` to upload your new branch and its changes to the original (remote) repo. *upstream* is basically linking this new local branch to a new remote branch. Your local branch and the remote branch do not have to have the same name but it's likely easier if you keep it that way. 
8. `git push -u origin my_branch_name`, a couple things here: _-u_ means "set upstream", so that your local branch will be linked to the remote branch you're pushing to. _origin_ specifies which remote you're pushing to. 

This value could be different than "origin", but it is called "origin" by default. _my_branch_name_ is the name of your branch. Note that, by using the _-u_ flag, in the future, when pushing up new commits on that branch, you can just type _git push_, no need to qualify it with the remote and branch name.
 
9. At this point you would create a pull request (in Bitbucket, GitHub, wherever). A pull request is a concept external to git. It's an organizational workflow, not a characteristic of git itself. The end result of your pull request is that your code is merged or declined.

10. Assuming your code got merged to _master_ in the remote repo, you can then go to your LOCAL master branch and update: _git checkout master_ then _git pull_ used to using a modal editor, you might get stuck here. You can avoid the editor by doing _git commit -m "My commit message"_. Some tips on writing a good commit message: https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html
 
