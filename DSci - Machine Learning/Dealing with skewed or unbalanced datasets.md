Let's take a classification problem and work through it to show (a) the problems/challenges a "skewed" or "unbalanced" dataset cause, and (b) how to work around it. 

## Scenario: Given a dataset of mortgage data, we want to predict whether a loan will default or not
Using the Fannie Mae mortgage data for single-family homes, "the average person" thinks the steps would be easy:
## Step 1: ETL & EDA - Download dataset from Fannie Mae, rip out "bad data", define assumptions, filter dataset
```python
# Remove dupes
# May be faster to use a python datatable vs. Pandas: https://towardsdatascience.com/speed-up-your-data-analysis-with-pythons-datatable-package-56e071a909e9
dt.unique(dfPerf[:, "LoanID"]).head(5)

# Remove all except for single-family homes:
propTypeFilter = ['SF']
df = df[df.propType.isin(propTypeFilter)]

# Remove any sales of muli-unit properties
numUnitsFilter = [1]
df = df[df.numUnits.isin(numUnitsFilter)]

# Remove any second homes, investor properties, or unknown
occTypeFilter = ['P']
df = df[df.occType.isin(occTypeFilter)]

# Remove anything except loans that were anything except refinance?
loanPurpFilter = ['C','R','U']
df = df[df.loanPurp.isin(loanPurpFilter)]
df.shape

# origLoanTermFilter = [360]
df = df[df.origLoanTerm.isin(origLoanTermFilter)]
df.shape
```
## Step 2: Define target variable
   - In our case, target would be based off of the `zeroBalCode` column
   - We need to classify the zero balance codes as "Default" or "Closed successfully": 
        - Target result: new column, `loan_result`: "1" = "Default" and "0" = "Closed successfully"
We also have to understand the data and make decisions:
    - Decision 1: Data with a null/empty `zerBalCode` has not defaulted not closed - we choose to ignore it for now (i.e. don't build your test/train data on data that has no known "end". Only build train/test for rows that have a known outcome that is what you want to predict)

List of the zero balance codes from the [Fannie Mae User Guide](http://www.freddiemac.com/fmac-resources/research/pdf/user_guide.pdf) (page 17)
- 1 - "Prepaid or matured" (a.k.a. successful close of a loan)
- 2 - "Third party Sale"
- 3 - "Short-sale, Third Party Sale, Note Sale"
- 6 - "Repurchased" 
- 9 - "Deed-in-lieu or REO Disposition" (REO is a foreclosure)
- 15 - "Note sale/Reperforming sale"
- 16 - (Unknown - value is in the dataset but not the documentation)
    
Kip's notes have 16:
> The zeroBalCode is only populated once a loan either completes "successfully" (a value of 1 = Prepaid or Matured) or it does NOT complete successfully:

- 02 = Third Party Sale
- 03 = Short Sale (home sells for less than the balance remaining on their mortgage)
- 06 = Repurchased (Buyer stopped making payments and, by law, the original lender had to re-purchase the load. require a lender to repurchase a mortgage loan or an acquired property, or remit a make whole payment, as a result of a breach of the Lender Contract)
- 09 = Deed-in-Lieu, REO (Real Estate Owned - Fannie Mae owns the property after a foreclosure)
- 15 = Note Sale (A sale of the Non-Performing Mortgage Loan to a third party is a “Note Sale”)
- 16 = Reperforming (A reperforming loan is a mortgage that became delinquent because the borrower was behind on payments by at least 90 days, but it is "performing" again because the borrower has resumed making payments)

Other resources are:
* [Fannie Mae glossary](https://s3.amazonaws.com/dq-blog-files/lppub_glossary.pdf)
* [File layout for the Acquisition and Performance files](https://s3.amazonaws.com/dq-blog-files/lppub_file_layout.pdf)
* [User guide](http://www.freddiemac.com/fmac-resources/research/pdf/user_guide.pdf)

```python 
# valid zero balance codes:
closedSuccessfully = [1]
defaulted = [2, 3, 6, 9, 15, 16]
validCodes = zip(closedSuccessfully, defaulted)

# Remove rows that not have a zeroBalCode numeric value
# Note that this will drop a potentially large portion of the dataset depending on how recent the loans are
dfTarget = df[df['zerBalCode'].isin(validCodes)].copy()

# Alternatively could use df1 = df[df['zeroBalCode'].notnull()].copy()

```

Now that you have a solid test/train set, add your target:
```python
# Create a new column
dfTarget['loan_result'] = 0

# Populate it with "0" (Closed successfully) for original rows where code is "1"
dfTarget['loan_result'] = dfTarget.zeroBalCode.replace(1, 0)

# Populate it with "1" (Default) for the other codes
ddfTargetf1['loan_result'] = dfTarget.zeroBalCode.replace([2, 3, 6, 9, 15, 16], 1)
```

## Step 3: Encoding - label or one-hot?
How to decide? 
- Use one-hot encoding for any categorical features that have a low # of distinct values. Perfect for boolean categories (Yes/No), gender (Male, Female, Other) since these have limited values
    - One-hot encoding creates a new column for each distinct value in the categorical feature
- Use label encoding if you have a categorical feature with a large number of distinct values
    - Step 1: 

## Step 4: Feature Elimination
Strip out any features that are redundant, unnecessary, unrelated, highly correlated with another feature or set of features:
```python


```

## Step 4: Data Preprocessing
I always like the PyCaret documentation's way of explaining the remaining steps: 
1. Get the data
2. Setup the environment (for PyCaret specifically) - a.k.a. "Run setup()"
    - Choose your model type (regression, classification, clustering, anomaly detection, NLP, association rule mining)
    - Infer the data types
    - Tell it to exclude certain features you do not the model to include
    - Make decisions / pass parameters for:
        - Missing values imputation
        - Whether to use PCA and, if so, how (top 5 compents? top 25% components?)
        - Whether to drop low variance features
        - If classification, target encoding
        - 
3. 
