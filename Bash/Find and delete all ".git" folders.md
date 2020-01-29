1. cd to the root folder

2. **find -name ".git" -type d** to list all the subfolders
  * Alternate if globstar is enabled: **for d in **/*c*/; do echo $d; done**
  * If you want to enable globstar: **shopt -s globstar**
  
3. **find -name ".git" -type d -exec rm -rf {} +** to delete the folders with no prompt

rm-r # Deletes the folder and its contents but will prompt you once per file it encounters
