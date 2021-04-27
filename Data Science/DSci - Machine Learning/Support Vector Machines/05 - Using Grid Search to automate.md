Dan: Auto ML is where it's at - pretty much all linear regression, logistic, SVMs, etc can all be automated. OCR though is harder.

[scikit-learn](https://scikit-learn.org/) -> [machine learning & sklearn](https://scikit-learn.org/stable/) -> [models, classifiers, splitters](https://scikit-learn.org/stable/modules/classes.html#module-sklearn.model_selection) -> [GridSearchCV](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.GridSearchCV.html?highlight=gridsearchcv#sklearn.model_selection.GridSearchCV)

sklearn's **GridSearchCV** computes accuracy metrics for an algorithm on various combinations of parameters, over a cross-validation procedure. Grid Search is often helpful to avoid overfitting your data. It basically automates finding the best set of parameters for a prediction algorithm. It is a "Hyper-parameter optimizer" that allows you to segment your data into subsets, and then it runs your SVMs over each subset to tell you what the best ultimate recommedation/best parameters/best scores are for this dataset. It is a way of automating machine learning. Grid search is the process of performing hyper parameter tuning in order to determine the optimal values for a given model. This is significant as the performance of the entire model is based on the hyper parameter values specified.

A cross validation process is performed in order to determine the hyper parameter value set which provides the best accuracy levels.

There are three hyper-parameters; `C`, `epsilon` and `gamma`, to be optimized (these are the epsilon-support vector model (SVR) hyper parameters as talked about [here on scikit-learn](https://scikit-learn.org/stable/modules/generated/sklearn.svm.SVR.html)). 

## Error metrics that GridSearchCV shows
GridSearchCV uses two error metrics to determine the accuracy of the model. This is done by defining a custom scorer. This scorer is passed to the cross_validate() function of sklearn, which performs 10-fold cross validation (more on [K-Fold cross validation here](https://medium.com/datadriveninvestor/k-fold-cross-validation-6b8518070833)) and return the mean MAE and RMSE scores for our model.
* Mean Absolute Error (MAE) 
* Root Mean Squared Error(RMSE) 
![d](https://miro.medium.com/max/908/1*Dx1PIMN4YbCj1O87DHNMmw.png)
We can say that our model performs well and is able to give accurate predictions, given a new set of records. You can change the value ranges we used in the grid-search and further optimize the model to check if the model accuracy increases.

https://medium.com/@kesarimohan87/model-selection-using-cross-validation-and-gridsearchcv-8756aac1e9d7
https://medium.com/datadriveninvestor/a-practical-guide-to-getting-started-with-machine-learning-3a6fcc0f95aa
https://medium.com/datadriveninvestor/an-introduction-to-grid-search-ff57adcc0998

[Great article on how to evaluate a model](https://blog.exsilio.com/all/accuracy-precision-recall-f1-score-interpretation-of-performance-measures/)

"I just want precision" - Whatever gives me the highest precision is the model I want to go with (Precision = TP/TP+FP)

"I want the most accurate data" - that's now accuracy (TP+TN/TP+FP+FN+TN)

"I want accuracy and precision" - F1 score takes into account an average of both the precision and the accuracy

Precision and darts - throwing five darts all within 0.1 inches of each other but maybe not hitting the bullseye once

Accuracy and darts - hitting the bullseye with one dart

Accuracy - Accuracy is the most intuitive performance measure and it is simply a ratio of correctly predicted observation to the total observations. One may think that, if we have high accuracy then our model is best. Yes, accuracy is a great measure but only when you have symmetric datasets where values of false positive and false negatives are almost same. Therefore, you have to look at other parameters to evaluate the performance of your model. For our model, we have got 0.803 which means our model is approx. 80% accurate.

Accuracy = TP+TN/TP+FP+FN+TN

Precision - Precision is the ratio of correctly predicted positive observations to the total predicted positive observations. The question that this metric answer is of all passengers that labeled as survived, how many actually survived? High precision relates to the low false positive rate. We have got 0.788 precision which is pretty good.

Precision = TP/TP+FP

Recall (Sensitivity) - Recall is the ratio of correctly predicted positive observations to the all observations in actual class - yes. The question recall answers is: Of all the passengers that truly survived, how many did we label? We have got recall of 0.631 which is good for this model as it’s above 0.5.

Recall = TP/TP+FN

F1 score - F1 Score is the weighted average of Precision and Recall. Therefore, this score takes both false positives and false negatives into account. Intuitively it is not as easy to understand as accuracy, but F1 is usually more useful than accuracy, especially if you have an uneven class distribution. Accuracy works best if false positives and false negatives have similar cost. If the cost of false positives and false negatives are very different, it’s better to look at both Precision and Recall. In our case, F1 score is 0.701.

F1 Score = 2*(Recall * Precision) / (Recall + Precision)

So, whenever you build a model, this article should help you to figure out what these parameters mean and how good your model has performed.

![x](https://i.imgur.com/3nZ7c1Q.png)
