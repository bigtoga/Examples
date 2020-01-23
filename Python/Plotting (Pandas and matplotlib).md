### Saving the plot
~~~ 
# You must call savefig() before you call show() or else it will save a blank image
## Convert to floats
x_values = df['Latitude'].astype('float')
y_values = df['Wind Speed'].astype('float')

# Plot scatter plot
plt.scatter(x_values, y_values)

# Label plot
plt.xlabel('Latitude')
plt.ylabel('Wind Speed (mph)')
plt.title(f'City Latitude vs. Wind Speed ({date.today()})')
plt.grid()

# Show plot
plt.savefig(f'{output_folder}\plot_lat_vs_wind.png')
plt.show()

print("The relationship a city's latitude has with it's wind speed")
print('Pretty flat - perhaps an outlier or two as well')
~~~

~~~
df = pd.DataFrame({'mass': [0.330, 4.87 , 5.97],
...                    'radius': [2439.7, 6051.8, 6378.1]},
...                   index=['Mercury', 'Venus', 'Earth'])
plot = df.plot.pie(y='mass', figsize=(5, 5))
plot = df.plot.pie(subplots=True, figsize=(6, 3))
~~~

