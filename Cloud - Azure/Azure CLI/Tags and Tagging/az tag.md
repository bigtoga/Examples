Help me!

`az tag -h`

List all tags for the entire account (includes name, attached to info, etc)

`az tag list `

View tags for a specific resource

`az tag show -n myServerName -rg myResourceGroup —resource-type “...”`

Add or overwrite tags for a resource

`az resource tag —tags CostCenter=Developers DC=dc53gh -rg myRG...`