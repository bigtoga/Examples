# Calculated dimension attributes
Can create a calculated / derived field without aggregations - just a plain old calculated dimension

# Calculated measure
Can do two ways:
1. Just a calculated measure (SUM([Col1] + [Col2])
2. An expression based calculated measure that also includes a dimensional attribute/categorical

IF SUM([Col1]) > 1 THEN "Large"
ELSE "Small"
END

