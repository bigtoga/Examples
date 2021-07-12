`tsm configuration list-dynamic-keys` // Get the list of "things you can change without restarting Tableau Server"

[List of configuration keys that require a restart/pending/apply](https://help.tableau.com/current/server/en-us/cli_configuration-set_tsm.htm#viewing-the-current-value-of-a-configuration-key)

# Security and TLS/SSL

You want to see `ssl.enabled: false` and that these are in the `ssl.protocols` list: all -SSLv2 -SSLv4 -TLSv1 -TLSv1.1:

`tsm security external-ssl list` 

