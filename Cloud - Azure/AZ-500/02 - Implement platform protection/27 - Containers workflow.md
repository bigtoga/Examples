graph TD
  A[Dev/Admin Laptop] -->|Install Docker| B(Build container)
  B --> C{Create image}
  C -->|Powershell, Azure CLI| D[Login to Registry]
  D -->|E[Publish to Registry]
  E -->|F[Deploy:fa-car Car]
