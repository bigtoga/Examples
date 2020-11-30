https://docs.microsoft.com/en-us/azure/virtual-machines/troubleshooting/

# Failed to boot with error code 0xC000000F

2020-11 had this happen 

### Start Here: The Fastest Way

**Step 1: Delete the VM** but keep the disks, NIC

**Step 2: Attach the OS disk to another VM**

**Step 3: In Windows Explorer, right click on the drive and go to Properties -> Tools -> Fix/Checkdb**
- In my case, there were errors and this resolved in ~5 minutes

**Step 4: Detach the disk from the test VM**

**Step 5: Go to Disks -> find the disk -> Create VM**

**Step 6: See if it works! It might...**

If it works, stop the VM, attach the original NIC, detach the new NIC, and restart. Delete the new NIC

If it does not work, continue...

### The Long Way

https://docs.microsoft.com/en-us/troubleshoot/azure/virtual-machines/boot-error-0xc000000f

**Step 1: Attach the disk back to the test VM**

**Step 2: Identify the drive letter that this is plugged into**
- In my example, it is "G:\"

**Step 3: Copy out the actual boot config**

`bcdedit /store G:\boot\bcd /enum | clip`

**Step 4: Update the config**

```shell

bcdedit /store G:\boot\bcd /set {bootmgr} device partition=C:

bcdedit /store G:\boot\bcd /set {bootmgr} integrityservices enable

bcdedit /store G:\boot\bcd /set {default} device partition=C:

bcdedit /store G:\boot\bcd /set {default} integrityservices enable

bcdedit /store G:\boot\bcd /set {default} recoveryenabled Off

bcdedit /store G:\boot\bcd /set {default} osdevice partition=C:

bcdedit /store G:\boot\bcd /set {default} bootstatuspolicy IgnoreAllFailures

```

**Step 5: Detach the disk from the test VM**

**Step 6: Go to Disks -> find the disk -> Create VM**

**Step 7: See if it works! It might...**

