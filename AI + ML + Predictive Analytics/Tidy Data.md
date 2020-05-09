"Most people who want ML / AI really just need linear regression on cleaned-up data" - 

[Wikipedia - Tidy Data](https://en.wikipedia.org/wiki/Tidy_data)
> Hadley Wickham later defined "Tidy Data" as **data sets that are arranged such that each** 
> **variable is a column and each observation (or case) is a row.**

Tidy data is an alternative name for the common statistical form called a model matrix or data matrix.
* **data matrix** - A standard method of displaying a multivariate set of data is in which rows 
correspond to sample individuals and columns to variables, so that the entry in the ith row and 
jth column gives the value of the jth variate as measured or observed on the ith individual.

# Notes from Hadley Wickham's original PDF about Tidy Data
* [Original PDF about Tidy Data](https://www.jstatsoft.org/index.php/jss/article/view/v059i10/v59i10.pdf)
* [GitHub for Tidy Data](https://github.com/hadley/tidy-data)

> “Happy families are all alike; every unhappy family is unhappy in its own way.” –– Leo Tolstoy
> “Tidy datasets are all alike, but every messy dataset is messy in its own way.” –– Hadley Wickham

* Every `value` belongs to a variable *and* an observation
* A `variable` contains all values that measure the **same underlying attribute** (like height, temperature, duration) across `units`
* An `observation` contains all values measured on the same unit (like a person, or a day, or a race) across attributes

> A dataset is messy or tidy depending on how rows, columns and tables are matched up with observations, variables and types. In tidy data:
1. Each `variable` forms a column.
2. Each `observation` forms a row.
3. Each type of `observational unit` forms a table.

> This is Codd's 3rd normal form, but with the constraints framed in statistical language, and the focus put on a single dataset rather than the many connected datasets common in relational databases. **Messy data is any other other arrangement of the data.**
> Tidy data makes it easy for an analyst or a computer to extract needed variables because it provides a standard way of structuring a dataset.

> Computer scientists often call fixed variables `dimensions`, and statisticians usually denote them with subscripts on random variables. `Measured variables` are what we actually measure in the study. 

### How to order your variables and sort your data
1. Fixed variables should come first
2. Measured variables should come next
3. Order each set of variables so that related variables are contiguous
4. Rows can then be ordered by the *first variable*, breaking ties with the second and subsequent (fixed) variables. 


|  Spreadsheet/Table/Concept 	| What it becomes in "Tidy Data" 	|
|---	|---	|
|  Column 	| Variable  	|
|  Row 	| `Case` or `Observation`  	|

[Really good, clear definitions](https://www.jeannicholashould.com/tidy-data-in-python.html) - some notes:
Rules of Tidy Data:
* Each **variable** forms a column and contains values
* Each **observation** forms a row
* Each type of **observational unit** forms a table
* One sheet per file (i.e. a CSV)
* One level of observation per sheet

### Example of "messy data"
|              | Treatment A | Treatment B |
|--------------|-------------|-------------|
| John Smith   | \-          | 2           |
| Jane Doe     | 16          | 11          |
| Mary Johnson | 3           | 1           |

### Example of "Tidy Data"
| Name         | Treatment | Result |
|--------------|-----------|--------|
| John Smith   | a         | \-     |
| Jane Doe     | a         | 16     |
| Mary Johnson | a         | 3      |
| John Smith   | b         | 2      |
| Jane Doe     | b         | 11     |
| Mary Johnson | b         | 1      |


![x](https://i.imgur.com/8pVGSzh.png)

# Resources 
* [What's Tidy Data?](https://towardsdatascience.com/whats-tidy-data-how-to-organize-messy-datasets-in-python-with-melt-and-pivotable-functions-5d52daa996c9)
* https://r4ds.had.co.nz/tidy-data.html
* https://en.wikipedia.org/wiki/Category:Data_processing
