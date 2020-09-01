# Capacity and Scaling

SF is built on top of Azure VMs. The `node type` and associated properties determine VM availability, resiliency.

https://docs.microsoft.com/en-us/azure/service-fabric/service-fabric-cluster-capacity

**How to configure?**
- Set the `node types` in the cluster
- Define `properties` for each node type
    - Durability level
    - Reliability level

## Clustering

**Cluster node types**
- Determine *size, number, and properties* for a set of nodes (VMs)
- Every node type maps to a VM Scale Set
- Each cluster requires:
    - *1* primary node type to run the critical system services
    - *n* non-primary node types to perform app level functionality (0 or n nodes)
    
## Durability

- Gold - 5 VMs - can delay updates
- Silver - 5 VMs - can delay updates
- Bronze - 1 VM - cannot delay updates

## Reliability

- Platinum - System services run with target replica set count of nine
- Gold - System services run with target replica set count of seven
- Silver - System services run with target replica set count of five
- Bronze - System services run with target replica set count of three

## Misc
**Deallocating the VMSS destroys the cluster**

