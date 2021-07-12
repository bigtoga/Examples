[Troubleshooting trusted ticket](https://help.tableau.com/v2020.3/server/en-us/trusted_auth_trouble.htm)

- **Logging** for Trusted authentication is written to `ProgramData\Tableau\Tableau Server\data\tabsvc\logs\vizqlserver\vizql-*.log`
- Change logging to "verbose":

```bash
tsm configuration set -k vizqlserver.trustedticket.log_level -v debug
tsm pending-changes apply
```

[How to test trusted ticket](https://help.tableau.com/v2020.3/server/en-us/trusted_auth_testing.htm)
- Create a test file
- Create a test user
- Upload to web server
- Test
