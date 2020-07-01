# Git graphs
```python   
git log —graph

```


# Time-based filters

```python   
git log -oneline 

# Show commits since yesterday 
git log —after=“yesterday”

# Also supported: today, week, month
git log —before=“10 day ago” 

# Show commits after a time period
git log —after=“2020-15-05”

# Find commits between a range
git log —after=“2020-15-05” —before=“2020-25-05”
```

# Author-based filters
```python   
git log —author=“Whigham”

# Show one author’s commit history for a range
git log —after=“1 week ago” —author=“Whigham”

```

# Commit based filters
```python   
# Show merged commits
git log —merges

```

# Brach-based filters
```python   
# Show commits in develop that are not yet in master
git log master..develop


```



# File name based filters
```python   
git log myFile.py

# Multiple files
git log myFile.py yourFile.py

```

# Text-based filters
```python
# -i case-insensitive
git log -i —grep=“fix” myFile.py

# Filter to show files w specific content
git log -i -S”function myFunction()”

```

[Good resource w examples here](https://gitbetter.substack.com/p/useful-tricks-you-might-not-know)