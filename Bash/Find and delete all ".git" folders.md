1. cd to the root folder
2. find -name ".git" -type d # list all the subfolders
2.2 Alternate if globstar is enabled: "for d in **/*c*/; do echo $d; done"
2.3 If you want to enable globstar: shopt -s globstar
3. find -name ".git" -type d -exec rm -r "{}" \;

rm-r # Deletes the folder and its contents
