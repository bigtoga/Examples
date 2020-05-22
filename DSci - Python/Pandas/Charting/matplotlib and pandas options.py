x: The default value is None. If data is a DataFrame, assign x value.
y: It allows plotting one column vs. another, and the default value is None.
Kind: It accepts string value specifying the plot or chart you want. They are area, bar, barh, box, density, hexbin, hist, KDE, line, pie, scatter.
figsize: A (width, height) tuple in inches.
use_index: It accepts a boolean value, and the default value is True. Use index as tickets for the x-axis.
title: Assign title to a chart.
grid: Gridlines for Axis and the default value is None
legend: It accepts True, False, or ‘reverse’.
style: Accepts list or dictionary. Line style per column.
logx, logy, loglog: Use logx for scaling on the x-axis, logy for scaling y-axis, and loglog for scaling both the x and y-axis
xticks: Sequential values for xticks.
yticks: Sequence values for yticks.
xlim, ylim: 2-tuple or List.
rot: Rotation for xticks and yticks. xticks for vertical and yticks for horizontal plots.
fontsize: Specify integer value to decide the font size for both xticks and yticks.
colormap: matplotlib or str colormap object. Use this to select a color.
colorbar: Use this for scatter and hexbin plot by setting this to True.
position: Specify the alignment of the bar plot layout. You can specify any value between 0 and 1, and the default value is 0.5. Here, 0 means left bottom end, and 1 means the right top end.
table: This accepts boolean values, and the default value is False. If you set this True, it draws a table with the matplotlib default layout.
yerr: Series, DataFrame, dictionary, an array-like, and str.
xerr: Series, DataFrame, dictionary, an array-like, and str.
mark_right: By default, it set to True. When we are using a secondary y-axis, it automatically marks the column labels to the right side.
**kwds: Keywords.
