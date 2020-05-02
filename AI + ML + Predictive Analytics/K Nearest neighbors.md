knn

Classification mostly but sometimes regression
* Outlier insentsitivity

k=*n*

When `k=1`, this is simply 'nearest neighbor' to the current data point:
1. Find the point nearest your new data point
2. Classify your current data to be the same as the nearest neighbor

When `k=3`, we find the 3 closest neighbords:
1. Find the 3 points nearest your new data point
2. Classify your current data to be the same as the "most"

`k` should never be an even number or you will get ties

!(https://i.imgur.com/KPz8oPP.png)
