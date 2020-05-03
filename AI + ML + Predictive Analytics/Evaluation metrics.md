# Binary (binomial) classification 

https://en.wikipedia.org/wiki/Binary_classification
> Statistical classification is a problem studied in machine learning. It is a type of supervised learning, a method of machine learning where the `categories` are predefined, and is used to categorize new probabilistic observations into said categories. 
> When there are only two categories the problem is known as `statistical binary classification`.

Common Statistical binary classification algorithms 
- Decision trees
- Random forests
- Bayesian networks
- Support vector machines
- Neural networks
- Logistic regression
- Probit model

# Using a Confusion Matrix to Evaluate Model Performance 
*Note: "performance" in this context means "the quality of the predictions" 
rather than "how long it took to finish".*

The **Confusion Matrix** is a handy way to measure machine learning 
classification algorithms when the output is two or more `classes`. 
You will use this when you are trying to decide about Recall, Precision, Specificity, Accuracy and most importantly AUC-ROC Curve.

![x](https://i.imgur.com/XisI7v7.png)

From https://towardsdatascience.com/understanding-confusion-matrix-a9ad42dcfd62
![x](https://i.imgur.com/5K9y5Q3.png)

* TP = True Positives (good) - the model predicted "True" and was correct 
* NP = True Negatives (good) - the model predicted "False" and was correct 
* FP = False Positives (bad) - the model predicted "True" but actual data was "False"
* FN = False Negatives (bad) - the model predicted "False" but actual data was "True"

The results themselves are called `classes` for whatever reason. TP refers to the true positives class

* https://towardsdatascience.com/understanding-confusion-matrix-a9ad42dcfd62

### Recall a.k.a. True Positive Rate (TPR) a.k.a. Sensitivity
Recall represents "out of all of the Positive pregnancy predictions, 
what **percentage** were correct?"

![x](https://i.imgur.com/UEsgBgf.gif)

### Precision a.k.a. Positive Predictive Value or Specificity
Out of all of the classes that were predicted to be "Positive", how many were TP?

![x](https://i.imgur.com/J3DHXzO.gif)

Wikipedia has a nice graphic that explains this on the 
[precision and recall wiki](https://en.wikipedia.org/wiki/Precision_and_recall). 
![v](https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Precisionrecall.svg/350px-Precisionrecall.svg.png)

## Examples of precision and recall
Imagine a new search engine comes online and you want to evaluate whether it is
better or worse than google. You type in your search term and click the "Search" button. 
You want to be scientific about this, so you scrutinize and analyze the results,
and then record them in a database. 
- Test 1: 
* * Returned: 30 web pages 
* * How many were relevant? 20
* * Google returned: 60 web pages

Precision represents "How useful the results are": 66.6% (20/30)

Recall represents "how comprehensive" the results were": 33.3% (20 out of 60)

When a search engine returns 30 pages only 20 of which were 
relevant while failing to return 40 additional relevant pages, 
its precision is 20/30 = 2/3 while its recall is 20/60 = 1/3. 
So, in this case, precision is "how useful the search results are", and recall is "how complete the results are".

### Accuracy
simply a ratio of "correctly predicted observations" to the "total observations". 
Out of all the classes, what percentage did we predict correctly? 
This should generally be as high as possible

![x](https://i.imgur.com/6ZLrUHb.gif)

### F1 a.k.a. F-Score
It is difficult to compare two models with "low precision and high recall" or vice versa. F1 measures both Recall and Precision and using the Harmonic Mean instead of Arithmetic Mean which means it "punishes" the extremes and outliers
more.

![x](https://i.imgur.com/y2jsWBa.png)

---
***

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
