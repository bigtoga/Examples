~~~ 
import warnings
warnings.filterwarnings('ignore')

%matplotlib inline
from matplotlib import pyplot as plt
import numpy as np
import scipy.stats as stats

# Generate some fake data to test with
def gendata(loc=0):
    population = stats.norm.rvs(size=1000, random_state=42)
    sample = stats.norm.rvs(loc=loc, size=200, random_state=42)

    # Scatter Plot of Data
    plt.subplot(2, 1, 1)
    plt.scatter(range(len(population)), population, label="population")
    plt.scatter(range(len(sample)), sample, label="sample")
    plt.legend()

    # Histogram Plot of Data
    plt.subplot(2, 1, 2)
    plt.hist(population, 20, density=True, alpha=0.7, label="population")
    plt.hist(sample, 20, density=True, alpha=0.7, label="sample")
    plt.axvline(population.mean(), color='k', linestyle='dashed', linewidth=1)
    plt.axvline(sample.mean(), color='k', linestyle='dashed', linewidth=1)
    plt.legend()  
    
    return population, sample
    
# Generate some data and show the scatter plot
population, sample = gendata()

# Run a one sample t-test:
stats.ttest_1samp(sample, population.mean()) 

# Output:
Ttest_1sampResult(statistic=-0.912976906342992, pvalue=0.36235943886051503)

# Generate data with a bigger difference in means
population, sample = gendata(loc=-2)
