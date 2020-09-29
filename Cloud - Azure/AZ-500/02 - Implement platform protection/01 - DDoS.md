Basic and Standard service tiers

Mitigates:
- Volumetric attacks
- protocol attacks
- App layer attacks
- Malformed packets
- Spoofing

# Best Practices

Best practice 1
Ensure that security is a priority throughout the entire lifecycle of an application, from design and implementation to deployment and operations. Applications might have bugs that allow a relatively low volume of requests to use a lot of resources, resulting in a service outage.

Best practice 2
Design your applications to scale horizontally to meet the demands of an amplified load—specifically, in the event of a DDoS. If your application depends on a single instance of a service, it creates a single point of failure. Provisioning multiple instances makes your system more resilient and more scalable.

# The 5 Pillars of Network Security

| Pillar  	|  Description 	|
|---	|---	|
| Scalability   	|   The ability of a system to handle increased load	|
| Availability  	| The proportion of time that a system is functional and working  	|
| Resiliency  	| The ability of a system to recover from failures and continue to function  	|
| Management  	|  Operations processes that keep a system running in production 	|
| Security  	|  Protecting applications and data from threats 	|


# Protecting applications and data from threats

You should know typical traffic volumes, the connectivity model between the application and other applications, and the service endpoints that are exposed to the public internet.

‎Helping ensure that an application is resilient enough to handle a DoS targeted at the application itself is most important. Security and privacy features are built in to the Azure platform, beginning with the Microsoft Security Development Lifecycle (SDL). The SDL addresses security at every development phase and ensures that Azure is continually updated to make it even more secure. We will look at SDL later in this course.


Solution 2
For Azure App Service, select an App Service plan that offers multiple instances.
For Azure Cloud Services, configure each of your roles to use multiple instances.
‎For Azure Virtual Machines, ensure that your VM architecture includes more than one VM and that each VM is included in an availability set. We recommend using virtual machine scale sets for autoscaling capabilities.

Best practice 3
Layer security defenses in an application to reduce the chance of a successful attack. Implement security-enhanced designs for your applications by using the built-in capabilities of the Azure platform.

Solution 3
Be aware that the risk of attack increases with the size, or surface area, of the application. You can reduce the surface area by using IP allow lists to close down the exposed IP address space and listening ports that aren’t needed on the load balancers (for Azure Load Balancer and Azure Application Gateway).

‎You can also use NSGs to reduce the attack surface. You can use service tags and application security groups as a natural extension of an application’s structure to minimize complexity for creating security rules and configuring network security.
