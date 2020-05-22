# First Time Setup of Git
[From here](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)

Git comes with a tool called *git config* that lets you get and set configuration variables that control all aspects of how Git looks and operates. These variables can be stored in three different places:
1. /etc/gitconfig file: Contains values applied to every user on the system and all their repositories. If you pass the option --system to git config, it reads and writes from this file specifically. (Because this is a system configuration file, you would need administrative or superuser privilege to make changes to it.)

2. ~/.gitconfig or ~/.config/git/config file: Values specific personally to you, the user. You can make Git read and write to this file specifically by passing the --global option, and this affects all of the repositories you work with on your system.

3. config file in the Git directory (that is, .git/config) of whatever repository you’re currently using: Specific to that single repository. You can force Git to read from and write to this file with the --local option, but that is in fact the default. (Unsurprisingly, you need to be located somewhere in a Git repository for this option to work properly.)

Each level overrides values in the previous level, so values in .git/config trump those in /etc/gitconfig.

On Windows systems, Git looks for the .gitconfig file in the $HOME directory (*C:\Users\$USER* for most people). 

# Overview of using git bash in Windows:
git config has multiple layers:
1. global config          uses global config file
2. system config          uses system config file
3. local config         uses repostitory-based config file
4. worktree config    uses config file in a directory inside a repogit sh
