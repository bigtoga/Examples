[Documentation](https://jupyter-gmaps.readthedocs.io/en/latest/tutorial.html#heatmaps)

[Troubleshooting gmaps errorrs](https://developers.google.com/maps/documentation/javascript/error-messages#retired-version)

[Installing and working with gmaps](https://jupyter-gmaps.readthedocs.io/en/latest/)

### Loading google sample data set + heatmap
~~~
# expects that you have your gmaps key in a config file
import gmaps
import gmaps.datasets

# Import API key
from api_keys import g_key

gmaps.configure(api_key=g_key)

locations = gmaps.datasets.load_dataset_as_df('acled_africa')
fig = gmaps.figure(map_type='HYBRID')
heatmap_layer = gmaps.heatmap_layer(locations)
fig.add_layer(heatmap_layer)
fig

~~~
