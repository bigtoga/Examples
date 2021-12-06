## Terms / Acronyms

**PEM**

**SAN** - Subject Alternative Name - what this cert is valid for
- Note: For a "wildcard cert that you also want to include the root TLD", you must have **TWO** entries here:
    1. The root TLD (`mydomain.com`)
    2. The wildcard (`*.mydomain.com`)  
    3. If you only have `*.mydomain.com`, then it will not be valid for `mydomain.com`

## File Extensions

**.p7b** - Base-64 encoded 

## How To

- Generate Base-64 encoded public key file
    - Import private key
    - Export as Base-64 encoded .p7b
