Notes
BSON - effectively compressed JSON

No tables - "collections"

** NoSql vs. SQL using "storing an invoice" as an example

### NOSQL:

It’s easy to store a new invoice. Each invoice is a single document, so we store as a whole in a single step.
And we could easily read a simple invoice. We need the number and the system will return the whole invoice.
However, it fails to data analysis. 
1. What if we need to obtain all the invoices of some customer? 
2. What if we want all the invoices with some product? 

Why did it fail? Because it needs to read the whole invoice, one by one and it could be painfully slow.
### SQL

It’s hard to store a new invoice because we need to separate in different rows. It also involves working with transactions.
Also reading a whole invoice is tricky because we need to do different calls to the database and merge the information in our code.
However, it’s ideal for data analysis. It could obtain all the invoices of a customer in a fraction of second.
