What: a test that determines whether two independent samples of a population are statistically related / different 

Why: if your test data is statistically different than your training data, your model will be unlikely to produce accurate predictions 

> The t-test is almost sacred in its importance and widespread use - https://link.medium.com/HPIwvzmgt7

# Basic logic of a t-test:
- Create *n* samples of a population 
- Calculate the mean of each
- Use a t-test to see if any samples are statistically different 

# The Law of Large Numbers
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

# The Central Limit Theorem (CLT)

Many statistical tests assume/require a normalized distribution, yet many (most?) datasets are not normalized. CLT says that, once your population “is of a certain size”, any random sample will be representative 



https://en.wikipedia.org/wiki/Central_limit_theorem

> By the **central limit theorem**, sample means of moderately large samples are often well-approximated by a normal distribution even if the data are not normally distributed. For non-normal data, the distribution of the sample variance may deviate substantially from a χ2 distribution. However, if the sample size is large, **Slutsky’s theorem** implies that the distribution of the sample variance has little effect on the distribution of the test statistic. - [Wikipedia](https://en.wikipedia.org/wiki/Student%27s_t-test)