https://machinelearningmastery.com/develop-first-xgboost-model-python-scikit-learn/

Note: source for most of my understanding was from http://uc-r.github.io/gbm_regression

Supervised machine learning algorithms that are founded on a single predictive model:
* linear regression
* penalized models
* naive Bayes
* support vector machines

Supervised machine learning algos that are built around building an **sequential** ensemble of `models` where each individual model predits the outcome, and then the rest of the ensemble simply averages the predicted values (a.k.a. **ensembles**):
* bagging
* random forests
* gradient boosting 

# Boosting
The concept of "boosting" is simple - it's just a framework term that can be applied to anything. It almost always comes down to a decision tree at the base. A basic overview/workflow incolves "boosted trees that are grown sequentially with each tree using information from the previously grown trees". The basic algorithm for **boosted regression trees** can be generalized as "sequentially fitting regression trees to minimize the residuals" where *x* is our features and *y* is our response:
* Fit a decision tree to the data: *F<sup>1</sup>(x)=y*
* We then fit the next decision tree to the residuals of the previous: *h<sup>1</sup>(x)=y−F<sup>1</sup>(x)*
* Add this new tree to our algorithm: *F<sup>2</sup>(x) = F<sup>1</sup>(x) + h<sup>1</sup>(x)
* Fit the next decision tree to the residuals of h<sup>2</sup>(x) = y - F<sup>2</sup>(x)
* Add this new tree to our algorithm: F<sup>3</sup>(x) = F<sup>2</sup>(x) + h<sup>1</sup>(x)
* Continue this process until some mechanism (i.e. cross validation) tells us to stop.

It all comes together in the final model where is just a stagewise additive model of *b* individual regression trees:
![dx](https://i.imgur.com/1NiUxh7.png)

You can see how the first grown trees passed on their knowledge to the next generations (who then sequentially did the same) and that the model gets better over time:
![df](https://i.imgur.com/K8jJqxx.mp4)

Many algorithms, including decision trees, focus on minimizing the **residuals** and, therefore, emphasize the `MSE loss` function. The algorithm discussed in the previous section outlines the approach of sequentially fitting regression trees to minimize the errors. 

# Gradient descent
Gradient boosting minimizes the mean squared error (MSE) loss function. However, often we wish to focus on other loss functions such as mean absolute error (MAE) or to be able to apply the method to a classification problem with a loss function such as deviance. The name gradient boosting machines come from the fact that this procedure can be generalized to loss functions other than MSE.

**Gradient boosting is considered a gradient descent algorithm**. Gradient descent is a very generic optimization algorithm capable of finding optimal solutions to a wide range of problems. 

**The general idea of gradient descent is to tweak parameters iteratively in order to minimize a cost function**. 

## Example
Suppose you are a downhill skier racing your friend. A good strategy to beat your friend to the bottom is to take the path with the steepest slope. This is exactly what gradient descent does - it measures the local gradient of the loss (cost) function for a given set of parameters (Θ) and takes steps in the direction of the descending gradient. Once the gradient is zero, we have reached the minimum.

# Source: http://uc-r.github.io/gbm_regression
> Whereas random forests build an ensemble of deep independent trees, GBMs build an ensemble of shallow and weak successive trees with each tree learning and improving on the previous. When combined, these many weak successive trees produce a powerful “committee” that are often hard to beat with other algorithms

Advantages:
* Often provides predictive accuracy that cannot be beat.
* Lots of flexibility - can optimize on different loss functions and provides several hyperparameter tuning options that make the function fit very flexible.
* No data pre-processing required - often works great with categorical and numerical values as is.
* Handles missing data - imputation not required.

Disdvantages:
* GBMs will continue improving to minimize all errors. This can overemphasize outliers and cause overfitting. Must use cross-validation to neutralize.
* Computationally expensive - GBMs often require many trees (>1000) which can be time and memory exhaustive.
* The high flexibility results in many parameters that interact and influence heavily the behavior of the approach (number of iterations, tree depth, regularization parameters, etc.). This requires a large grid search during tuning.
* Less interpretable although this is easily addressed with various tools (variable importance, partial dependence plots, LIME, etc.).
