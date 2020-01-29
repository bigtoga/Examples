### Step 1: cd to the root folder
**cd G:\GithubRepos\MyRepo**

### Step 2: List matching subfolders of directory
**find -name ".git" -type d** 
  
### Step 3: Delete folders with no prompt:  
**find -name ".git" -type d -exec rm -rf {} +** 

rm-r # Deletes the folder and its contents but will prompt you once per file it encounters
