Stairstep is clear indication of overfitting

Jagged, stairsteps = overfit

![x](https://i.imgur.com/s8xsi75.png)

# Regularization to Avoid Overfitting
* [Good article on using regularization to  avoid overfitting](https://link.medium.com/qPih7oqUL6)
* [Another discussion of Regularization](https://link.medium.com/Syqws3pVL6)

## Key Takeaways 
* Models with overfitting will have a low **accuracy** because the model is trying too hard to capture the noise in your dataset (i.e. you included data points that don’t really matter in the dataset)
* **Regularization** is a form of regression that penalizes complexity in models in favor of simpler, more interpretable models
   - Ridge regression will penalize by reducing the coefficients to non-zero
   - Lasso regression will penalize coefficients by reducing them to zero this resulting in a sparser, more explainable model than Ridge regression 
* Same concept in neural networks is called **shrinkage methods** or **weight decay**
* Regularization works by decreasing the variance in the model without substantially increasingly its bias

# Do’s and Don’t’s to Prevent Overfitting
```diff
- Include as many features as possible  in your model
+ Use Feature Importance or PCA to reduce the number of redundant and irrelevant features

- Include “all the rows”
+ Work to reduce rows. If you find during EDA that a feature has 3 values and 1 value represents 99% of the data, investigate if you can (a) remove rows in the 1%, and (b), if so, remove those rows then drop the feature entirely 

- Deploy your model after creating for the first time
+ Use cross validation since it is the #1 way to identify overfitting

- Reduce the dataset to a very small number of rows to speed up training and deployment
+ By increasing the number of rows in the dataset, you reduce overfitting by allowing the model to have more opportunities to train/test on more observations 

``` 


