# Service Bus
How to guarantee FIFO?
- enable Sessions 
- https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-sessions 



# Event Grid

- WebHook Event Delivery = ValidationCode and ValidationUrl 
- Topic Publishing = SAS token 

Event Grid supports two ways of validating the subscription: **ValidationCode** handshake (programmatic) and **ValidationURL** handshake (manual). If you control the source code for your endpoint, this method is recommended


https://docs.microsoft.com/en-us/azure/event-grid/security-authentication#webhook-event-delivery
