## Examples

Threat landscape for files:
- Compromise of systems with access to the data
- Compromise of the networks attached to the storage systems
- Compromise of the storage devices
- Loss of control of storage media

## Resources:
- [SNIA Technical Proposal Storage Security Best Current Practices (BCPs)](https://www.snia.org/forums/ssif/programs/best_practices)
- [Azure storage encryption for data at rest](https://docs.microsoft.com/en-us/azure/storage/common/storage-service-encryption)
- [Dell EMC Unity encryption](https://www.delltechnologies.com/en-us/documentation/unity-family/unity-p-security-config-guide/05-vxe-c-sec-config-chap-data-sec-settings.htm)
# Scenarios

Layers upon layers... What are you encrypting?
- Physical media / drive? 
- LUN level
- Volume encryption
- Folder encryption
- File encryption

## Physical Hard drives

#### Drive is powered on 
    - Dri
  - is data encrypted so that users/apps/services without a key are unable to view?
- Powered off 
- Powered on, deployed to a server, has mount point, users/admins can access files and folders
- Powered off, not deployed on a server
- Powered on, plugged into random server

Folder

Share

Files on the 

Storage Account

Blob Container

File Share 
