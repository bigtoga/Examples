## Path-based routing

Use this to break up applications from a monolith into smaller sub applications/macro or micro services

I have two URLs on the same TLD and I want them to be handled by two different backend pools
- URL: https://mydomain/images/* - I want to be handled by backend pool named `pool-Images`
- URL: https://mydomain/videos/* - I want to be handled by `pool-Videos`

## Path-based redirects

Use this to 301 redirect to a new URL
