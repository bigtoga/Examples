### Step 1: Launch an elevated git bash shell

### Step 2: Install jq for json parsing
~~~
# https://stedolan.github.io/jq/download/
chocolatey install jq
~~~

### Step 3: Close the elevated shell

### Step 4: Open a non-elevated shell and cd to the folder you want to download the repos into
cd c:\MyRepos\ACMEOrganization

### Step 5: Assign your variables
~~~
# Download all repos from the Binance Team (b/c they only have a handle of small repos) [an organization]
CTXT="orgs" # or "users"
THEIRUSERNAME="binance-exchange" # https://github.com/binance-exchange
MYUSERNAME="bigtoga"
$TOKEN="my github API token"
PAGE=1
URL="https://api.github.com/$CTXT/$THEIRUSERNAME/repos?page=$PAGE&per_page=100"
URL_REPO="https://github.com/$THEIRUSERNAME/"
echo $URL

# Test it:
curl -u $MYUSERNAME:$TOKEN -s $URL | jq -r '.[].clone_url'
~~~

### Step 6: Loop!
~~~
curl -u $MYUSERNAME:$TOKEN -s $URL | jq -r '.[].clone_url' | xargs -L1 git clone
~~~

### Step 7: Delete the .git folders if you want:
~~~
find -name ".git" -type d -exec rm -rf {} +
~~~
