[Source article](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)

Note: Check out the "Setup local repo" too

# Steps that need to be done only ONE TIME:
## Step 1: Install Git
<a href="https://git-scm.com/downloads" target="_new">https://git-scm.com/downloads</a>

## Step 2: Set the --global config for your login info
~~~
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com # your commit email

git config --list

# Can just get one key/value:
git config user.name

git config --list --show-origin
~~~

## Step 3: Create a personal access token
[Create a personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)
1. Github Settings
2. Developer Settings
3. Generate personal access token
4. Add to password vault

## Step 4: Set up your credentials
Clear out the previous:
~~~
git config --global credential.helper cache
~~~

Add your Github credentials with a 15 minute timed password
~~~
git config --global credential.helper "cache --timeout=3600"
~~~

~~~
git config --global credential.helper manager
~~~

Start menu → Credential Manager → Windows Credentials → find the line (Git: https://whatever/your-repository/url) → edit, user name is PersonalAccessToken and password is your access token.

~~~
# Obsolete:
git config --global credential.helper wincred

## Step 5: Configure line endings
`git config --global core.autocrlf true` - configures Git to ensure line endings in files you checkout are correct for Windows. For compatibility, line endings are converted to Unix style when you commit files.
