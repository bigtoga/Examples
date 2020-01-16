[Source article](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)

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

## Step 3: Authenticate via HTTPS
* Find what the Windows creds are:
For those who are using access token and a Windows environment, there is a simple way to do it:

Start menu → Credential Manager → Windows Credentials → find the line (Git: https://whatever/your-repository/url) → edit, user name is PersonalAccessToken and password is your access token.

~~~
git config --global credential.helper wincred

~~~
