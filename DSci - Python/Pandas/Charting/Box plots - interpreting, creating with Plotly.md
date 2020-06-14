[Good link here with solid comparison of two basketball players using boxplot visualizations](https://link.medium.com/5L4XdIYcj7)
- Good article on complexity of EDA and how to really analyze the data deeply 
- He is trying to find the best player to pick for his fantasy team
- Early on, he finds two players who, at a glance, seem nearly identical 
- He then goes on to use Plotly Express visualizations along with custom formulas and algorithms to identify “the best possible pick”

# Load the data 
See the article for all the code. I’m only interested in the Plotly parts so I’ve left out other pieces from his examples

# Visualization #1: Bar chart of all “candidate players”
```python   
import plotly.express as px

# Create a bar chart in plotly 
fig = px.bar(
   season_tot_df
   , y=‘fan_ppg’
   , x=‘name’
)

fig.show()
```

# Visualization #2: Bar Chart comparison

From the previous visualization, he identifies two players, Middleton and Bledsoe, to zoom in on. At a high level, their points per game look very similar - 

```python   
>>> print(season_tot_df[season_tot_df[‘name’].isin([‘Eric Bledsoe’, ‘Khris Middleton’])].fan_ppg)
>>> 45    31.905195
>>> 49    31.351282
``` 
He then goes onto to deep dive and create additional data points, then plots when you view as another bar chart:
```python   
fig = px.bar(
   comp_df
   , y=‘fan_pts’
   , color=‘player’
   , facet_col=‘player’
   , labels={
         ‘fan_pts’: ‘Fantasy Points’
         , ‘date’: ‘Date’
     }
)

fig.update_layout(
   title=‘Fantasy performance comparison’
)

fig.show()
```

![?](https://i.imgur.com/6NTrBmX_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

It looks like Bledsoe’s data might be slightly more uneven than Middleton. There are more high bars, and also some glaring gaps (low bars). It’s hard to tell for certain from these figures though. 

# Visualization #3: Histogram
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

We now clearly see that Bledsoe is more inconsistent than Middleton. 
- Bledsoe has higher-scoring games more often
- Bledsoe also has lower-scoring games more often
- Even though they have the same average, the chance of “hitting that average in a single game” is clearly lower with Bledsoe 

If you are picking one player for the entire season, it makes no difference which one you pick. But if you are picking one player for a single or small number of games, it looks like you should clearly pick Middleton because of his consistency. 

# Visualization #4: Box plots
One thing to note is that Bledsoe has more 40+ point games than Middleton. If you wanted to optimize your pick to try to get a player with more 40+ point games even if that player was less consistent, should you pick Bledsoe? It’s impossible to tell from the previous visualizations how often one or the other hits 40+. 

Box plots in Plotly are easy and powerful ways to visually compare multiple classes. 

```Python   
fig = px.box(
   comp_df
   , x=‘player’
   , y=‘fan_pts’
   , color=‘player’
   , labels={
         ‘fan_pts’: ‘Fantasy Points’
         , ‘date’: ‘Date’
     }
)

fig.update_layout(title=‘Fantasy performance comparison’)

fig.show()
```
![?](https://i.imgur.com/IgKn5Rb_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

### Side bar: Interpreting box plots 
Four main components of a box plot: 
- **The size of the box** indicates where half of all outcomes fall into
- **The top and bottom lines** where most of the outcomes are expected
- **The dots** indicate ‘outliers’ a.k.a. “unusual outcomes”
- **The middle line** indicates where the ‘median’ value lies
   - Median tells us where “the middle value” of the dataset lies in perspective to the entire column’s data lies above this lone and 50% of the data lies below this line
   - Dan described this as the center balancing point - if the dataset was an actual linear “thing”, you could balance the dataset on your finger if you placed your finger “in the exact middle value” of the dataset 
   
Let’s pause to notice a few things this box plot shows that was not clear in previous graphs:
1. Outlier comparison - Middleton’s outliers are more likely to be “more points per game” while Bledsoe’s outliers are more likely to be “fewer points per game”
1. Consistency is clearer now - Middleton’s most likely range (his outcomes) are 18-48 points whereas Bledsoe’s most likely outcomes are in the 6-67 point range
- The middle line for Middleton is right around the 50% point indicating equal probability of his next games score being higher or lower than his average score
- The middle line for Bledsoe however is towards the lower part of the box indicating that he has more “high” values than “low values”. This tells us that, in his next game, he has a “greater than 50% chance” of scoring more than his average

# Visualization #5 - Box plot with clustered data points
Plotly makes it easy to “plot the dots” next to the box to visually show you where each of the subject’s data points fall. 

https://plotly.com/python/box-plots/

```Python   
fig = px.box(
   comp_df
   , x=‘player’
   , y=‘fan_pts’
   , color=‘player’
   , points=‘all’ # defaults to ‘outliers’
   , labels={
         ‘fan_pts’: ‘Fantasy Points’
         , ‘date’: ‘Date’
     }
)

fig.update_layout(title=‘Fantasy performance comparison’)

fig.show()
```

![?](https://i.imgur.com/yM5Jx9m_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

It’s very clear now: Middleton is the safer choice but Bledsoe is a “high risk, high reward” pick 

# Visualization #6: Violin plot
Just further confirmation 

```python   
fig = px.violin(
   comp_df
   , x=‘player’
   , y=‘fan_pts’
   , color=‘player’
   , labels={‘fan_pts’: ‘Fantasy Points’, ‘date’: ‘Date’}
   , points=“all”
)

fig.update_layout(title=‘Fantasy performance comparison’)

fig.show()
```

















