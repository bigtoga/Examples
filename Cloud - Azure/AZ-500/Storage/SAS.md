# Two forms of SAS

https://docs.microsoft.com/en-us/azure/hdinsight/hdinsight-storage-sharedaccesssignature-permissions#create-a-stored-policy-and-sas

1. **Ad-hoc** - The start time, expiry time, and permissions for the SAS are all specified on the SAS URI
2. **Stored access policy**: A stored access policy is defined on a resource container, such as a blob container. A policy can be used to manage constraints for one or more shared access signatures. **When you associate a SAS with a stored access policy, the SAS inherits the constraints** - the start time, expiry time, and permissions - defined for the stored access policy.

## Revoke
A SAS is a URL, so anyone who obtains the SAS can use it. It doesn't matter who requested it to begin with. If a SAS is published publicly, it can be used by anyone in the world. A SAS that is distributed is valid until one of four things happens:
1. The expiry time specified on the SAS is reached
2. The expiry time specified on the stored access policy referenced by the SAS is reached. The following scenarios cause the expiry time to be reached:
    - The time interval has elapsed
    - The stored access policy is modified to have an expiry time in the past. **Changing the expiry time is one way to revoke the SAS**
3. The stored access policy referenced by the SAS is deleted, which is another way to revoke the SAS.
    - If you recreate the stored access policy with the same name, all SAS tokens for the previous policy are valid (if the expiry time on the SAS hasn't passed). 
    - If you intend to revoke the SAS, be sure to use a different name if you recreate the access policy with an expiry time in the future.
4. The account key that was used to create the SAS is regenerated. Regenerating the key causes all applications that use the previous key to fail authentication. Update all components to the new key.




**You find out your SAS keys are available on public internet - how to fix?**
- If you have an access policy defined, expire or revoke it
- If you have no access policy defined, you have to change the account key to invalidate
- https://docs.microsoft.com/en-us/rest/api/storageservices/define-stored-access-policy
  - "You can use a stored access policy to change the start time, expiry time, or permissions for a signature, or to revoke it"
