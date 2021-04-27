# dabl’s Goals and Roadmap
From the bottom [of this page](https://amueller.github.io/dabl/dev/user_guide.html)

dabl aims to provide easy-to-use, turn-key solutions for supervised machine learning that strongly encourage iterative and interactive model building. Key ingedients to achieve this are:
- Ready-made visualizations
- Model diagnostics
- Efficient model search
- Type detection
- Automatic preprocessing
- Portfolios of well-performing pipelines

The current version of dabl only provides very simple implementations of these, but the goal is for dabl to contain more advanced solutions while providing a simple user interface and strong anytime performance. (*June 2020*)

—- 
From Andrew Mueller, author of scikit-learn, auto-sklearn, and dabl:

> dabl... has a best-guess philosophy: it tries to do something sensible, and then provides tools for the user to inspect and evaluate the results to judge them... dabl... tries to enable the user to quickly iterate and get a grasp on the properties of the data at hand and the fitted models - https://amueller.github.io/dabl/dev/user_guide.html

# Where you can use dabl
1. Data Cleaning
2. EDA
3. Initial Model Building
4. Enhanced Model Building 
5. Explainable Model Building

## 1. Data Cleaning
dabl tries to detect the types of your data and apply appropriate conversions. It also tries to detect potential data quality issues. *The goal of dabl is to get the data “clean enough” to create useful visualizations and models*, and to allow users to perform custom cleaning operations themselves. 

## 2. EDA
For low dimensional datasets, all features are shown; for high dimensional datasets, only the most informative features for the given task are shown. This is clearly not guaranteed to surface all interesting aspects with the data, or to find all data quality issues. However, it will give you a quick insight in to what are the important features, their interactions, and how hard the problem might be. It also allows a good assessment of whether there is any data leakage through spurious representations of the target in the data.

## 3. Initial Model Building
The SimpleClassifier first tries several baseline and instantaneous models, potentially on subsampled data, to get an idea of what a low baseline should be. This again is a good place to surface data leakage, as well as find the main discriminative features in the dataset. The SimpleClassifier allows specifying data in the scikit-learn-style fit(X, y) with a 1d y and features X, or with X being a dataframe and specifying the target column inside of X as target_col.

The SimpleClassifier also performs preprocessing such as missing value imputation and one-hot encoding. You can inspect the model using:

```dabl.explain(ec)```

## 4. Enhanced Model Building
```python   
ac = AnyClassifier().fit(data, target_col=“income”) # not implemented yet
``` 
After creating an initial model, it’s interesting to explore more powerful models such as tree ensembles. **AnyClassifier searches over a space of models that commonly perform well, and identifies promising candidates. ** If your goal is prediction, AnyClassifier can provide a strong baseline for further investigation. 

## 5. Explainable Model Building
To do as of 2020

Sometimes, explainability of a model can be more important than performance. A complex model can serve as a good benchmark on what is achievable on a certain dataset. After this benchmark is established, it is interesting to see if we can build a model that is interpretable while still providing competitive performance.

xc = ExplainableClassifier().fit(data, target_col=“income”)

