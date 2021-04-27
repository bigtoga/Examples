~~~ 
# Find the length of a zip
# Easiest way is to convert to a list!

test_data = list(test_data)
n_test = len(test_data)
~~~

### Load zip into dataframe
~~~
# Load cities into a dataframe
#df = pd.DataFrame()
type(lat_lngs)
list_of_tuples = list(zip(lat_lngs, cities)) 

#df = pd.DataFrame(list_of_tuples, columns = ['Name', 'Age']) 

print(list_of_tuples)
print(list(lat_lngs))
~~~
