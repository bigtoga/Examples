Jeff: I think of Password hash sync and Pass-through Auth. as alternatives, use one or the other.

|   	|  Password hash sync 	|   Pass-through Auth.	|   Federated	|   	|
|---	| ---	| ---	|---	|---	|
| Sync pw w AAD? 	|   x	|   	|   	|   	|
| Can sign into AAD w pw? 	| x  	|   	|   	|   	|
| Productivity up?  	| x  	|   	|   	|   	|
| MFA supported?  	|   	|  x 	|   	|   	|
| Self-service password reset supported?  	|   	|  x 	|   	|   	|
| Supported in **Free** edition  	|   	|  x 	|   	|   	|
| Supports password expiration  	|   	|   x	|   	|   	|
|   	|   	|   	|   	|   	|
|   	|   	|   	|   	|   	|
|   	|   	|   	|   	|   	|
|   	|   	|   	|   	|   	|
|   	|   	|   	|   	|   	|
|   	|   	|   	|   	|   	|
|   	|   	|   	|   	|   	|

# Password Hash Synchronization

## Password Writeback

- By default, disabled - one-way sync "from on-prem to the cloud". 
- Requires P1 or P2
- Removes need to set up on-prem SSPR solution

