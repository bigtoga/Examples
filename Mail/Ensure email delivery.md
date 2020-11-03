# Best practices for email authentication

1. SPF helps servers verify that messages appearing to come from a particular domain are sent from servers authorized by the domain owner.
2. DKIM adds a digital signature to every message. This lets receiving servers verify that messages aren't forged, and weren't changed during transit.
3. DMARC enforces SPF and DKIM authentication, and lets admins get reports about message authentication and delivery.
