[Troubleshooting trusted ticket](https://help.tableau.com/v2020.3/server/en-us/trusted_auth_trouble.htm)

**Logging** for Trusted authentication is written either to:
1. `ProgramData\Tableau\Tableau Server\data\tabsvc\logs\vizqlserver\vizql-*.log`
2. Or on Windows Server `<install directory>\Tableau Server\data\tabsvc\logs\vizqlserver\vizql-*.log`
- Log file names are usually named `vizqlserver_node*-*.log.*`

[How to troubleshoot a test web page return value of -1](https://help.tableau.com/v2020.3/server/en-us/trusted_auth_trouble_1return.htm)

How to Change logging to "verbose":

```bash
tsm configuration set -k vizqlserver.trustedticket.log_level -v debug
tsm pending-changes apply
```

[How to test trusted ticket](https://help.tableau.com/v2020.3/server/en-us/trusted_auth_testing.htm)
- Create a test file
- Create a test user
- Upload to web server
- Test
