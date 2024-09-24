# Core-Base Licensing

[Documentation](https://help.tableau.com/current/guides/everybody-install/en-us/everybody_admin_planning.htm)

- 2VCPUs = 1 physical vCPU so if you own 24 CPU license, you can have up to 48 vCPU assigned
- "*Core count is based on "physical" cores. Physical cores can represent actual server hardware or cores on a virtual machine (VM). Hyper-threading is ignored for the purposes of counting cores.*"
- Only 
- Core-based license also allows a Guest User account, which is not possible with role-based licensing
- No Creator licenses included but can be added on


`tsm licenses list` of `https://localhost:8850/` and then go to Configuration, licensing

### By default, Tableau will auto-renew expiring licenses 

You will see "License expires" and, when you look, it will say "October 7, 2024" (on September 24). On/about September 30, Tableau Server will check-in to the Tableau licensing service and auto-download the new license. 

In theory...
