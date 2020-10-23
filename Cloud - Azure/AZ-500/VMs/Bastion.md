https://docs.microsoft.com/en-us/azure/bastion/bastion-nsg

![x](https://docs.microsoft.com/en-us/azure/bastion/media/bastion-nsg/figure-1.png)

- HTML5 browser required

### `AzureBastionSubnet` config

Inbound rules are port 443

![x](https://docs.microsoft.com/en-us/azure/bastion/media/bastion-nsg/inbound.png)

Outbound rules for RDP

![x](https://docs.microsoft.com/en-us/azure/bastion/media/bastion-nsg/outbound.png)


### VM NSG / NIC

Has to allow ingress from `AzureBastionSubnet` on 3389
