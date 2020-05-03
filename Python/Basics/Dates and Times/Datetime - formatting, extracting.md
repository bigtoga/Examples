Many many ways... One way is to use `strftime`
```python
today = date.today()
daynum = today.strftime("%d")
month = today.strftime("%m")
year = today.strftime("%Y")
day = int(daynum) - 7
print(f"Today: {today} \n\tyear: {year} \n\tmonth: {month} \n\tday of month: {daynum} ")
```
```shell
Today: 2020-05-03 
	year: 2020 
	month: 05 
	day of month: 03 
```

man pages: http://man7.org/linux/man-pages/man3/strftime.3.html

|Type |Hierarchy|Code|Meaning|Example|
|--- |--- |--- |--- |--- |
Date | Year |%y|Year without century as a zero-padded decimal number.|13|
Date | Year |%Y|Year with century as a decimal number.|2013|
Date | Year |%G|Confusing - used for reporting week 53 of previous year or week 0 of new year|TBD|
Date | Quarter |%q|Quarter #` |1|
Date | Quarter |(not supported) |Use pandas `quarter = pd.Timestamp(dt.date(2016, 2, 29)).quarter` |1|
Date | Quarter |(not supported) |Use pandas `quarter = pd.PeriodIndex(today_date, freq='Q-MAR').strftime('Q%q')` |1|
Date | Quarter |(not supported) |Use math library `Q=math.ceil(X.month/3.)` |1|
Date | Quarter |(not supported) |Use math library `math.ceil(float(m) / 3)` |1|
Date | Quarter |(not supported) |`quarter_of_the_year = 'Q'+str((now.month-1)//3+1)` |1|
Date | Quarter |(not supported) |Use a hand-written function (see below) ` |1|
Date | Month |%b|Month as locale’s abbreviated name.|Sep|
Date | Month |%B|Month as locale’s full name.|September|
Date | Month |%m|Month as a zero-padded decimal number.|09|
Date | Month |%-m|Month as a  decimal number. (Platform specific)|9|
Date | Week |%U|Sunday as first day of week starting w the first Sunday as the first day of week 01. Days in a new year preceding the first Sunday are in week 0. range 00 to 53|39|
Date | Week |%W|Monday as first day of week starting w the first Monday as the first day of week 01. Days in a new year preceding the first Monday are in week 0. range 00 to 53|39|
Date | Week |%V|ISO 8601 week number (see NOTES) of the current year as a decimal number, range 01 to 53, where week 1 is the first week that has at least 4 days in the new year.|TBD|
Date | Day of year |%j|Day of the year as a zero-padded decimal number.|273|
Date | Day of year |%-j|Day of the year as a  decimal number. (Platform specific)|273|
Date | Day of month |%d|Day of the month as a zero-padded decimal number.|30|
Date | Day of month |%-d|Day of the month as a  decimal number. (Platform specific)|30|
Date | Day of week |%a|Weekday as locale’s abbreviated name.|Mon|
Date | Day of week |%A|Weekday as locale’s full name.|Monday|
Date | Day of week |%w|Weekday as a decimal number, where 0 is Sunday and 6 is Saturday.|1|
Time | Hour |%H|Hour (24-hour clock) as a zero-padded decimal number.|07|
Time | Hour |%-H|Hour (24-hour clock) as a  decimal number. (Platform specific)|7|
Time | Hour |%I|Hour (12-hour clock) as a zero-padded decimal number.|07|
Time | Hour |%-I|Hour (12-hour clock) as a  decimal number. (Platform specific)|7|
Time | 12-hour AM/PM |%p|Locale’s equivalent of either AM or PM.|AM|
Time | Minute |%M|Minute as a zero-padded decimal number.|06|
Time | Minute |%-M|Minute as a  decimal number. (Platform specific)|6|
Time | Second |%S|Second as a zero-padded decimal number.|05|
Time | Second |%-S|Second as a  decimal number. (Platform specific)|5|
Time | Microsecond |%f|Microsecond as a decimal number, zero-padded on the left.|000000|
Time | UTC Offset |%z|UTC offset in the form +HHMM or -HHMM (empty string if the the object is naive).||
Time | Time zone name |%Z|Time zone name (empty string if the object is naive).||
| |%U|Week number of the year (Sunday as the first day of the week) as a zero padded decimal number. All days in a new year preceding the first Sunday are considered to be in week 0.|39|
DateTime | |%c|Locale’s appropriate date and time representation.|Mon Sep 30 07:06:05 2013|
Date | Dates |%x|Locale’s appropriate date representation.|09/30/13|
Time | Times |%X|Locale’s appropriate time representation.|07:06:05|
Misc | Misc |%%|A literal '%' character.|%|

### Examples from https://stackoverflow.com/questions/1406131/is-there-a-python-function-to-determine-which-quarter-of-the-year-a-date-is-in 

```python
month2quarter = {
        1:1,2:1,3:1,
        4:2,5:2,6:2,
        7:3,8:3,9:3,
        10:4,11:4,12:4,
    }.get
	
month2quarter(9) # returns 3
```	

```python 
def get_quarter(date):
    for months, quarter in [
        ([1, 2, 3], 1),
        ([4, 5, 6], 2),
        ([7, 8, 9], 3),
        ([10, 11, 12], 4)
    ]:
        if date.month in months:
            return quarter
```
