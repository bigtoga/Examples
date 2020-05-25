Category: regression models only

Bias: the underlying assumptions of the model
* Bias is row or observation-dependent
* Adding more rows decreases bias

Variance: the change in prediction if a different dataset is tested against the model
* Variance is Feature-dependent 
* Adding more features increases variance

# It’s all about goodness of fit
During training, the model fits and trains as many data points as possible - and both “number of rows” and “number of features” matter. As the model includes new features, the *model complexity* changes from a basic linear to quadratic to polynomial (i.e. the model is becoming more complex as each additional feature is added). 

**Key takeaways**:
- the more features in your dataset, the more complex the model will be
- the more complex your model is, the higher the variance
- models resulting in high variance are overfit 

```diff
- Models with **high variance** (overfitted models) have high complexity and will focus too much on the training data and will not generalize well (i.e. it will perform poorly when new data is tested)
+ Models with **low variance** have lower complexity and will generalize/perform well with new data

- models with **high bias** (underfit models) will not have enough complexity and will over-generalize 
+ models with **low variance** have sufficient complexity to generalize well when presented with new data
``` 

# How do I know if I have a bias problem or a variance problem?
Bias problems show up by plotting the regularization parameter for the model 

Variance problems show up Pearson’s coefficient over the model

# How to fix a high variance problem
Reduce the complexity of the model by either:
* Reducing the features so that 
* Use a model that penalizes complexity (ridge or lasso regression for example)

# How to fix a high bias problem
Because bias is observation-dependent, you can reduce bias by adding more rows to your training dataset 

# Finally
Remember:
* Ridge regression penalizes features that add complexity but does not remove them (i.e. it reduces them to non-zero this they are still in the final model)
* Lasso regression also penalizes those same features but removes them by setting them to zero (a.k.a. Feature selection)

Regression == prediction 

Regression + Ridge == prediction + bias/variance trade off 

Regression + Lasso = prediction + bias variance trade off + feature selection