# ACR Permissions and Roles

- AcrPush
- AcrPull
- AcrImageSigner
- Contributor
- Owner has all permissions **except** they cannot sign images

**Who can upload images to ACR?**
- AcrPush
- Contributor

**Who can download images to ACR?**
- All except AcrImageSigner

**Who can delete images in ACR?**
- AcrDelete
- Contributor

**Who can sign images?**
- AcrImageSigner
- Usually a service principal and only done via automation

https://docs.microsoft.com/en-us/azure/container-registry/container-registry-roles

![x](https://i.imgur.com/95ZsmYz.png)
