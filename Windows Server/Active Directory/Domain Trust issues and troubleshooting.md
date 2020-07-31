# Scenario: myForest.com has a one-way transitive trust with corporateForest.com. myForest trusts corporateForest but corporateForest does not trust myForest
1. Corporate email/user accounts are managed / created in corporateForest.com. A user's corporate email is `user@corporateForest.com`
2. For app dev, a separate domain was created - `myForest.com`. This allows app security and isolation along with the ability for a technical operations team to manage app dev environments without needing permissions to manage `corporateForest.com`
3. After the ops team created the Windows Active Directory domain for `myForest.com`, they worked with the corporate IT admins to set up the one way trust that allows `user@corporateForest.com` to authenticate to `myForest.com` resources using delegation

Eventually, something goes awry on `myForest.com` and users from `corporateForest.com` start being unable to authenticate to `corporateForest.com` for accessing `myForest.com` resources. This document walks through the troubleshooting/idenfication of those errors

Resources:
- [nltest.exe documentation](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/cc731935(v=ws.11)#:~:text=Nltest%20is%20a%20command%2Dline,Server%20Administration%20Tools%20(RSAT).)
- [dcdiag.exe documentation](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/cc731968(v=ws.11)) - has common errors seen and what they might mean

# Step 1: Go to forest PDC and run `dcdiag | clip` then inspect for errors
Search the log for "warning", "error"
  
<details>
   <summary>Example failure from dcdiag due to name suffix issues</summary>
Log is full of benign errors related to AD sync delays - ignore those. The **key error** in the below is the section:

> warning event occurred.  EventID: 0x00001792...
> ... The new top level name, myForest.com, has been added to the forest corporateForest.com. **Name suffix routing for this new name is disabled because it is not within any currently routed namespace. Objects can not be resolved from this new namespace until name suffix routing is enabled for the namespace.** To enable name suffix routing, open Domains and Trusts and see help under Name Suffix Routing and Forest Trusts.

### Root cause: someone managing corporateForest.com created a UPN suffix for myForest.com that was applied to all corporateForest.com users
### The solution was to remove that UPN suffix 
   <pre>
Directory Server Diagnosis


Performing initial setup:

   Trying to find home server...

   Home Server = myForestPDC

   * Identified AD Forest. 
   Done gathering initial info.


Doing initial required tests

   
   Testing server: On-Prem\myForestPDC

      Starting test: Connectivity

         ......................... myForestPDC passed test Connectivity



Doing primary tests

   
   Testing server: On-Prem\myForestPDC

      Starting test: Advertising

         ......................... myForestPDC passed test Advertising

      Starting test: FrsEvent

         ......................... myForestPDC passed test FrsEvent

      Starting test: DFSREvent

         There are warning or error events within the last 24 hours after the

         SYSVOL has been shared.  Failing SYSVOL replication problems may cause

         Group Policy problems. 
         ......................... myForestPDC passed test DFSREvent

      Starting test: SysVolCheck

         ......................... myForestPDC passed test SysVolCheck

      Starting test: KccEvent

         ......................... myForestPDC passed test KccEvent

      Starting test: KnowsOfRoleHolders

         ......................... myForestPDC passed test KnowsOfRoleHolders

      Starting test: MachineAccount

         ......................... myForestPDC passed test MachineAccount

      Starting test: NCSecDesc

         ......................... myForestPDC passed test NCSecDesc

      Starting test: NetLogons

         ......................... myForestPDC passed test NetLogons

      Starting test: ObjectsReplicated

         ......................... myForestPDC passed test ObjectsReplicated

      Starting test: Replications

         ......................... myForestPDC passed test Replications

      Starting test: RidManager

         ......................... myForestPDC passed test RidManager

      Starting test: Services

         ......................... myForestPDC passed test Services

      Starting test: SystemLog

         A warning event occurred.  EventID: 0x00001792

            Time Generated: 07/30/2020   21:50:24

            Event String:

            The new top level name, myForest.com, has been added to the forest corporateForest.com. Name suffix routing for this new name is disabled because it is not within any currently routed namespace. Objects can not be resolved from this new namespace until name suffix routing is enabled for the namespace. To enable name suffix routing, open Domains and Trusts and see help under Name Suffix Routing and Forest Trusts.

         ......................... myForestPDC passed test SystemLog

      Starting test: VerifyReferences

         ......................... myForestPDC passed test VerifyReferences

   
   
   Running partition tests on : ForestDnsZones

      Starting test: CheckSDRefDom

         ......................... ForestDnsZones passed test CheckSDRefDom

      Starting test: CrossRefValidation

         ......................... ForestDnsZones passed test

         CrossRefValidation

   
   Running partition tests on : DomainDnsZones

      Starting test: CheckSDRefDom

         ......................... DomainDnsZones passed test CheckSDRefDom

      Starting test: CrossRefValidation

         ......................... DomainDnsZones passed test

         CrossRefValidation

   
   Running partition tests on : Schema

      Starting test: CheckSDRefDom

         ......................... Schema passed test CheckSDRefDom

      Starting test: CrossRefValidation

         ......................... Schema passed test CrossRefValidation

   
   Running partition tests on : Configuration

      Starting test: CheckSDRefDom

         ......................... Configuration passed test CheckSDRefDom

      Starting test: CrossRefValidation

         ......................... Configuration passed test CrossRefValidation

   
   Running partition tests on : myForest

      Starting test: CheckSDRefDom

         ......................... myForest passed test CheckSDRefDom

      Starting test: CrossRefValidation

         ......................... myForest passed test CrossRefValidation

   
   Running enterprise tests on : myForest.com

      Starting test: LocatorCheck

         ......................... myForest.com passed test LocatorCheck

      Starting test: Intersite

         ......................... myForest.com passed test Intersite
  </pre>
</details>

# Step 2: Validate the trust is working
1. From the "trusting domain" (myForest.com), go to Active Directory Sites & Services -> Properties of the domain -> Validate
2. Enter your credentials on the "trusted domain" (corporateForest.com) 

# Step 3: Validate that myForest.com can enumerate domain controllers on corporateForest.com
From a myForest DC, run `nltest /dclist:corporateForest.com`
1. You should be able to do this
2. If errors occur, you may need to check DNS forwarders are correct

# Step 4: Verify DNS servers are working on corporateForest.com
1. Pick up the phone and call that team - are you having DNS issues now? I'm seeing that "XYZ" AD server is down - at least from my side. Are you sure it is up?
2. Ask them if any changes have recently occurred related to myForest.com - have they changed anything? Added anything? 
3. Confirm the DNS servers they want you to use
4. On your myForest PDC, verify that the DNS forwarders for the domain are (a) accurate, and (b) can resolve

# Step 5: Run tests from myForest DC 
`nltest /server:ADServer1.corporateForest.com` 
   - Should return (a) success, and (b) tells you which AD server it can authenticate with
   
Try the other(s) server as well: `nltest /server:ADServer2.corporateForest.com`    

Errors seen:
1. you don't have access to dsbind...
   
`nltest /sc_query:corporateForest.com`
  - Should return success - tells you that the secure comm. channel between the two domains is up
  - If it fails, consider `nltest /sc_verify:corporateForest.com` - if the secure channel is broken, it will attempt to rebuild it

Verify that kerberos can be used: `nslookup -type=SRV _kerberos._tcp.dc._msdcs.corporateForest.com`
