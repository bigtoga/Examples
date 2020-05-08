# Spark and PySpark

Apache Spark is a unified analytics engine for large-scale data processing.
It lets you write applications in Java, Scala, Python, R, and SQL and runs on
Hadoop, stand-alone, or in the cloud (and many other platforms
* Uses a Resilient Distributed Dataset (RDD) as its basic abstraction layer
  * RDD is an immutable, partitioned collection of elements **that can be operated on in parallel**



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

####################################################################
# Start Spark session
from pyspark.sql import SparkSession
spark = SparkSession.builder.appName("DataFrameBasics").getOrCreate()

####################################################################
  # Create DataFrame manually
  dataframe = spark.createDataFrame([
                                    (0, "Here is our DataFrame"),
                                    (1, "We are making one from scratch"),
                                    (2, "This will look ver similar to a Pandas DataFrame")
  ], ["id", "words"])

  dataframe.show()

####################################################################
# Read in data from S3 Buckets
from pyspark import SparkFiles
url = "https://s3.amazonaws.com/dataviz-curriculum/day_1/food.csv"
spark.sparkContext.addFile(url)
df = spark.read.csv(SparkFiles.get("food.csv"), sep=",", header=True)

# Show DataFrame
df.show()

####################################################################
# Print our schema
df.printSchema()

####################################################################
# Show the columns
df.columns

####################################################################
# Describe our data
df.describe()

####################################################################
# Import struct fields that we can use
from pyspark.sql.types import StructField, StringType, IntegerType, StructType

####################################################################
# Next we need to create the list of struct fields
schema = [StructField("food", StringType(), True), StructField("price", IntegerType(), True),]
schema

####################################################################
# Pass in our fields
final = StructType(fields=schema)
final

####################################################################
# Read our data with our new schema
dataframe = spark.read.csv(SparkFiles.get("food.csv"), schema=final, sep=",", header=True)
dataframe.show()
```

# Accessing data
```python
dataframe['price']

type(dataframe['price'])

dataframe.select('price')
####################################################################
type(dataframe.select('price'))

####################################################################
dataframe.select('price').show()

```

# Manipulating columns
```python
# Add new column
dataframe.withColumn('newprice', dataframe['price']).show()

# Update column name
dataframe.withColumnRenamed('price','newerprice').show()



####################################################################

```
