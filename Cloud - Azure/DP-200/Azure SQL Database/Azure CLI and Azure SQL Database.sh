az sql db list

# Output to jquery
az sql db list | jq '[.[] | {name: .name}]'

# List one database
az sql db show --name Logistics

az sql db show --name Logistics | jq '{name: .name, maxSizeBytes: .maxSizeBytes, status: .status}'

# Show the connection string
az sql db show-connection-string --client sqlcmd --name Logistics

"sqlcmd -S tcp:contoso-1.database.windows.net,1433 -d Logistics -U <username> -P <password> -N -l 30"

sqlcmd -S tcp:contoso-1.database.windows.net,1433 -d Logistics -U martina -P "password1234$" -N -l 30



