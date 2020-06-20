What: a test that determines whether two independent samples of a population are statistically related / different 

Why: if your test data is statistically different than your training data, your model will be unlikely to produce accurate predictions 

> The t-test is almost sacred in its importance and widespread use - https://link.medium.com/HPIwvzmgt7

# Basic logic of a t-test:
- Create *n* samples of a population 
- Calculate the mean of each
- Use a t-test to see if any samples are statistically different 

# The Central Limit Theorem


> By the **central limit theorem**, sample means of moderately large samples are often well-approximated by a normal distribution even if the data are not normally distributed. For non-normal data, the distribution of the sample variance may deviate substantially from a χ2 distribution. However, if the sample size is large, **Slutsky’s theorem** implies that the distribution of the sample variance has little effect on the distribution of the test statistic. - [Wikipedia](https://en.wikipedia.org/wiki/Student%27s_t-test)