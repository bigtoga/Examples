# How to calculate percentage freuency over entire dataset
# lambda op calculates this group's agg vs total dataset
groupped_data = df.groupby(['week', 'day']).agg({'sales': 'sum'})

groupped_data["%"] = groupped_data.apply(lambda x:  100*x / x.sum())

groupped_data

# How to calculate percentage freuency just of the individual elements in a group
# lambda op calculates this member of the current group's agg vs the agg of current group
groupped_data["%"] = groupped_data.groupby(level=0).apply(
     lambda x:  100*x / x.sum()
)

groupped_data

# https://link.medium.com/S2v0zPN0M7