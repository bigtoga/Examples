Thought [this post had great details](https://journeyofthegeek.com/2020/03/06/azure-private-link-and-dns-part-2/) and wanted to remember it to share in the future

- A record – Translates a hostname to an IP address such as http://www.journeyofthegeek.com to 5.5.5.5
- CNAME record – Alias record where you can point on (FQDNs) fully qualified domain name to another to make it a domain a human can remember and for high availability configurations
- Recursive Name Resolution – A DNS query where the client asks for a definitive answer to a query and relies on the upstream DNS server to resolve it to completion.  Forwarders such as Google DNS function as recursive resolvers.
- Iterative Name Resolution – A DNS query where a client receives back a referral to another server in place of resolving the query to completion.  Querying root hints often involves iterate name resolution.
- DNS Forwarder – Forward all queries the DNS service can’t resolve to an upstream DNS service.  These upstream servers are typically configure to perform recursive name resolution, but depending on your DNS service (such as Infoblox), you can configure it to request iterative name resolution.
- Conditional Forwarder – Forward queries for a specific DNS namespace to an upstream DNS service for resolution.
- Split-brain / Split Horizon DNS – A DNS configuration where a DNS namespace exists authoritatively across one or more DNS implementations.  A common use case is to have a single DNS namespace defined on Internet-resolvable public facing DNS servers and also on Intranet private facing DNS servers.  This allows trusted clients to reach the service via a private IP address and untrusted clients to reach the service via a public IP address.
