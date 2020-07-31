# Step 1: Go to forest PDC and run `dcdiag | clip` then inspect for errors
Search the log for "warning", "error"
  
<details>
   <summary>Example failure from dcdiag due to name suffix issues</summary>
  The **key error** in the below is the section:

> warning event occurred.  EventID: 0x00001792...
> ... The new top level name, myForest.com, has been added to the forest corporateForest.com. **Name suffix routing for this new name is disabled because it is not within any currently routed namespace. Objects can not be resolved from this new namespace until name suffix routing is enabled for the namespace.** To enable name suffix routing, open Domains and Trusts and see help under Name Suffix Routing and Forest Trusts.

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
