A tag is a pointer to a specific commit. That’s all. 
- Tags are commit-level, not branch or repository-level

Example:
- Create Feature (topic) branch as clone of master
- Make changes 
- Add tag `git tag v1.0` will tag HEAD of your feature branch 
- Add, commit, push
- *At this point, the commit in your feature branch is the only place where this tag is used*
- Create pull request, get it approved, get it merged into master
- *Now this tag is in master and points to this specific commit/change only*

How to think about tags
- Tags are *stationary* since they point to a specific commit; Branches *move* (i.e. HEAD moves to latest commit always)

https://stackoverflow.com/questions/14613540/do-git-tags-only-apply-to-the-current-branch#:%7E:text=Tags%20and%20branch%20are%20completely,what%20you%20want%20to%20tag