### origin
If you created your local repo as a clone of another, existing repo, then "origin" is that original repo. Doesn't have to be named "master" but it generally is.

### git push origin master
Probably terrible idea - writes local changes directly to master branch. If master did not exist remotely, it would be created.
The push commits any changes in the local branch "master" to the remote named origin

### git push origin 
Yikes! This pushes all local branches to origin

### git push origin DEV
Safer.

### git remote add origin git@github.com:bigtoga/first_app.git
Creates a remote repo, and defines that "origin" is now this remote repo

### git checkout master
Switches your local "working" branch to the master branch

### git checkout DEV
Switches your local working branch to DEV. DEV must already exist.

### git checkout -b DEV
Create a new local branch named "DEV" and use it
