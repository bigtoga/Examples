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
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: left;">
      <th></th>
      <th>Treatment A</th>
      <th>Treatment B</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>John Smith</th>
      <td>-</td>
      <td>2</td>
    </tr>
    <tr>
      <th>Jane Doe</th>
      <td>16</td>
      <td>11</td>
    </tr>
    <tr>
      <th>Mary Johnson</th>
      <td>3</td>
      <td>1</td>
    </tr>
  </tbody>
</table>

![x](https://i.imgur.com/8pVGSzh.png)

# Resources 
* [What's Tidy Data?](https://towardsdatascience.com/whats-tidy-data-how-to-organize-messy-datasets-in-python-with-melt-and-pivotable-functions-5d52daa996c9)
* https://r4ds.had.co.nz/tidy-data.html
* https://en.wikipedia.org/wiki/Category:Data_processing
