1. cd to the root folder

# List matching subfolders of directory
2. **find -name ".git" -type d** 
  
# Delete folders with no prompt:  
3. **find -name ".git" -type d -exec rm -rf {} +** 

rm-r # Deletes the folder and its contents but will prompt you once per file it encounters
