
A best practice recommendation is to adopt a Zero Trust strategy based on user, device, and application identities. In contrast to network access controls that are based on elements such as source and destination IP address, protocols, and port numbers, Zero Trust enforces and validates access control at “access time”. This avoids the need to play a prediction game for an entire deployment, network, or subnet – only the destination resource needs to provide the necessary access controls.

Azure Network Security Groups can be used for basic layer 3 & 4 access controls between Azure Virtual Networks, their subnets, and the Internet.

Application Security Groups enable you to define fine-grained network security policies based on workloads, centralized on applications, instead of explicit IP addresses.

Azure Web Application Firewall and the Azure Firewall can be used for more advanced network access controls that require application layer support.

Local Admin Password Solution (LAPS) or a third-party Privileged Access Management can set strong local admin passwords and just in time access to them.

Additionally, third parties offer micro-segmentation approaches that may enhance your network controls by applying zero trust principles to networks you control with legacy assets on them.

![x](https://i.imgur.com/2TBibeW.png)
