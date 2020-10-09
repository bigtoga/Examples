Trunk-based development

Release Flow

Gitflow
- Source: https://github.com/nvie/gitflow 
- https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow
- When to use: projects that have a scheduled release cycle 
- Two branches, `master` and `develop`
- Uses basic Feature branch workflow - feature branches are created on `develop` then merged in 
- Once `develop` has enough features for a release (or a predetermined release date is approaching), you fork a release branch off of develop

Instead, it assigns very specific roles to different branches and defines how and when they should interact. In addition to feature branches, 
it uses individual branches for preparing, maintaining, and recording releases. Of course, you also get to leverage all the benefits of 
the Feature Branch Workflow: pull requests, isolated experiments, and more efficient collaboration.



Github Flow 
- Changes shipped to Production before merged to master
- https://youtu.be/t_4lLR6F_yk?t=785 
