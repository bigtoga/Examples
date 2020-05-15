So many different words for the same thing - hard to wrap your head around it at first. I think
best choice is to start with [Stevens' Typology of Variable Classification](https://en.wikipedia.org/wiki/Level_of_measurement)
and learn that "way of thinking" first, then start branching out into some of the other words/naming used
in tech/python/R/forums/office talk. 

From [wikipedia](https://en.wikipedia.org/wiki/Level_of_measurement):
>**Level of measurement** or **scale of measure** is a classification that describes the nature of information within the values assigned to variables. Psychologist Stanley Smith Stevens developed the **best-known classification** with four levels, or scales, of measurement: nominal, ordinal, interval, and ratio. This framework of distinguishing levels of measurement originated in psychology and is widely criticized by scholars in other disciplines. Other classifications include those by Mosteller and **Tukey**, and by Chrisman.

>Stevens proposed his typology in a **1946 Science article titled “On the theory of scales of measurement”**. In that article, Stevens claimed that *all measurement in science was conducted using four different types of scales that he called “nominal”, “ordinal”, “interval”, and “ratio”, unifying both “qualitative” (which are described by his “nominal” type) and “quantitative”)* to a different degree, all the rest of his scales). 

# Four types of variables in Stevens' Typology
* Nominal - a.k.a. categorical, qualitative 
* Ordinal - a.k.a. ranking 
* Interval a.k.a. 
* Ratio

# What type of variable am I using?
1. Can you perform arithmetic on it?
   * No - nominal
2. Yes - does it make *sense* to use addition or subtraction on it?
   * No - nominal (e.g. IDENTITY() value)
1. Yes - does a value of “0.00” mean “none of this item”?
   * Example: a value of “0.00” for `height` represents a lack of height
   * Example: a value of “0.00” in Fahrenheit for `temperature` means it is cold. Brrrrr!
   * Yes - ratio
1. No - does “0.00” represent the start of a scale?
   * Example: a number of “0.00” in Kelvin for `temperature` is the lowest possible number. This means that a temperature of 20K and exactly twice that of 10K
   * Yes - ratio
1. No - can you multiply the values and get meaningful, quantitative results?
   * Example: 20F is not “twice as much” as 10F
   * Example: 20K is *exactly* “twice as much” as 10K
   * Yes - ratio
1. No - is the difference between two observations meaningful (a.k.a. qualitative but not quantitative)?
   * Example: When offered a self-diagnosis with seven levels of “Current pain”, a user selected “3 - A little bit of pain”
   * Example: Does the difference between the 10th ranked student and the 40th ranked student mean that the 10th ranked student is exactly four times better than the 40th ranked student?
   * No - ordinal is for ranked data where the difference between two observations is not quantitative 
   * Someone who ranks themselves a “6 - Severe pain” is not in quantifiably twice as much pain as someone who selected “3 - A little bit of pain”
1. Yes - interval
   * The difference between 20 degrees F and 40 degrees F is exactly twice as much
   * The difference between 20 degrees F and 40 degrees F is the same as the difference between 100F and 120F

——

### Nominal level
Nominal **differentiates** between items or subjects **based only on their names or (meta-)categories and other qualitative classifications they belong to**
* Latin for “name”
* Boolean or dichotomous data (Yes/No answer) involves the construction of `classifications` (a.k.a. classes) for the classification of items
* Membership to a given classification/class/category is mutually exclusive but not ordered (i.e. a piece of data can only belong to one class/category at a time and the order of the classes is meaningless)
* Discovery of an exception to a classification can be viewed as *progress*
* Numbers may be used to represent the variables but the numbers do not have numerical value or relationship (e.g. an IDENTITY() column value or other numeric or GUID-like identifier)

The nominal level is **the lowest measurement level used** from a statistical point of view.

### Also known as “_____” variables:
* Categorical 
* Qualitative 

#### Mathematical operations on nominal data
Limited to **equality**, **non-equality**, and **set membership** only
* =, != or <>, IN(), NOT IN(), contains()
No arithmetic can be performed on nominal data (i.e. no +, -, /, *, %)

#### Central Tendency of Nominal Data
**Mode only** - mean() makes no sense

### 

### 

### 
