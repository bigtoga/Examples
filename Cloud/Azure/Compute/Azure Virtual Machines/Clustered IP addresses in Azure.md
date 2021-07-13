By default, if you create a clustered IP address in a Windows Failover Cluster Instance (FCI), the Azure virtual network gateway will not recognize it. This address will show `destination unreachable` if you ping it from another VM that is not the owner node.

To fix, it is a quick process:
1. Change the clustered IP via Powershell to use a specific health probe port + subnet mask
2. Take the clustered IP offline
3. Create an Azure load balancer with a static IP that is set to the clustered IP
4. Configure the ILB
5. Bring the clustered IP online

Powershell:
```powershell
$params = @{"Address"="172.21.4.30";
          "ProbePort"="59999";
          "SubnetMask"="255.255.255.255";
          "Network"="Cluster Network 1";
          "EnableDhcp"=0}

Get-ClusterResource "IP Address 172.21.4.0" | Set-ClusterParameter -Multiple $params
```

Then create an internal load balancer with 172.21.4.30 as that IP. Done.
