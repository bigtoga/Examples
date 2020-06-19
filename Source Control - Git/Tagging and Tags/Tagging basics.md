A tag is a friendly name for a SHA-1 hash of a specific commit-id. It’s just a  pointer to a specific commit. That’s all. 
- Tags are *commit*-level, not branch or repository-level
- A tag represents a snapshot of the repository at a specific point in time
- Useful to think of it as “a named commit”

# Use cases for tags and tagging

When to use tags:
1. You want to create a historic milestone marker in your repository’s history that is easy for entire team to find
   - `git tag TimeoutFix`
   - From now on, anyone can use `git tag` will list of `TimeoutFix` and anyone can browse the code at that specific point in time
1. You want to create a release, this you put a tag on entire branch at a moment in time 
   - `git tag v1.0.0` places a milestone marker at HEAD of the current branch
   - When this commit gets merged to master, the tag is “in play” for everyone and now anyone can request 
   - Teams can use `git tag` to see two tags (i.e. named commits): `TimeoutFix` and `v1.0.0`

# Example

- Create Feature (topic) branch as clone of master
- Make changes 
- Add tag `git tag v1.0` will tag HEAD of your feature branch 
- Add, commit, push
- *At this point, the commit in your feature branch is the only place where this tag is used*
- Create pull request, get it approved, get it merged into master
- *Now this tag is in master and points to this specific commit/change only*

How to think about tags
- Tags are *stationary* since they point to a specific commit; Branches *move* (i.e. HEAD moves to latest commit always)
- Tagging 

# Additional resources
- https://mohitkhare.me/blog/git-tags-explained/
- https://stackoverflow.com/questions/14613540/do-git-tags-only-apply-to-the-current-branch#:%7E:text=Tags%20and%20branch%20are%20completely,what%20you%20want%20to%20tag