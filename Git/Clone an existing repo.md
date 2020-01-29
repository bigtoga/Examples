## Clone an existing repo to your local:
1. cd to where you want to store the local repo
1. Make a NEW directory that does not already have a .git folder/repo (mkdir MyFolder)
1. Seriously - follow the previous instruction
2. git clone (url) # can also add .git at end
3. cd into the directory
4. git checkout -b BranchName
5. Make your changes (touch readme.md, echo "Hey!" >> readme.md)
6. git add .
7. git commit -m "My comment"
8. git push --set-upstream origin BranchName
1. git checkout master
1. git merge BranchName
