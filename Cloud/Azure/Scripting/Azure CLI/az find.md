Easy search

`az find -h`

```

Command
    az find : I'm an AI robot, my advice is based on our Azure documentation as well as the usage
    patterns of Azure CLI and Azure ARM users. Using me improves Azure products and documentation.

Arguments

Positional
    <CLI_TERM>         : An Azure CLI command or group for which you need an example.

Global Arguments
    --debug            : Increase logging verbosity to show all debug logs.
    --help -h          : Show this help message and exit.
    --only-show-errors : Only show errors, suppressing warnings.
    --output -o        : Output format.  Allowed values: json, jsonc, none, table, tsv, yaml, yamlc.
                         Default: json.
    --query            : JMESPath query string. See http://jmespath.org/ for more information and
                         examples.
    --verbose          : Increase logging verbosity. Use --debug for full debug logs.

Examples
    Give me any Azure CLI group and IÆll show the most popular commands within the group.
        az find "az storage"

    Give me any Azure CLI command and IÆll show the most popular parameters and subcommands.
        az find "az monitor activity-log list"

    You can also enter a search term, and I'll try to help find the best commands.
        az find "arm template"

For more specific examples, use: az find "az find"
`
