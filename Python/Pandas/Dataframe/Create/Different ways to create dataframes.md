~~~
import pandas as pd
df = pd.DataFrame({
  "Dynasty": ["Early Dynastic Period", "Old Kingdom"],
  "Pharoah": ["Thinis", "Memphis"]
  }
)

##################################
# Option 2:
# initialize list of lists 
data = [['tom', 10], ['nick', 15], ['juli', 14]] 
  
# Create the pandas DataFrame 
df = pd.DataFrame(data, columns = ['Name', 'Age']) 
~~~
