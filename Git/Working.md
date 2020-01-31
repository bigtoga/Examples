~~~
1. mkdir a directory for your local copy of the remote branch (branchName)
2. cd to that directory
3. git init 
4. git remote add origin https://github.com/bigtoga/Walking-In-Paris
5. git fetch origin 
6. git pull origin branchName
7. Make your changes
8. git checkout branchName 
9. git add .
10. git commit -m "My commit"
11. git push 

git remote show origin

origin: When a repo is cloned, it has a default remote called "origin" that points to your fork on GitHub, not the original repo it was forked from. To keep track of the original repo, you need to add another remote named "upstream"

1. mkdir a directory for your local copy of the remote branch
2. cd to that directory
3. git init 
4. git remote add origin https://github.com/bigtoga/Walking-In-Paris
5. git fetch # Update your branch when the original branch from official repository has been updated 
6. git branch -a # shows all remote branches
6. git pull 

git branch -D # force delete your local 
1. git remote add <remote_name> <repo_url>
2. git fetch <remote_name>
3. git checkout -b <new_branch_name> <remote_name>/<remote_branch_name>

git remote add upstream https://github.com/original-owner-username/original-repository.git

# Clone to a new folder:
git clone git://example.com/myproject
cd myproject

# View local branches 
git branch
>> master

# View all branches 
git branch -a 
>>> master 
>>> remotes/origin/HEAD
>>> remotes/origin/master
>>> remotes/origin/v1.0-stable
>>> remotes/origin/v1.1-experimental

# View remote branches 
git branch -r 

# Download a remote branch but for read only:
git checkout origin/v1.1-experimental

# View local branches 
>> master 

# Want to work on it? 
git checkout v1.1-experimental
>> Branch experimental set up to track remote branch experimental from origin. Switched to a new branch 'v1.1-experimental'

# View local branches 
>> master 
>> v1.1-experimental
~~~
