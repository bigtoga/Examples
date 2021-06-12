`tsm configuration list-dynamic-keys` // Get the categories

# Security and TLS/SSL

You want to see `ssl.enabled: false` and that these are in the `ssl.protocols` list: all -SSLv2 -SSLv4 -TLSv1 -TLSv1.1:

`tsm security external-ssl list` 

