1. On the dev/admin laptop, install Docker
2. Build your container, test locally
3. Create your image
4. Login to the registry
5. Publish image in the registry
6. Deploy
7. Monitor

<pre>

graph TD
  A[Dev/Admin Laptop] -->|Install Docker| B(Build container)
  B --> C(Create image)
  C -->|Powershell, Azure CLI| D[Login to Registry]
  D -->|E[Publish to Registry]
  E -->|F[Deploy:fa-car Car]
</pre>


  A[Dev/Admin Laptop] -->|Install Docker| B(Build container)
  B --> C(Create image)
  C -->|Powershell, Azure CLI| D[Login to Registry]
  D -->|E[Publish to Registry]
  E -->|F[Deploy:fa-car Car]
