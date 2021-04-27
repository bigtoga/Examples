So that you don't have to embed the password/username/whatever you want to hide:

```python
# Install Java, Spark, and Findspark
!apt-get install openjdk-8-jdk-headless -qq > /dev/null
!wget -q http://www-us.apache.org/dist/spark/spark-2.4.5/spark-2.4.5-bin-hadoop2.7.tgz
!tar xf spark-2.4.5-bin-hadoop2.7.tgz
!pip install -q findspark

# Set Environment Variables
import os
os.environ["JAVA_HOME"] = "/usr/lib/jvm/java-8-openjdk-amd64"
os.environ["SPARK_HOME"] = "/content/spark-2.4.5-bin-hadoop2.7"

# Start a SparkSession
import findspark
findspark.init()

# https://colab.research.google.com/notebooks/io.ipynb#scrollTo=XDg9OBaYqRMd
from google.colab import drive
import os 
```

```
# Mount your Google Drive - note that, even though you have mounted /content/drive, you will 
# still need to use /content/drive/My Drive/ to actually see/use any "files you have uploaded"

drive.mount('/content/drive')
```
You will be required to authenticate - click the link, authorize Google to access Google, copy the code, and paste + Enter to continue

```python
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
          
# Write DataFrame to active_user table in RDS
clean_user_df.write.jdbc(url=jdbc_url, table='active_user', mode=mode, properties=config)
```          
