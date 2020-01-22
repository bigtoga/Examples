~~~
# Save in the current directory
# To save in a different directory, just use C:\MyFolder\MyFile.csv

# the r prefix:  place before the path name to take care of any symbols within the path name
#    such as the backslash symbol). Otherwise, you’ll get the following error: 
#   (unicode error) ‘unicodeescape’ codec can’t decode bytes in position 2-3: truncated \UXXXXXXXX escape

export_csv = df.to_csv (r'export_dataframe.csv'
  , index = None
  , header=True
) 
~~~
