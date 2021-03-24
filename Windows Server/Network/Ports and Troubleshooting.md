[Common ports for all Windows VMs](https://docs.microsoft.com/en-us/troubleshoot/windows-server/networking/service-overview-and-network-port-requirements)

### IPSec
- IPsec Encapsulating Security Protocol (ESP) (IP protocol 50)
- IPsec Network Address Translator Traversal NAT-T (UDP port 4500)
- IPsec Internet Security Association and Key Management Protocol (ISAKMP) (UDP port 500)

### SQL Server

[Configuring firewall for SQL](https://docs.microsoft.com/en-us/sql/sql-server/install/configure-the-windows-firewall-to-allow-sql-server-access?view=sql-server-ver15)

- 60000 fixed port tcp (example)
- Dedicated Admin requires a different port
