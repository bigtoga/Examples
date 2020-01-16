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

## Step 3: Set up your credentials
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
~~~

## Step 4: Set your origin url
~~~
git config remote.origin.url https://you:password@github.com/you/example.git


~~~
