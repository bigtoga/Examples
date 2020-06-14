[Good link here with solid comparison of two basketball players using boxplot visualizations](https://link.medium.com/5L4XdIYcj7)
- Good article on complexity of EDA and how to really analyze the data deeply 
- He is trying to find the best player to pick for his fantasy team
- Early on, he finds two players who, at a glance, seem nearly identical 
- He then goes on to use Plotly Express visualizations along with custom formulas and algorithms to identify “the best possible pick”

# Visualization #1: Bar Chart comparison

He identifies two players, Middleton and Bledsoe, whose stats look very similar when you view as a line chart:

![?](https://i.imgur.com/6NTrBmX_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

It looks like Bledsoe’s data might be slightly more uneven than Middleton. There are more high bars, and also some glaring gaps (low bars). It’s hard to tell for certain from these figures though. 

# Visualization #2: Histogram
Histograms plot the *spread* of data points, where the y-values are counts of values that fit into each x ‘bin’. They can show trends that may not be obvious in bar charts. 

```python 
# Note - how to rename x and y-axis labels  
fig = px.histogram(
    comp_df
    , x=‘fan_pts’
    , facet_row=‘player’
    , color=‘player’
    , labels={
          ‘fan_pts’: ‘Fantasy Points’  
          , ‘count’: ‘Count’
       }
    , nbins=30 # binning without using pandas cut or qcut 
)

# Plotly chart title
fig.update_layout(
   title=‘Fantasy performance comparison’
)

fig.show()
```

![?](https://i.imgur.com/54TES5V_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)


