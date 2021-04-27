mrjob
* Developed by Yelp
* Lets you write MapReduce jobs in Python and run them on various platforms
* Lets you run jobs on a Hadoop cluster

Example - takes an input.txt file, counts every occurrence of the word "bacon", and returns it
```python
from mrjob.job import MRJob

class Hot_Days(MRJob):

    def mapper(self, key, line):
        (station, name, state, date, snow, tmax, tmin) = line.split(",")
        if tmax and int(tmax) >= 100:
            yield name, 1

    def reducer(self, name, hot):
        yield name, sum(hot)

if __name__ == "__main__":
    Hot_Days.run()
```

```csv
US1TXTV0059,TANGLEWOOD FOREST 0.6 NE, TX US,2017-01-01,0.0,,
US1TXTV0059,TANGLEWOOD FOREST 0.6 NE, TX US,2017-01-03,0.0,,
US1TXTV0059,TANGLEWOOD FOREST 0.6 NE, TX US,2017-01-04,0.0,,
US1TXTV0059,TANGLEWOOD FOREST 0.6 NE, TX US,2017-01-05,0.0,,
US1TXTV0059,TANGLEWOOD FOREST 0.6 NE, TX US,2017-01-06,0.0,,
US1TXTV0059,TANGLEWOOD FOREST 0.6 NE, TX US,2017-01-07,0.0,,
US1TXTV0059,TANGLEWOOD FOREST 0.6 NE, TX US,2017-01-08,0.0,,
...
```

```shell
map_reduce.py austin.csv
```
