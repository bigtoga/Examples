# Shallow clone
By default when you clone a repo, you clone not only the objects but the entire history of the repo. In a busy project, the .git folder can be 10s of GBs.

`git clone --depth 1 <url>` will only retrieve the latest commits

You can also use git shallow clone to access a single branch:
`git clone [remote-url] --branch [name] --single-branch [folder]` 

# Prune your repos
```python
git checkout --orphan freshBranch
git add -A
git commit
git branch -D master 
git branch -m master 
git push -f origin master 
git gc --aggressive --prune=all
git push -f origin master
```
