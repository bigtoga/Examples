So that you don't have to embed the password/username/whatever you want to hide:

```python
# https://colab.research.google.com/notebooks/io.ipynb#scrollTo=XDg9OBaYqRMd
from google.colab import drive
import os 

drive.mount('/content/drive')

# Create a secrets file - I named my "google_colab_secrets"
# In your file, add two keys: aws_postgresql_url, aws_postgresql_password
# Upload this to the root of your Google Drive

filename = "/content/drive/My Drive/google_colab_secrets"

with open(filename) as creds:
    print(creds)
    for i, line in enumerate(creds):
        if line.startswith("aws_postgresql_url"):
            aws_postgresql_url = line.replace("aws_postgresql_url=", "").replace("\n", "")

        if line.startswith("aws_postgresql_password"):
            aws_postgresql_password = line.replace("aws_postgresql_password=", "").replace("\n", "")

# print(aws_postgresql_url)

# Configure settings for RDS
mode = "append"
jdbc_url=f"jdbc:postgresql://{aws_postgresql_url}:5432/my_data_class_db"
config = {"user":"postgres", 
          "password": aws_postgresql_password, 
          "driver":"org.postgresql.Driver"}
```          
