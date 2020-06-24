Based on my own usage/experiences 

1. Favor feature/topic branch style development 
2. Short lived feature branches make it easier to work in large teams
1. Commit early and often, if for no other reason than to give yourself a save point to rollback to 
1. `git fetch` early and often to detect potential conflicts
1. Squash “commits that were used just to save progress or provide the developer a save / rollback point but are otherwise useless” - makes `git bisect` 100x easier
   - Example: if you have 10 commits over past 12 hours just to save your work, squash those to a single commit before creating a pull request 