# FAQs about t-tests
**What is it?** A test that determines whether two independent samples of a population are statistically related or statistically different 

**Why do I care?** For machine learning, if your holdout/unseen data is statistically different than your training data, your model will be unlikely to produce accurate predictions. So you need to know that your training data (a.k.a. your 70% sample of your population in a 70/30 train test split) is statistically related to the sample

**Does it require a normal distribution?** No, as long as you understand The Law of Large Numbers and the Central Limit Theorem. Great examples are [here](https://link.medium.com/PNjAkYvlt7)

**Is there a minimum sample size?** Generally, yes. `n=30 or 40` would be minimum but “It depends”

**Why do you talk about The Law of Large Numbers and the Central Limit Theorem below?** Mostly for background and ensuring a through understanding of:
- Why 70/30 or 60/20/20 are commonly used for train/test and train/test/holdout splits 
- Why small sample sizes will ultimately not work

> The t-test is almost sacred in its importance and widespread use - https://link.medium.com/HPIwvzmgt7

# Basic logic of a t-test:
- Create *n* samples of a population 
- Calculate the mean of each
- Use a t-test to see if any samples are statistically different 

# The Law of Large Numbers

tl;dr - for train/test data sizes, be wary of small samples as you are more and more likely to get inaccurate results with small samples than with large samples 

[Jason explains it well](https://machinelearningmastery.com/a-gentle-introduction-to-the-law-of-large-numbers-in-machine-learning/)
- Intuitively we think “more is better” when it comes to data
- Intuitively we think that having more training data = better results in the long run
- The Law of Large Numbers says “You’re right!”

**Observation**: Result from one trial of an experiment.

**Sample**: Group of results gathered from separate independent trials.

**Population**: Space of all possible observations that could be seen from a trial.

> Using these terms from statistics, we can say that **as the size of the sample increases, the mean value of the sample will better approximate the mean or expected value in the population**. As the sample size goes to infinity, the sample mean will converge to the population mean.

> … a crowning achievement in probability, the law of large numbers. This theorem says that the mean of a large sample is close to the mean of the distribution. — Page 76, All of Statistics: A Concise Course in Statistical Inference, 2004.

## Independent and Identically Distributed

It is important to be clear that the observations in the sample must be *independent*.

This means that the trial is run in an identical manner and does not depend on the results of any other trial. This is often reasonable and easy to achieve in computers.

In statistics, this expectation is called **independent and identically distributed** or **IID, iid, or i.i.d.**. This is to ensure that the samples are indeed drawn from the same underlying population distribution.

## Regression to the mean

Population: 100,000 observations 
Mean of population: 4.567
- If you take a sample `n=5`, would you expect the mean of the sample to be close to the mean of the population? It might equal it but more than likely it will be wildly different 
- If you take a sample `n=500`, would you expect the mean of this sample to be closer than the `n=5` mean? Yes
- If you take a sample `n=98,000`, would you expect the mean to be close to the mean of the population? Yes, you’d likely guess it was almost identical 

That’s the law of large numbers and shows a regression to the mean as your sample size increases. 

## Code example
[Explanation of PDF here](https://link.medium.com/JAZxyyfkt7)

```python   
# idealized population distribution
from numpy import arange
from matplotlib import pyplot
from scipy.stats import norm

# x-axis for the plot
xaxis = arange(30, 70, 1)

Xmean = np.mean(xaxis) 
print(Xmean) # 50

# y-axis for the plot
# https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.norm.html
# Create a continuous variable using probability density function (pdf)
# pdf(): “50” is the mean of xaxis variable, and “5” is the standard deviation 
yaxis = norm.pdf(xaxis, Xmean, 5)

# plot ideal population
pyplot.plot(xaxis, yaxis)
pyplot.show()
``` 

![?](https://i.imgur.com/WIayuMo.png)

Now let’s take random IDD samples:
```python   
from numpy.random import seed
from numpy.random import randn
from numpy import mean
from numpy import array
from matplotlib import pyplot

# seed the random number generator
seed(1)

# sample sizes
sizes = [10, 100, 500, 1000, 10000]

# generate samples of different sizes and calculate their means
means = [mean(5 * randn(size) + 50) for size in sizes]

print(means)
```
>>> [49.5142955459695, 50.371593294898695, 50.2919653390298, 50.1521157689338, 50.03955033528776]

Just as suspected, the larger the sample size, the closer the sample’s mean is to the population’s mean of 50.

You also see the errors decrease as the sample size increases 
```python   
# plot sample mean error vs sample size
pyplot.scatter(sizes, array(means)-50)
pyplot.show()
``` 

The sample size of 10 has the largest error of 0.4. The sample of 100 has the next highest at 0.3, and so on. 

# The Central Limit Theorem (CLT)

Many statistical tests assume/require a normalized distribution, yet many (most?) datasets are not normalized. CLT says that, once your population “is of a certain size”, any random sample will be representative. CLT works alongside the Law of Large Numbers. 

https://en.wikipedia.org/wiki/Central_limit_theorem

> By the **central limit theorem**, sample means of moderately large samples are often well-approximated by a normal distribution even if the data are not normally distributed. For non-normal data, the distribution of the sample variance may deviate substantially from a χ2 distribution. However, if the sample size is large, **Slutsky’s theorem** implies that the distribution of the sample variance has little effect on the distribution of the test statistic. - [Wikipedia](https://en.wikipedia.org/wiki/Student%27s_t-test)