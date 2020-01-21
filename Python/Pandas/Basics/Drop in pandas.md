## By column name
temp = temp.drop(columns = ["Number", "Nickname"])

## Drop rows:
~~~
# Find the rows you want to drop:
temp[(temp["Datacenter"].notna() == True) 
     & (temp["Primary IP"].notna() == False)
     & (temp["Secondary IP"].notna() == False)
    ]

# Then reverse the syntax to get only the rows you do want:
temp = temp[(temp["Datacenter"].notna() == True) 
     & (
         (temp["Primary IP"].notna() == True)
         | (temp["Secondary IP"].notna() == True)
     )
    ]
~~~
