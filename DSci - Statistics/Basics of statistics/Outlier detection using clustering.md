General guidance:
- Use IQR as your first thought for identifying outliers; Use clustering when you can’t use IQR
- k-means uses Euclidean distances which means it is sensitive to scale/scaling issues
- You May need to do k-means multiple times with different initial centroids to identify the most commonly used labels
- K-means clustering is simplest, most explainable 
- Suitable for unsupervised Machine Learning

# Clustering basics
Properties of a cluster:
1. All of the data points in a cluster should be similar to each other
2. The data points from different clusters should be as different as possible

Example data set of income to debt ratios [from this article](https://www.analyticsvidhya.com/blog/2019/08/comprehensive-guide-k-means-clustering/):

![?](https://i.imgur.com/yrAuMll_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

This can be grouped into potentially two different groups:

![?](https://i.imgur.com/EiL53se_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

Although Case I is possible, it’s clear that Property #2 is better represented by Case II

### Solving Property #1: inertia
**inertia** is the measurement of **intra-cluster distance from the centroid

![?](https://i.imgur.com/17ZVAZa_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

*Image source: https://www.analyticsvidhya.com/blog/2019/08/comprehensive-guide-k-means-clustering/*

Rule of thumb: the smaller the inertia, the “tighter” the cluster. The tighter the cluster, the *better* the cluster is
- In other words, inertia makes sure that the *first* property of clusters is satisfied

### Solving Property #2: the Dunn Index
The Dunn-Index is the ratio of the minimum of inter-cluster distances and maximum of intracluster distances. The smaller the Dunn index value, the better your clusters are. 

Dunn:
- Measure the intra-cluster distances (i.e. how far each cluster is from the other clusters)
- Calculate the max intra-cluster distance
- Calculate the Dunn index by dividing the minimum inertia by the max intra-cluster distance


# Basics of k-means clustering
k-means uses a concept core to all machine learning algorithms: create a generalized view of the data. K-means is an unsupervised learning technique. K-means essentially takes *n* observations (i.e. your dataset) and groups them data into *k* clusters

## The three main steps in k-means
There are 3 steps:
1. **Initialisation** – *k* initial “means” (centroids) are generated at random
1. **Assignment** – *k* clusters are created by associating each observation with the nearest centroid
1. **Update** – The centroid of the clusters becomes the new mean

Assignment and Update are repeated until convergence (i.e. when the sum of squared errors is minimised between points and their respective centroids)

The k-means problem is solved using either Lloyd’s or Elkan’s algorithm. Elkan’s is better for defined clusters

# Resources
- [Write your own k-means clustering algorithm in Python](https://benalexkeen.com/k-means-clustering-in-python/)
- [How k-means clustering algorithm works](https://link.medium.com/9keTk2UvB7)