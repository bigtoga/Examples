When you have a broken commit, you have two choices:
1. Manually inspect and go through each recent commit by hand to identify the bad commit
2. Have `git bisect` do the dirty work for you and quickly tell you which commit is bad

Git bisect uses a **binary search** to find the broken commit. 
> Binary search is an efficient algorithm for finding an item from a sorted list of items. 
> It works by repeatedly dividing in half the portion of the list that could contain the 
> item, until you’ve narrowed down the possible locations to just one.
> [More info](https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search)

Note that `git bisect` will not fix anything for you; it is simply a tool to speed
up identifying which commit in a large project is bad. 

Step 1: `git bisect start` will start the 'wizard'. If you need to exit early, do so with `git bisect reset`

Step 2: Find the last known good commit and run `git bisect good <commit>`

Step 3: If you know the bad commit, go ahead and enter it: 
`git bisect bad <commit>`. If you need Git to find it for you,
 just leave the `<commit>` blank. Use `git log` to find the
commits. 

```shell
Bisecting: 49 revisions left to test after this (roughly 9 steps)
[d0b028f205a78ecc748e69d62450b4a804784da9] mb/google/cyan: Adjust 
ACPI interrupt triggering for audio codecs
```
In the above, our last know good commit was 49 commits ago and `git bisect` 
is now going through each of the more recent commits
to find the bad commit. 

Step 4: Git bisect will prompt you with the bad commit changes. 
Once you have identified the bad commit, tell Git about it 
with `git bisect bad`  

Step 5: Git will next suggest a good commit halfway between 
the latest bad commit and the 
known good commit then suggest you use it. When
you have the good commit identified, run 
`git bisect good` to tell Git "This is the good version"

Step 6: Git will now report back which commit is bad
along with the date, time, and who. You can then follow up with that
developer and issue a patch/fix/etc. 

Step 7: close out of the wizard with `git bisect reset`

# Resources
* https://www.metaltoad.com/blog/beginners-guide-git-bisect-process-elimination
* https://itnext.io/git-bisect-how-to-track-down-a-broken-commit-4fc82ae98ed6
