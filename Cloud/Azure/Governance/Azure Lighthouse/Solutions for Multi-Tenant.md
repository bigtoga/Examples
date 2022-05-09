# Documentation
- [Azure Reference Architectures](https://docs.microsoft.com/en-us/azure/architecture/browse/)
   - [Multi-forest with Azure AD DS](https://docs.microsoft.com/en-us/azure/architecture/example-scenario/wvd/multi-forest-azure-managed)
   - [Multi-forest with Windows AD DS](https://docs.microsoft.com/en-us/azure/architecture/example-scenario/wvd/multi-forest)

# Reference Architecture Components for Software-Based Deployments

## Defense-in-Depth Layers

1. Physical
1. Identity
1. Perimeter
1. Network
1. Compute
1. Application
    - Encryption (at rest, in transit)
    - HA/DR, Backups
    - Optimize for UX (CDN, responsive, etc)
    - Code Deployments
3. Data
    - Encryption (at rest, in transit)
    - HA/DR, Backups
    - Code Deployments
    - Optimization (for speed, for regional performance, etc)
