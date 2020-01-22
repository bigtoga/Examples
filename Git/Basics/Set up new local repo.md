## Clone an existing repo to your local:
1. cd to where you want to store the local repo
1. Make a NEW directory that does not already have a .git folder/repo (mkdir MyFolder)
1. Seriously - follow the previous instruction
2. git clone (url).git
3. cd into the directory
4. git checkout -b BranchName
5. Make your changes (touch readme.md, echo "Hey!" >> readme.md)
6. git add .
7. git commit -m "My comment"
8. git push --set-upstream origin BranchName
9. 

## How to set up a new local repository
1. cd to the directory you want to store your repo in
2. Create a folder to hold the files
3. cd to that folder
4. git init (to add this folder to .git)
6. git checkout (branch)
7. Make whatever changes you need
8. git add .
9. git commit -m "Update"
7. git set-upstream (url)
8. git push (url)
1. git checkout master
1. git merge (branch)
