Good resource if you get stuck - https://sethrobertson.github.io/GitFixUm/fixup.html

`git log -1` - lists the most recent commit, lists currently open commit if you have not pushed

> commit bf95e4c7af1c3aa92324d4d4dbf3424092de9053
> Author: Scott Whigham 
> Date:   Sat Apr 11 10:04:08 2020 -0500
> Comment: Here's my git commit comment

`git show -r bf95e4c7af1c3aa92324d4d4dbf3424092de9053` - launches vim and shows the changes being pushed in commit bf95e4c7af1c3aa92324d4d4dbf3424092de9053

Reminder - to exit vim in Windows, click ESC+:q

`git diff-tree --no-commit-id --name-only -r bf95e4c7af1c3aa92324d4d4dbf3424092de9053` - lists all files in a commit
`git ls-tree --name-only -r bf95e4c7af1c3aa92324d4d4dbf3424092de9053` - lists all files in a commit

### View commits in a pending push (a.k.a. what will I push?)
`git log origin/master..HEAD`

### View commits by contributor 
`git shortlog -sn`

### Exclude merge commits
`git shortlog -an --no-merges`
