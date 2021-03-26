https://serverfault.com/questions/419658/how-to-speed-up-ad-integrated-dns-zone-replication-server-2008-r2

http://support.microsoft.com/kb/816101#22
1. In Administrative Tools, start Active Directory Sites and Services.
2. Expand Sites. There should be at least one site labeled "default-first-site-name" (or others if they have been manually configured).
3. Expand default-first-site-name, expand Servers, and then expand Computer.
4. Expand NTDS Settings. One or more objects are listed in the right pane. One of those objects is a link to the domain controller you want. 
      - To see the "friendly" name, right-click an entry and view the name. One of the objects points to the domain controller you want. 
      - **Right-click** that entry, and then click **Replicate Now**. The replication is performed immediately.
