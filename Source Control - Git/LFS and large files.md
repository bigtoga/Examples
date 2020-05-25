## To install into a repo that does not have LFS files support

1. Clone the repo locally
1. Install git lfs client
1. cd to the local repo folder
1. `git lfs install` to set up the hooks
1. Use `git lfs track` to support specific file types

```python
# Data files
git lfs track "*.csv"
git lfs track "*.xlsx"
git lfs track "*.xls"
git lfs track "*.db"
git lfs track "*.sqlite"
git lfs track "*.sqldb"

# Models
git lfs track "*.pkl"

# Tableau:
git lfs track "*.twbx"
git lfs track "*.twb"
git lfs track "*.hyper"
git lfs track "*.tde"
git lfs track "*.tds"
git lfs track "*.tdsx"
```
You're all set

## If you want to clone a repo that has a lot of LFS files quickly
`git lfs clone`

## To move a repo w lots of LFS files from Github to Bitbucket
# create a bare clone of the GitHub repository
`git clone --bare git@github.com:kannonboy/atlasteroids.git`
`cd atlasteroids`

# set up named remotes for Bitbucket and GitHub
`git remote add bitbucket git@bitbucket.org:tpettersen/atlasteroids.git`
`git remote add github git@github.com:kannonboy/atlasteroids.git`

# fetch all Git LFS content from GitHub
`git lfs fetch --all github`

# push all Git and Git LFS content to Bitbucket
`git push --mirror bitbucket`
`git lfs push --all bitbucket`
