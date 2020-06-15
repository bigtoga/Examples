Workflow:

1. Create or identify the resources you want protected by policy
1. Create or identify the policy
1. Create or identify the initiative definition
1. Assign it to the scope from Step 1
1. Browse to the page in the portal - it will say "Not Started"

[Azure Policy "Initiatives" are groups of policies](https://docs.microsoft.com/en-us/azure/governance/policy/concepts/initiative-definition-structure)

```shell
az policy definition create --name 'denyCoolTiering' --description 'Deny cool access tiering for storage' --rules '{
    "if": {
        "allOf": [{
                "field": "type",
                "equals": "Microsoft.Storage/storageAccounts"
            },
            {
                "field": "kind",
                "equals": "BlobStorage"
            },
            {
                "field": "Microsoft.Storage/storageAccounts/accessTier",
                "equals": "cool"
            }
        ]
    },
    "then": {
        "effect": "deny"
    }
}'
`

Now save the assignment to a JSON file:
```json
{
    "if": {
        "allOf": [{
                "field": "type",
                "equals": "Microsoft.Storage/storageAccounts"
            },
            {
                "field": "Microsoft.Storage/storageAccounts/networkAcls.defaultAction",
                "equals": "Allow"
            }
        ]
    },
    "then": {
        "effect": "audit"
    }
}
```


```shell
az policy definition create --name 'audit-storage-accounts-open-to-public-networks' --display-name 'Audit Storage Accounts Open to Public Networks' --description 'This policy ensures that storage accounts with exposures to public networks are audited.' --rules '<path to json file>' --mode All
