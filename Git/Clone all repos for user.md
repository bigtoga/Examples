Discussion: https://gist.github.com/caniszczyk/3856584 

### Python (Windows, using IDLE)
curl -s https://github.com/dotnet-architecture | python -c $'import json, sys, os\nfor repo in json.load(sys.stdin): os.system("git clone " + repo["clone_url"])'

### Shell version
for i in `curl   -s https://api.github.com/orgs/$ORGANIZATION/repos?per_page=200 |grep html_url|awk 'NR%2 == 0'|cut -d ':'  -f 2-3|tr -d '",'`; do  git clone $i.git;  done

wget -qO- https://api.github.com/orgs/ORG/repos | jq ".[].ssh_url" | xargs -L 1 git clone
