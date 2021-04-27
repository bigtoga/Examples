~~~
# Select first 2 rows only
df[0:2]

# Select certain columns only
df[['a','b']]

df[df['Status'] == 'Closed']

df = df[df['Status'] == 'Closed'][['SR #', 'Closed Date', 'Owner']]

# Multiple conditions
df = df[
    (df['Status'] == 'Closed') 
    &
    (df['Type'] == 'Operations')
][['SR #', 'Closed Date', 'Owner']]
df.dtypes
~~~

Love examples from Chris Albon here: https://chrisalbon.com/python/data_wrangling/pandas_selecting_rows_on_conditions/
~~~    
Method 1: Using Boolean Variables
# Create variable with TRUE if nationality is USA
american = df['nationality'] == "USA"

# Create variable with TRUE if age is greater than 50
elderly = df['age'] > 50

# Select all cases where nationality is USA and age is greater than 50
df[american & elderly]
~~~
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>first_name</th>
      <th>nationality</th>
      <th>age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>Molly</td>
      <td>USA</td>
      <td>52</td>
    </tr>
  </tbody>
</table>

~~~
# Select all cases where the first name is not missing and nationality is USA 
df[df['first_name'].notnull() & (df['nationality'] == "USA")]
~~~
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>first_name</th>
      <th>nationality</th>
      <th>age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Jason</td>
      <td>USA</td>
      <td>42</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Molly</td>
      <td>USA</td>
      <td>52</td>
    </tr>
  </tbody>
</table>

~~~
import pandas as pd  
data = pd.read_csv("nba.csv") 
  
# overwriting column with replaced value of age  
data["Team"]= data["Team"].str.replace("boston", "New Boston", case = False) 
  
filter = data["Team"]=="New Boston Celtics"
  
# printing only filtered columns  
data.where(filter).dropna() 
~~~
