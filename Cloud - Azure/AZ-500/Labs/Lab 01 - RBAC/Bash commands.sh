# Execute in Azure Cloud Shell

DOMAINNAME=$(az ad signed-in-user show --query 'userPrincipalName' | cut -d '@' -f 2 | sed 's/\"//')

az ad user create --display-name "Dylan Williams" --password "Pa55w.rd1234" --user-principal-name Dylan@$DOMAINNAME

az ad user list --output table

#########################################################
az ad group create --display-name "Service Desk" --mail-nickname "ServiceDesk"

USER=$(az ad user list --filter "displayname eq 'Dylan Williams'")

# jq = json query
# '.[].objectId' = "Find the objectId member off root
OBJECTID=$(echo $USER | jq '.[].objectId' | tr -d '"')

az ad group member add --group "Service Desk" --member-id $OBJECTID

az ad group member list --group "Service Desk"
