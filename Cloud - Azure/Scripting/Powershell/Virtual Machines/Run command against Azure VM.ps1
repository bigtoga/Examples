# Sample.ps1 script file located where your PS C:\Users\Scott is located
Rename-NetAdapter -Name "Ethernet" -NewName $newName


# From Powershell
Invoke-AzVMRunCommand -ResourceGroupName $name_rg -VMName $vm_name -CommandId 'RunPowerShellScript' -ScriptPath '.\Desktop\Sample.ps1' -Parameter @{newName = "nic-dc"}
