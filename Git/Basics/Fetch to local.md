git checkout master
git fetch origin master
git rebase -i origin/master
# Squash commits, fix up commit messages etc.
git push origin master

# What remote connections do you have?
git remote -v

# git fetch downloads to your local
https://github.com/bigtoga/SMUDataScience

# git pull also downloads to your local
git pull https://github.com/bigtoga/SMUDataScience

