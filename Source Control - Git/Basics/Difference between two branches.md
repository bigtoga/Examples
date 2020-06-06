

```python   
# Show the differences published in the remote repo
git fetch
git diff localRepo origin/remoteRepo

# Show only the file names
git fetch
git diff develop origin/develop —stat

# Show commits added to remote that have not been applied locally
git fetch
git log develop..origin/develop

# Show local commits not applied to remote
git fetch
git log origin/develop..develop
```
