# If you want to replace backslashes, you have to pass is regex=False (it is True by default)
df['Sprint'] = df['Iteration Path'].str.replace("Folder1\\Folder2\\Sprint ", "", regex=False)
df['Sprint'] 
