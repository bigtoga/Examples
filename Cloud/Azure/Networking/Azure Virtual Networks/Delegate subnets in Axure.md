Use this if you want Azure Services to be able to deploy new reources into your subnet automatically. Required for many services such as:
- Azure NetApp Files

[Documentation - what is?](https://docs.microsoft.com/en-us/azure/virtual-network/subnet-delegation-overview)

Rough guidelines:

- Generally not used unless required by a service
- Don't delegate subnets with other resources in them, instead build new subnets. 

Most delegated subnets can't be used with other resources anyway. 
Some delegations apply to all types of a resource:
- Redis can have multiple redis clusters on a delegated subnet 
- WebApps hould have a subnet per ASP allocation

Also remember that you can apply security groups at the subnet level; so using a vNet-integrated 
service on its own subnet means you can tailor your NSGs for that resource alone.
