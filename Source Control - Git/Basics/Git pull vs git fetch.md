`git fetch` will download all changes to the remote repository 
(all branches, not just origin) to your local
.git folder. It is non-destructive in that it will
not make any changes to the tracked or
untracked files in your local working 
copy. It's basically just a metadata update
so that, when you run `git status` or other
diagnostics, you will have the most up to date
information. 

`git pull` is basically like running
`git fetch; git merge`. More recent 
commits from origin will be downloaded 
(all branches), and then newer commits to 
your current branch will be merged/applied
so that HEAD points to the same commit that
origin HEAD points to. `git pull` could be 
destructive - if you have made local, not 
pushed changes to a tracked file, your changes
would be lost as `git pull` will replace your 
changed files with the origin copy of the file. 
