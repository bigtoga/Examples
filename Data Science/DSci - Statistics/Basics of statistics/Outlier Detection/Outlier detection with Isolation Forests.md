General guidelines:
- Isolation Forest is an unsupervised Machine Learning technique 
- Also called **iForest** and it works by implementing an ensemble of **iTrees** in [the original paper](https://cs.nju.edu.cn/zhouzh/zhouzh.files/publication/icdm08b.pdf)

Isolation Forest algorithm focuses on *anomaly isolation* rather than normal instance profiling. iTree isolates anoma- lies closer to the root of the tree as compared to normal points. This unique characteristic allows iForest to build partial models (as opposed to full models in profiling) and employ only a tiny proportion of training data to build ef- fective models. 

sklearn: http://scikit-learn.org/stable/modules/generated/sklearn.ensemble.IsolationForest.html

# Examples using Isolation Forest
- [sklearn example](http://scikit-learn.org/stable/auto_examples/ensemble/plot_isolation_forest.html)
- [sklearn comparison of outlier detection techniques](http://scikit-learn.org/stable/auto_examples/miscellaneous/plot_anomaly_comparison.html)
- [Example on paperspace](https://blog.paperspace.com/anomaly-detection-isolation-forest/)

# When to use Isolation Forest

Anytime. iForest is:
- A decision trees based algorithm 
- uses very low memory
- ideal for high volume data sets
- faster than traditional clustering techniques
- suitable for high dimensional its datasets and problems 
- Handles situations where training data has no anomalies 

## How it works
Isolation Forest is a two stage algorithm:
1. Stage 1 (the training stage) builds isolation trees using sub-samples of the data
   - Isolation Forest is based on Decision Trees and, just like Decision Trees, it’s first step is to start with a root node and then partition the space
   - Isolation Forest partitions *randomly* whereas Decision Trees partitions based on [information gain](https://medium.com/deep-math-machine-learning-ai/chapter-4-decision-trees-algorithms-b93975f7a1f1)
   - IF Partitions are created by randomly selecting a feature and then randomly creating a split value between the maximum and the minimum value of the feature
1. Stage 2 (the evaluation stage) passes the test observations through the iTrees to obtain an **anomaly score**


Behind the scenes, Isolation Forest uses **Kurtosis** statistical test on each feature to identify what an anomaly would be (Univariate test) for that feature. It then ranks each feature, then creates groupings of select features. 

In sklearn implementation, it uses the **ExtraTreeRegressor**

# Additional resources 
- https://lambda.grofers.com/anomaly-detection-using-isolation-forest-80b3a3d1a9d8
- https://towardsdatascience.com/outlier-detection-with-isolation-forest-3d190448d45e