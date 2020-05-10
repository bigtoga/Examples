Git Flow example for a 10-person team to follow:

1. Begin working on sprint user story "US123"
1. Clone the repository locally
1. Create and checkout a new feature branch named "feature/US123"
1. Commit and push this to the remote repository 
1. In your team's workflow tool (Atlassian, Jira, Azure DevOps, etc), 
associate US123 work item with the new feature branch. 
This provides two things: all developers working on
US123 now can identify which feature branch they should use,
and now your team will be able to identify all changed files
that will be published when US123 is deployed.  
2. Back on your machine, 
`git switch master; git fetch; git rebase` 
to ensure you have the latest changes
1. Switch back to feature/US123
4. Make your changes, stage them, make commits as needed
1. Before you push, verify everything once again with 
`git switch master; git fetch; git rebase`
1. Switch back to feature/US123 and run `git status`. Validate
your changes. 
6. Push the commits
7. Create a Pull Request
8. Discuss, review and merge pull request into `master`
