Easiest to [use the Azure pricing calculator](https://azure.microsoft.com/en-us/pricing/calculator/) to see all of the options.

# Azure SQL Database only

First, decide your type of deployment and Purchase Model:
| Dropdown  	| Options  	| Notes  	|
|---	|---	|---	|
| Type  	| `Single Database` or `Elastic Pool`   	|   	|
| Backup Storage Tier  	| Only one option today: `RA-GRS`  	|   	|
| Purchase Model	| `vCore` or `DTU`  	|   	|

For **vCore** deployments:

| Dropdown  	| Options  	| Notes  	|
|---	|---	|---	|
| Service Tier  	|  `General Purpose`, `Business Critical`, or `Hyperscale`  	|   	|
| Compute Tier  	|  `Provisioned` or `Serverless`   	|   	|
| Hardware Type  	| `Gen5`, `Gen4`, or `Fsv2-series`  	|   	|
| Instance  	| # of cores the node must have 	|   	|

For **DTU** deployments:

| Dropdown  	| Options  	| Notes  	|
|---	|---	|---	|
| Service Tier  	| `Basic`, `Standard`, or `Premium`   	|   	|
