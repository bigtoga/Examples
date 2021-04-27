3 steps to use a custom domain endpoint for Azure CDN - https://docs.microsoft.com/en-us/azure/cdn/cdn-map-content-to-custom-domain

1. Create a CNAME DNS record
1. Associate the custom domain with the CDN endpoint
1. Verify the custom domain

# Origin types
4 options:
1. Storage for Azure Storage
1. Cloud service for Azure Cloud Services
1. Web App for Azure Web Apps
1. Custom origin for any other publicly accessible origin web server (hosted in Azure or elsewhere)

If you are hosting anything on a virtual machine(s), choose Custom Origin
