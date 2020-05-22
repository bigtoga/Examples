### You can't do a list comprehension over a pandas dataframe column
You can only do it over a list:
~~~
bank_rate = df["Bank Count"].tolist()

bank_layer = gmaps.symbol_layer(
    locations, fill_color='rgba(0, 150, 0, 0.4)',
    stroke_color='rgba(0, 0, 150, 0.4)', scale=2,
    info_box_content=[f"Bank amount: {bank}" for bank in bank_rate]
)

fig = gmaps.figure()
fig.add_layer(bank_layer)

fig
~~~
