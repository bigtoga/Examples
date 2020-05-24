```python
# Roll back last commit
git reset --soft HEAD~1

# Tell git to stop tracking the file
git rm --cached <file>

git add .; git commit -m "Message"; git push
```
