```json
{
    "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
        "name":             {"type": "string"},
        "relativeName":     {"type": "string"},
        "trafficRoutingMethod": {
            "type": "string",
            "defaultValue": "Performance",
            "allowedValues": [
                "Performance",
                "Weighted",
                "Priority",
                "Geographic",
                "MultiValue",
                "Subnet"
            ]
        },
        "maxReturn": {
            "type": "int"
        }
    },
    "resources": [
        {
            "apiVersion": "2022-04-01",
            "type": "Microsoft.Network/trafficmanagerprofiles",
            "name": "[parameters('name')]",
            "location": "global",
            "properties": {
                "trafficRoutingMethod": "[parameters('trafficRoutingMethod')]",
                "maxReturn": "[parameters('maxReturn')]",
                "dnsConfig": {
                    "relativeName": "[parameters('relativeName')]",
                    "ttl": "60"
                },
                "monitorConfig": {
                    "protocol": "http",
                    "port": "80",
                    "path": "/"
                }
            }
        }
    ]
}
```
