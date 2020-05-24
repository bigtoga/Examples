# Option 1 - just try this one file
```python
# Roll back last commit
git reset --soft HEAD~1

# Tell git to stop tracking the file
git rm --cached <file>

git add .; git commit -m "Message"; git push
```

# Option 2 - brute force it by removing all files
```python 
# Remove all references to all files in the local working directory
git rm -r --cached . 

# Reference them all again
git add .
```

# Option 3 
git update-index --assume-unchanged <file>
