"Most people who want ML / AI really just need linear regression on cleaned-up data" - 

[Wikipedia - Tidy Data](https://en.wikipedia.org/wiki/Tidy_data)
> Hadley Wickham later defined "Tidy Data" as **data sets that are arranged such that each** 
> **variable is a column and each observation (or case) is a row.**

Tidy data is an alternative name for the common statistical form called a model matrix or data matrix.
* **data matrix** - A standard method of displaying a multivariate set of data is in which rows 
correspond to sample individuals and columns to variables, so that the entry in the ith row and 
jth column gives the value of the jth variate as measured or observed on the ith individual.

# Hadley Wickham
[Original PDF about Tidy Data](https://www.jstatsoft.org/index.php/jss/article/view/v059i10/v59i10.pdf)

> “Happy families are all alike; every unhappy family is unhappy in its own way.” –– Leo Tolstoy
> “Tidy datasets are all alike, but every messy dataset is messy in its own way.” –– Hadley Wickham

|  Spreadsheet/Table/Concept 	| What it becomes in "Tidy Data" 	|
|---	|---	|
|  Column 	| Variable  	|
|  Row 	| Case or Observation  	|

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
