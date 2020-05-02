# Confusion Matrix
This page is all about understanding the **Confusion Matrix**, a handy way to measure machine learning classification algorithms when the output is two or more `classes`. You will use this when you are trying to decide about Recall, Precision, Specificity, Accuracy and most importantly AUC-ROC Curve.

![x](https://i.imgur.com/XisI7v7.png)

From https://towardsdatascience.com/understanding-confusion-matrix-a9ad42dcfd62
![x](https://i.imgur.com/5K9y5Q3.png)

* https://towardsdatascience.com/understanding-confusion-matrix-a9ad42dcfd62

### Recall
Recall represents "out of all of the Positive pregnancy predictions, what **percentage** were correct? 

![x](https://i.imgur.com/qfOPpK4.gif)

[Understanding ROC curves](https://towardsdatascience.com/understanding-auc-roc-curve-68b2303cc9c5)
* AUC (Area Under The Curve) 
* ROC (Receiver Operating Characteristics)
* AUC-ROC is sometimes called AUROC (Area Under the Receiver Operating Characteristics)
* When it comes to a classification problem, we can count on an AUC - ROC Curve. When we need to check or visualize the performance of the multi - class classification problem, we use AUC (Area Under The Curve) ROC (Receiver Operating Characteristics) curve. 
* **It is one of the most important evaluation metrics for checking any classification model’s performance** 
* 
* 
* 
* 
* 
* 

[Accuracy, Precision, Recall & F1 Score: Interpretation of Performance Measures](https://blog.exsilio.com/all/accuracy-precision-recall-f1-score-interpretation-of-performance-measures/)
* Once you have built your model, the most important question that arises is how good is your model?
* Accuracy, Precision, Recall & F1 Score metrics 
* **ROC curve** and we can determine whether our ROC curve is good or not by looking at AUC (Area Under the Curve) and other parameters which are also called as Confusion Metrics
* 
* 
* 
* 
* 


AIC vs. BIC - https://www.methodology.psu.edu/resources/AIC-vs-BIC/

Additional metrics - https://machinelearningmastery.com/metrics-evaluate-machine-learning-algorithms-python/

### Classification Accuracy
The number of correct predictions made as a ratio of all predictions made. This is the most common evaluation metric for classification problems

~~~
# Cross Validation Classification Accuracy
import pandas
from sklearn import model_selection
from sklearn.linear_model import LogisticRegression
url = "https://raw.githubusercontent.com/jbrownlee/Datasets/master/pima-indians-diabetes.data.csv"
names = ['preg', 'plas', 'pres', 'skin', 'test', 'mass', 'pedi', 'age', 'class']
dataframe = pandas.read_csv(url, names=names)
array = dataframe.values
X = array[:,0:8]
Y = array[:,8]
seed = 7
kfold = model_selection.KFold(n_splits=10, random_state=seed)
model = LogisticRegression()
scoring = 'accuracy'
results = model_selection.cross_val_score(model, X, Y, cv=kfold, scoring=scoring)
print("Accuracy: %.3f (%.3f)") % (results.mean(), results.std())
~~~

`Accuracy: 0.770 (0.048)
(77%)

### Logistic Loss (a.k.a. log loss)
Logistic loss (or log loss) is a performance metric for evaluating the predictions of probabilities of membership to a given class.

The scalar probability between 0 and 1 can be seen as a **measure of confidence for a prediction** by an algorithm. 
Predictions that are correct or incorrect are rewarded or punished proportionally to the confidence of the 
prediction.

### Area Under ROC Curve

### Confusion Matrix

### Classification Report
