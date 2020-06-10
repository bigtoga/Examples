# What is Machine Learning?
Two definitions of Machine Learning are offered. Arthur Samuel described it as: "the field of study that gives computers the ability to learn without being explicitly programmed." This is an older, informal definition.

Tom Mitchell provides a more modern definition: "A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E."

Example: playing checkers
- E = the experience of playing many games of checkers
- T = the task of playing checkers
- P = the probability that the program will win the next game

In general, any machine learning problem can be assigned to one of two broad classifications:

Supervised learning and Unsupervised learning.

# Four types of Machine Learning
1. Supervised
1. Unsupervised
1. Reinforcement Learning
1. Recommender systems

## Supervised Learning
In supervised learning, we are given a data set and already know what our correct output should look like (i.e. label or target variable), having the idea that there is a relationship between the input and the output.

Supervised learning problems are categorized into "regression" and "classification" problems. 
- In a regression problem, we are trying to predict results within a continuous output, meaning that we are trying to map input variables to some continuous function. 
- In a classification problem, we are instead trying to predict results in a discrete output. In other words, we are trying to map input variables into discrete categories

## Unsupervised Learning
Common uses:
1. Organize computing clusters
1. Social network analysis
1. Market segmentation
1. Astronomical data analysis
1. Voice analysis / breaking up / segmenting different signals in the audio into separate tracks
  - Andrew showed examples of using [Octave unsupervised machine learning algorithm](https://mc.ai/machine-learning-in-matlab-octave/), part of MatLAB
  
> It turns out the Silicon Valley, for a lot of machine learning algorithms, what we do is first **prototype our software in Octave because software in Octave makes it incredibly fast to implement these learning algorithms.** 

> **SVD function that stands for singular value decomposition**; but that turns out to be a linear algebra routine, that is just built into Octave.

> What I've seen after having taught machine learning for almost a decade now, is that, **you learn much faster if you use Octave as your programming environment**, and if you use Octave as your learning tool and as your prototyping tool, it'll let you learn and prototype learning algorithms much more quickly.



