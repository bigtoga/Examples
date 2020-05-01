# bins are numbers, labels are strings (typically)
# Always 1 more bin than label
bins_7 = [0, 2, 6, 10, 14, 18, 22]
labels_6 = ['1st 2 wks', '2nd 4 wks', '3rd 4 wks', '4th 4 wks', '5th 4 wks', '6th 4 wks']

final ['Group'] = pd.cut(
    final['ClosedWeekNumber']
    , bins=bins_7
    , labels=labels_6
)

final

#############################################################
# if you want equal distribution of the items in your bins, use qcut. 
# If you want to define your own numeric bin ranges, then use cut. 
# binning, bins
#############################################################
# https://www.programcreek.com/python/example/101361/pandas.cut
# https://pbpython.com/pandas-qcut-cut.html

# qcut - you define the number of quantiles and let pandas figure out how to divide up the data. 
pd.qcut(df['ext price'], q=4) # You are asking pandas to make 4 groups

# You can have pandas auto apply labels as well
bin_labels_5 = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond']
df['quantile_ex_3'] = pd.qcut(df['ext price'],
                              q=[0, .2, .4, .6, .8, 1],
                              labels=bin_labels_5)
df.head()

# You can make a thresholds table automatically too 
results_table = pd.DataFrame(zip(bin_edges, bin_labels_5),
                            columns=['Threshold', 'Tier'])

# cut is used to specifically define the bin edges. There is no guarantee about the distribution of 
# items in each bin. In fact, you can define bins in such a way that no items are included in a bin
# or nearly all items are in a single bin.
# In real world examples, bins may be defined by business rules. For a frequent flier program, 
# 25,000 miles is the silver level and that does not vary based on year to year variation of the 
# data. If we want to define the bin edges (25,000 - 50,000, etc) we would use cut 
pd.cut(df['ext price'], bins=4)
pd.cut(df['ext price'], bins=4).value_counts()
