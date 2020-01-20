~~~
# Add a dataframe to another dataframe

# Create a new dataframe:
df = pd.Dataframe()

df = df.append(otherDF, ignore_index = True)
~~~

# 2019 StackOverflow example
(thread)[https://stackoverflow.com/questions/10715965/add-one-row-to-pandas-dataframe]
~~~
import pandas as pd
import numpy as np
import time

del df1, df2, df3, df4
numOfRows = 1000
# append
startTime = time.perf_counter()
df1 = pd.DataFrame(np.random.randint(100, size=(5,5)), columns=['A', 'B', 'C', 'D', 'E'])
for i in range( 1,numOfRows-4):
    df1 = df1.append( dict( (a,np.random.randint(100)) for a in ['A','B','C','D','E']), ignore_index=True)
print('Elapsed time: {:6.3f} seconds for {:d} rows'.format(time.perf_counter() - startTime, numOfRows))
print(df1.shape)

# .loc w/o prealloc
startTime = time.perf_counter()
df2 = pd.DataFrame(np.random.randint(100, size=(5,5)), columns=['A', 'B', 'C', 'D', 'E'])
for i in range( 1,numOfRows):
    df2.loc[i]  = np.random.randint(100, size=(1,5))[0]
print('Elapsed time: {:6.3f} seconds for {:d} rows'.format(time.perf_counter() - startTime, numOfRows))
print(df2.shape)

# .loc with prealloc
df3 = pd.DataFrame(index=np.arange(0, numOfRows), columns=['A', 'B', 'C', 'D', 'E'] )
startTime = time.perf_counter()
for i in range( 1,numOfRows):
    df3.loc[i]  = np.random.randint(100, size=(1,5))[0]
print('Elapsed time: {:6.3f} seconds for {:d} rows'.format(time.perf_counter() - startTime, numOfRows))
print(df3.shape)

# dict
startTime = time.perf_counter()
row_list = []
for i in range (0,5):
    row_list.append(dict( (a,np.random.randint(100)) for a in ['A','B','C','D','E']))
for i in range( 1,numOfRows-4):
    dict1 = dict( (a,np.random.randint(100)) for a in ['A','B','C','D','E'])
    row_list.append(dict1)

df4 = pd.DataFrame(row_list, columns=['A','B','C','D','E'])
print('Elapsed time: {:6.3f} seconds for {:d} rows'.format(time.perf_counter() - startTime, numOfRows))
print(df4.shape)
~~~
