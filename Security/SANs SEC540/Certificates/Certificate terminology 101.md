
## File Extensions

**.CRT**

**.DER**


**PEM** - used when multiple certificates are imported as one file
- [Good resource for PEM](https://www.digicert.com/kb/ssl-support/pem-ssl-creation.htm)

Example PEM showing multiple certs:
```
-----BEGIN CERTIFICATE-----
(Your Primary SSL certificate: your_domain_name.crt)
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
(Your Intermediate certificate: DigiCertCA.crt)
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
(Your Root certificate: TrustedRoot.crt)
-----END CERTIFICATE-----
```

**SAN** - Subject Alternative Name - what this cert is valid for
- Note: For a "wildcard cert that you also want to include the root TLD", you must have **TWO** entries here:
    1. The root TLD (`mydomain.com`)
    2. The wildcard (`*.mydomain.com`)  
    3. If you only have `*.mydomain.com`, then it will not be valid for `mydomain.com`


**.CRT** - 

**.JKS** - 

**.p7b** - Base-64 encoded. Example:
**.PFX**

```
-----BEGIN CERTIFICATE-----
...
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
.....
-----END CERTIFICATE-----
```

## How To

- Generate Base-64 encoded public key file
    - Import private key
    - Export as Base-64 encoded .p7b

- View all certificates in a bundle?
    - Import private key
    - Export as Base-64 encoded .p7b
    - Open the .p7b

## Tools

[OpenSSL](https://www.openssl.org/)
