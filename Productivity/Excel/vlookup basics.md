Tips on using it:

## Tip #1: Format the data in the lookup sheet/table

Put "the values you want returned from `vlookup`" *to the right* of the "values you want to search for"

Why? **In the lookup table, `vlookup` can only "return values in a column to the right of the lookup column"**
- If you lookup a value in column "C", you can only return values in columns D, E, F, etc
- 
## Tip #2: Create a table from the lookup sheet

Makes syntax easier

## Tip #3: Use FALSE searches for exact matches only

**You almost always have to insert `, FALSE)` at the end**
- By default, `vlookup` uses approximate matching and will often return incorrect values
- Changing to `, FALSE)` fixes 99 out of 100 `vlookup` issues for me

# Examples

Syntax: `=VLOOKUP (value, table, col_index, [range_lookup])`
- `value` = the column/value you want to search for

Scenario: 
- Final "I want to show this to my boss" sheet named "Current" with table named "Final"
      - Column named "VM Name"
- Lookup sheet named "AuditResults" with table named "AuditResults"
      - Column "A" is named "VM Name" (*but could be anything - it's not "the name of the column" but the actual data values that it searches for*)
      - Column "B" is named "CurrentSku"

The syntax would be `=VLOOKUP([@[VM Name]],Actual, 2, FALSE)`
