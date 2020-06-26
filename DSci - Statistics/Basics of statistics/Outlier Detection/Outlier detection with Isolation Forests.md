General guidelines:
- Isolation Forest is an unsupervised Machine Learning technique 
- Also called **iForest** and it works by implementing an ensemble of **iTrees** in [the original paper](https://cs.nju.edu.cn/zhouzh/zhouzh.files/publication/icdm08b.pdf)

Isolation Forest algorithm focuses on *anomaly isolation* rather than normal instance profiling. iTree isolates anoma- lies closer to the root of the tree as compared to normal points. This unique characteristic allows iForest to build partial models (as opposed to full models in profiling) and employ only a tiny proportion of training data to build ef- fective models. 

# When to use Isolation Forest

Anytime. iForest is:
- uses very low memory
- ideal for high volume data sets
- faster than traditional clustering techniques
- suitable for high dimensional its datasets and problems 
- Handles situations where training data has no anomalies 

## How it works
Isolation Forest is a two stage algorithm:
1. Stage 1 (the training stage) builds isolation trees using sub-samples of the data
1. Stage 2 (the evaluation stage) passes the test observations through the iTrees to obtain an **anomaly score**

Behind the scenes, Isolation Forest uses **Kurtosis** statistical test on each feature to identify what an anomaly would be (Univariate test) for that feature. It then ranks each feature, then creates groupings of select features. 