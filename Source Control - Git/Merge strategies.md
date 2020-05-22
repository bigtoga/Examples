https://confluence.atlassian.com/bitbucketserver/pull-request-merge-strategies-844499235.html

Merge commit (--no-ff) DEFAULT: Always create a new merge commit and update the target branch to it, even if the source branch is already up to date with the target branch.

Fast-forward (--ff): If the source branch is out of date with the target branch, create a merge commit. Otherwise, update the target branch to the latest commit on the source branch.

Fast-forward only (--ff-only): If the source branch is out of date with the target branch, reject the merge request. Otherwise, update the target branch to the latest commit on the source branch.

Rebase, merge  (rebase + merge --no-ff): Commits from the source branch onto the target branch, creating a new non-merge commit for each incoming commit. Creates a merge commit to update the target branch. The PR branch is not modified by this operation.

Rebase, fast-forward (rebase + merge --ff-only): Commits from the source branch onto the target branch, creating a new non-merge commit for each incoming commit. Fast-forwards the target branch with the resulting commits. The PR branch is not modified by this operation.

Squash (--squash): Combine all commits into one new non-merge commit on the target branch.

Squash, fast-forward only (--squash --ff-only): If the source branch is out of date with the target branch, reject the merge request. Otherwise, combine all commits into one new non-merge commit on the target branch.
