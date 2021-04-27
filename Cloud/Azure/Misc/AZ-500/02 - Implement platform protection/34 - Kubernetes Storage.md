Options depending on the needs:
- "My app does not need to share files/storage with other pods or nodes" - use local storage. Fast, deleted when the pod is deleted
- "Multiple pods need to share the same data volumes, or reattach data volumes if the pod is rescheduled on a different node" - use Azure Storage, Azure Files, mount points, etc
- "I need to inject sensitive data or application configuration information into pods" - do that via Docker or Azure DevOps

![x](https://i.imgur.com/kcIqWQu.png)

## Volumes

Applications often need to be able to store and retrieve data. As Kubernetes typically treats individual pods as ephemeral, disposable resources, different approaches are available for applications to use and persist data as necessary. **A *volume* represents a way to store, retrieve, and persist data across pods** and through the application lifecycle.

**Traditional volumes to store and retrieve data are created as Kubernetes resources backed by Azure Storage**. You can manually create these data volumes to be assigned to pods directly, or have Kubernetes automatically create them. These data volumes can use Azure Disks or Azure Files:
- Azure Disks can be used to create a **Kubernetes DataDisk resource**
- Disks can use Azure Premium storage, backed by high-performance SSDs, or Azure Standard storage, backed by regular HDDs. 
- For most production and development workloads, use Premium storage. 
- Azure Disks are mounted as ReadWriteOnce, so are only available to a single pod. 
- For storage volumes that can be accessed by multiple pods simultaneously, use Azure Files.

**Azure Files can be used to mount an SMB 3.0 share** backed by an Azure Storage account to pods. 
- Azure Files let you share data across multiple nodes and pods

## Persistent volumes
Volumes that are defined and created as part of the pod lifecycle only exist until the pod is deleted. Pods often expect their storage to remain if a pod is rescheduled on a different host during a maintenance event, especially in StatefulSets. A persistent volume (PV) is a storage resource created and managed by the Kubernetes API that can exist beyond the lifetime of an individual pod.

Azure Disks or Files are used to provide the PersistentVolume. As noted in the previous section on Volumes, the choice of Disks or Files is often determined by the need for concurrent access to the data or the performance tier.

A PersistentVolume can be statically created by a cluster administrator, or dynamically created by the Kubernetes API server. If a pod is scheduled and requests storage that is not currently available, Kubernetes can create the underlying Azure Disk or Files storage and attach it to the pod. Dynamic provisioning uses a StorageClass to identify what type of Azure storage needs to be created

Storage classes
To define different tiers of storage, such as Premium and Standard, you can create a StorageClass. The StorageClass also defines the reclaimPolicy. This reclaimPolicy controls the behavior of the underlying Azure storage resource when the pod is deleted and the persistent volume may no longer be required. The underlying storage resource can be deleted, or retained for use with a future pod.

In AKS, two initial StorageClasses are created:

default - Uses Azure Standard storage to create a Managed Disk. The reclaim policy indicates that the underlying Azure Disk is deleted when the persistent volume that used it is deleted.

managed-premium - Uses Azure Premium storage to create Managed Disk. The reclaim policy again indicates that the underlying Azure Disk is deleted when the persistent volume that used it is deleted.

If no StorageClass is specified for a persistent volume, the default StorageClass is used.
