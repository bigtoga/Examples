A tag is a friendly name for a SHA-1 hash of a specific commit-id. It’s just a  pointer to a specific commit. That’s all. 
- Tags are *commit*-level, not branch or repository-level
- A tag represents a snapshot of the repository at a specific point in time
- Useful to think of it as “a named commit”

# Two types of tags

**Annotated tags** store metadata such as author name, email, date, and a commit message related to the tag itself
- `git tag -a v1.0.0`
- `git tag -a v1.4 -m “my version 1.4”`

**Lightweight tags** just add the tag without the metadata 
- `git tag v1.0.0`

**Best practice** is to use annotated tags** so that you have the metadata

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
- **Your tag is not in origin! By default git does not push tags!!!**
- In your local repo/branch, `git push origin v1.4`
- *Now this tag is in master and points to the most recent commit*

# FAQs about tags
1. **Can you add the same tag to another commit?*. No, if you try to add a tag that already exists, Git will error out: `fatal: tag ‘v0.4’ already exists`. You can overwrite tags with `-f` (f is for FOR E). 
2. **Who should use tags?** Whoever is responsible for releases
1. **Can you have multiple tags at same time for a commit?** Yes, instead of `git push origin v1.4`, change to `git push origin —-tags` which will post all local tags to origin 
1. **When should I create a tag?** Generally pinky prior to a release 
- Most tools have a `release` packager
- GitHub uses [its Create release page](https://help.github.com/en/github/administering-a-repository/managing-releases-in-a-repository) to allow developers to create and tag the release in GUI

# Recipes and code samples

### Viewing tags
```python   
# Show all tags
git tag 

# Last 3 tags
git tag -n3

# Search for tags (wildcard)
git tag -l *-rc* # shows any tags that contain “-rc”
``` 

### View contents of a tagged release 
`git show v1.4`
- If this is an annotated tag, it will show metadata 

# How to think about tags
- Tags are *stationary* since they point to a specific commit; Branches *move* (i.e. HEAD moves to latest commit always)
- Tags are a snapshot point in time view of a repo
- Tags are like a DNS CNAME alias - a pointer to something else that’s harder to remember 

# Branches vs. Tags

|   | Branch | Tag |
|—|—|—|
| Is immutable once created |   | x |
| Should be deleted after merge | x |   |
| Should never be deleted |   | x |
| Refers to a specific commit-id | x | x |
| Can checkout | Yes - `git checkout mYBranch` | Technically yes - `git checkout v1.4` works but puts HEAD in a detached state. Don’t. |
|   |   |   |

# Additional resources
- [Documentation](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
- http://alblue.bandlem.com/2011/04/git-tip-of-week-tags.html
- https://mohitkhare.me/blog/git-tags-explained/
- https://stackoverflow.com/questions/14613540/do-git-tags-only-apply-to-the-current-branch#:%7E:text=Tags%20and%20branch%20are%20completely,what%20you%20want%20to%20tag