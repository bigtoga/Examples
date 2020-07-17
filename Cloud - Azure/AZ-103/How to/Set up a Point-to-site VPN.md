https://docs.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-howto-point-to-site-resource-manager-portal

https://docs.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-howto-point-to-site-resource-manager-portal

1. AZURE - Create a public IP address
1. AZURE - Create a vnet
1. AZURE - Create a vnet gateway 
  - assign the public IP to it
  - assign the private IP address range of your on-prem devices you want to access Azure
  - Configure the tunnel type (OpenVPN, SSTP, IKEv2) - choose **IKEv2**
  - Configure IKEv2 to allow Azure certificate
  - Upload the public cert
1. YOU - Create a root certificate to authenticate clients ([how to generate and export certificates](https://docs.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-certificates-point-to-site#clientexport))
1. AZURE - Upload the public key for the certificate to Azure
1. YOU - Install the private cert on the machine(s) you want to connect
