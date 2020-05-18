# Basics of Artificial Neural Networks (ANNs)
* vaguely inspired by the biological neural networks that constitute animal brains (aka biomimicry). Such systems “learn” to perform tasks by considering examples, generally without being programmed with task-specific rule
* Example using *image recognition*: they might learn to identify images that contain cats by analyzing example images that have been manually labeled as “cat” or “no cat” and using the results to identify cats in other images. They do this without any prior knowledge of cats, for example, that they have fur, tails, whiskers and cat-like faces. Instead, they automatically generate identifying characteristics from the examples that they process.

ANNs uses a network of connected **neurons** in three layers:
* The **Input layer** (1)
* The **Hidden layer(s) (*n*)
* The **Output layer** (1)

![?](https://i.imgur.com/opIpo9k_d.jpg?maxwidth=640&shape=thumb&fidelity=medium)

## The Input layer
Each node represents a **feature** passed into the ANN. There is one node for each feature you pass I.  

## The Hidden layers
Hidden layers do all the processing. Rule of thumb: the more hidden layers you have, the more accurate the model will be to a point. Too many layers and you may overfit. 

Each hidden layer receives input from the prior layer, then multiplies that by its own **weights** and **bias**. 

## The Output layer
Your final target output is here

ANNs use **forward propagation** (a.k.a. feed forward)

### Weights, Biases, and Cost
Generally speaking, hidden layer nodes start with random weights and random biases. These random values get changed over time as the node iterates through the data, each time learning more and more. These weights and biases get updated by the node calculating the amount of error it currently has. If a certain change in weight results in fewer errors, that value becomes the new weight, and same for bias. 

The above is the **cost** of the neural network and it is calculated by:
1. Find the difference between the network’s prediction and the desired result 
2. Find the sum of those values’ squares `(target - output)<sup>2</sup>

The total cost of the NN is the sum of all of the hidden layers’ nodes. 

### Training our model 
The entire point of training your model is to minimize cost. NNs actually use **backpropagation** (the opposite of feedForward) where they start with the output layer, feed that into the hidden layers, and determine the optimal weights amd biases  

# Three Categories of Artificial Neural Networks (ANNs)
[Wikipedia on Artificial Neural Networks (ANN)](https://en.wikipedia.org/wiki/Artificial_neural_network) and 
[Wikipedia on Neural Networks](https://en.wikipedia.org/wiki/Neural_network):
* Function approximation, or regression analysis, including time series prediction and modeling
* Classification, including pattern and sequence recognition, image recognition, novelty detection and sequential decision making.
* Data processing, including filtering, clustering, blind signal separation and compression

# Common Use Cases for NNs
* nonlinear system identification and control (vehicle control, process control)
* game-playing and decision making (backgammon, chess, racing)
* pattern recognition (radar systems, face identification, object recognition)
* sequence recognition (gesture, speech, handwritten text recognition)
* medical diagnosis
* financial applications
* data mining (or knowledge discovery in databases, “KDD”) and visualization
* e-mail spam filtering

Image courtesy of Wikipedia: 

![?](https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Colored_neural_network.svg/1024px-Colored_neural_network.svg.png)

# Recurrent Neural Networks (RNN)
**Definition** - RNNs can be thought of as multiple copies of the same network, each passing a message to a successor

### Typical Use Cases
Anywhere where previous information would be required/useful to understand current information - speech recognition, translation, image captioning, interpreting a video feed, etc. Because RNNs can potentially use previous info to understand the context of what the currently information is, they are useful for many problems

### Deep Dive: language model predicting the next word someone will type
RNNs are perfect for this use case. When a user types in “The clouds in the sky are”, the model can easily select “blue”. This works well up to a point, and that point is “The longer it has been since the relevant info was typed in, the less useful the model will be in predicting.”

“She was born in France in the summer of 1997. She grew up speaking...”

We know it’s *French* but RNN has a challenge retaining the key value “France” for such a long period and thus may not accurately predict. Your model will know that it should predict “a language” here, but it may not be able to know which language is best. 

“France” in the above is a **dependency** in RNN speak. The larger the gap between the dependency and the prediction, the less likely RNN will work for you. 

Note that all Deep networks suffer from exactly the same problems as recurrent networks applied to long sequences: namely that information from past computations rapidly attenuates as it progresses through the chain – a.k.a. the `vanishing gradient problem` - made worse by the fact that each subsequent layer cannot dynamically select or ignore its inputs. 

## LTSM (Long Term Short Memory)
LTSM is a form of RNN meant specifically to address the primary dependency problem with RNNs. Widely used today - high likelihood that, if you find a project using “prior context” to predict, it is using LTSM or one of it’s variants. 

LTSM uses the same basic flow as RNN but passes “cell state” to each node, along with using 3 “gates” to tell future nodes which values to keep/discard. 

“She was born in France in the summer of 1997. She grew up speaking...”
- Node A1: keep “she” as we can use this to predict future pronouns 
- Node A2: keep “summer” as we can use to predict month, activity, or temperature
- Node A3: Discard “in the”
- Node A4: Keep “France” as we can use this to predict language, city, region

LTSM networks are RNNs equipped with a special gating mechanism that controls access to memory cells. These gates  prevent the rest of the network from modifying the contents of the memory cells for multiple time steps (aka preserving prior context/data for a long period). This means that LSTM networks preserve signal and propagate errors for much longer than ordinary RNNs. 

LSTM networks are very good at processing data with complex and separated interdependencies and to excel in a range of **sequence learning domains** such as speech recognition, offline hand-writing recognition, machine translation, and image-to-caption generation. 

### Use Cases for LTSM
* speech recognition
* offline hand-writing recognition
* machine translation
* image-to-caption generation

### Variations on LTSM
#### Grid LTSM (*N*-LTSM)
Proposed 2015 in [this paper](https://arxiv.org/pdf/1507.01526v1.pdf)

> ... a network of LSTM cells arranged in a multidimensional grid that can be applied to vectors, sequences or higher dimensional data such as images. The network differs from existing deep LSTM architectures in that the cells are connected between network layers as well as along the spatiotemporal dimensions of the data. 
> It therefore provides a unified way of using LSTM for both deep and sequential computation. We apply the model to algorithmic tasks such as integer addition and determining the parity of random binary vectors. It is able to solve these problems for 15-digit integers and 250-bit vectors respectively. We then give results for three empirical tasks. 
> We find that 2D Grid LSTM achieves 1.47 bits per character on the `Wikipedia character prediction benchmark`, which is state-of-the-art among neural approaches. We also observe that a two-dimensional translation model based on Grid LSTM outperforms a phrase-based reference system on a Chinese-to-English translation task, and that 3D Grid LSTM yields a near state-of-the-art error rate of 0.32% on MNIST. 

#### Gated Recurrent Unit (GRU)
A bit simpler than LTSM and is becoming popular 

#### Depth Gated RNNs
Todo

http://colah.github.io/posts/2015-08-Understanding-LSTMs/


## Clockwork RNNs
Todo