# What is Machine Learning?
Two definitions of Machine Learning are offered. Arthur Samuel described it as: "the field of study that gives computers the ability to learn without being explicitly programmed." This is an older, informal definition.

Tom Mitchell provides a more modern definition: "A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E."

Example: playing checkers
- E = the experience of playing many games of checkers
- T = the task of playing checkers
- P = the probability that the program will win the next game

In general, any machine learning problem can be assigned to one of two broad classifications: Supervised learning and Unsupervised learning.

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

<details> <summary>Cost Functions & Intuiton (pt. 1) </summary>  

If we try to think of it in visual terms, our training data set is scattered on the x-y plane. We are trying to make a straight line (defined by *h<sub>&theta;</sub>(x)*) which passes through these scattered data points.

**Our objective is to get the best possible line. The best possible line will be such so that the *average squared vertical distances of the scattered points from the line will be the least***. 
- Ideally, the line should pass through all the points of our training data set. In such a case, the value of *J(&theta;<sub>0</sub>, &theta;<sub>1</sub>)*
will be 0. 
</details> 

<details> <summary>Contour plots and contour graphs</summary>  A
contour plot is a graph that contains many contour lines. A contour line of a two variable function has a constant value at all points of the same line. An example of such a graph is the one to the right below.

![?](https://i.imgur.com/LjYqHHX_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

Taking any color and going along the ‘circle’, one would expect to get the same value of the cost function. For example, the three green points found on the green line above have the same value for  *J(&theta;<sub>0</sub>, &theta;<sub>1</sub>)* and as a result, they are found along the same line. The circled x displays the value of the cost function for the graph on the left when *&theta;<sub>0</sub>* = 800 and *&theta;<sub>1</sub>* = -0.15. 

Taking another h(x) and plotting its contour plot, one gets the following graphs:

![?](https://i.imgur.com/6H30uK9_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

When  *&theta;<sub>0</sub>* = 360 and  *&theta;<sub>1</sub>* = 0, the value of *J(&theta;<sub>0</sub>, &theta;<sub>1</sub>)* in the contour plot gets closer to the center thus reducing the cost function error. Now giving our hypothesis function a slightly positive slope results in a better fit of the data.

![](https://i.imgur.com/dTWVTRp_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

The graph above minimizes the cost function as much as possible and consequently, the result of  *&theta;<sub>1</sub>* and  *&theta;<sub>0</sub>* tend to be around 0.12 and 250 respectively. Plotting those values on our graph to the right seems to put our point in the center of the inner most ‘circle’.

</details> 

Common copy and paste

*J(&theta;<sub>0</sub>, &theta;<sub>1</sub>)*

*&theta;<sub>0</sub>*

*&theta;<sub>1</sub>*
