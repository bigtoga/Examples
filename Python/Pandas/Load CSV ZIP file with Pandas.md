~~~
import pandas as pd
import zipfile

zf = zipfile.ZipFile('C:/Users/Desktop/THEZIPFILE.zip') 
df = pd.read_csv(zf.open('intfile.csv'))
~~~
