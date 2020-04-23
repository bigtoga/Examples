```
graph TD
A[Client] --> B[Load Balancer]
B --> C[Server01]
B --> D[Server02]
```
![Architecture flow](https://mermaid-js.github.io/mermaid/img/n00b-firstFlow.png)

```
::: mermaid
graph TD
A[Customer] --> B[API Gateway]
B -->  H[api1]
B --> | round robin | w10[api2]
B --> | round robin | w11[api3]

classDef green fill:#9f6,stroke:#333,stroke-width:2px;
class w10,e green
class w11,e green
:::
```
