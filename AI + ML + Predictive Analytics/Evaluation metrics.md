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
