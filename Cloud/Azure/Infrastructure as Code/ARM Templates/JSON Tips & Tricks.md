[How to iterate / loop in JSON ARM templates](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/copy-resources)
- Uses a `copy` array

```json
“copy”: {
  “name”: “<name-of-loop>”,
  “count”: <number-of-iterations>,
  “mode”: “serial” <or> “parallel”,
  “batchSize”: <number-to-deploy-serially>
}
``` 
