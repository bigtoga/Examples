When you have a broken commit, you have two choices:
1. Manually inspect and go through each recent commit by hand to identify the bad commit
2. Have `git bisect` do the dirty work for you and quickly tell you which commit is bad

Git bisect uses a **binary search** to find the broken commit. 
> Binary search is an efficient algorithm for finding an item from a sorted list of items. 
> It works by repeatedly dividing in half the portion of the list that could contain the 
> item, until you’ve narrowed down the possible locations to just one.
> [More info](https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search)

`git bisect start`

# Resources
* https://itnext.io/git-bisect-how-to-track-down-a-broken-commit-4fc82ae98ed6
