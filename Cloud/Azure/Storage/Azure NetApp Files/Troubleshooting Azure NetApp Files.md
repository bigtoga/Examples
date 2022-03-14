# Activity Log

1. From the ANF instance, click on **Activity Log**
2. By default, Activity Log will filter on / at the resource group level. This is likely to give you too much noise. **Add a filter for Resource: <resource_name>**
3. You can then filter additionally for:
    - `Write account resource (Microsoft.NetApp/netAppAccounts/write)`

# Windows / SQL Server Lost Access to Files

Every four weeks, the backend ANF server (that you don't have access to), will reset its computer account password. If you have the ANF instance linked to Active Directory, this can become a problem if, after the ANF server resets its computer password, it cannot sync with Active Directory. 

**What ANF should be doing to reset computer account in AD:**
1. Verify it can contact AD domain controller
2. Verify it can sync to said domain controller (i.e. not a read only DC)
3. Re-set the computer account pwd
4. Sync with AD

**What ANF actually does:**
1. Resets the computer account pwd
2. Tries to sync with AD

If #2 fails above, ANF will no longer be able to connect to the domain and Windows/SQL Servers that "store or access files" on ANF may be impacted.
- Existing sessions/connections are unaffected - for example, if your SQL Server was connected to ANF before the computer account pwd change, it will still be connected after the change even though ANF is "out of sync". 
- New sessions/connections are blocked/affected - for example, if you reboot your SQL Server or restart SQL, the server is likely to no longer be able to connect to ANF

To fix, you have to do two things:
1. Fix whatever issue is preventing ANF from being able to access the domain controllers
2. Put in a Microsoft ticket and have them manually reset the ANF computer account password in the backend
