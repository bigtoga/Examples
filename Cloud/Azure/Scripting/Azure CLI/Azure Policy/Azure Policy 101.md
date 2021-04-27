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

```shell
az policy definition list -h
```
~~~
Command
    az policy definition list : List policy definitions.

Arguments
    --management-group : The name of the management group of the policy [set] definition.
    --subscription     : The subscription id of the policy [set] definition.

Global Arguments
    --debug            : Increase logging verbosity to show all debug logs.
    --help -h          : Show this help message and exit.
    --only-show-errors : Only show errors, suppressing warnings.
    --output -o        : Output format.  Allowed values: json, jsonc, none, table, tsv, yaml, yamlc.
                         Default: json.
    --query            : JMESPath query string. See http://jmespath.org/ for more information and
                         examples.
    --verbose          : Increase logging verbosity. Use --debug for full debug logs.
~~~

