Full docs: https://docs.microsoft.com/en-us/cli/azure/policy?view=azure-cli-latest

```shell
az login

az policy -h
```
~~~
Group
    az policy : Manage resource policies.

Subgroups:
    assignment     : Manage resource policy assignments.
    definition     : Manage resource policy definitions.
    event          : Manage policy events.
    metadata       : Get policy metadata resources.
    remediation    : Manage resource policy remediations.
    set-definition : Manage resource policy set definitions.
    state          : Manage policy compliance states.

For more specific examples, use: az find "az policy"
~~~

```shell
az policy definition -h
```
~~~
Group
    az policy definition : Manage resource policy definitions.

Commands:
    create : Create a policy definition.
    delete : Delete a policy definition.
    list   : List policy definitions.
    show   : Show a policy definition.
    update : Update a policy definition.
~~~
