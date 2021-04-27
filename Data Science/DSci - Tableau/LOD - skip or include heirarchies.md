Similar to windowing functions in SQL - allows you to calculate different groupings of aggs

# Skip 1 level 
Dataset - Country, State, Population

Dimensions - Country, State

Measures - Population

Create a new calculated measure "Nationwide population" as `[EXCLUDE State : SUM(Population)]`. 
This creates a new field that has a single value repeated once per row. This basically just
changes the SQL to `SELECT SUM(Population) AS 'Nationwide population' FROM tbl GROUP BY Country`

Because the map shape file has Country, State as columns, it can manage that automaticallly. 

# Include 1 level 
Dataset - Country, State, ** City **, Population

Dimensions - Country, State, ** City **

Measures - Population

1. Create a new calculated measure "Nationwide population" as `[EXCLUDE State : SUM(Population)]`. 
This creates a new field that has a single value repeated once per row. This basically just
changes the SQL to `SELECT SUM(Population) AS 'Nationwide population' FROM tbl GROUP BY Country`

2. Create a new calculated measure "City pop" as `[INCLUDE City: SUM(Population)]`



