

# Recurrent Neural Networks (RNN)
**Definition** - RNNs can be thought of as multiple copies of the same network, each passing a message to a successor

### Typical Use Cases
Anywhere where previous information would be required/useful to understand current information - speech recognition, translation, image captioning, interpreting a video feed, etc. Because RNNs can potentially use previous info to understand the context of what the currently information is, they are useful for many problems

### Deep Dive: language model predicting the next word someone will type
RNNs are perfect for this use case. When a user types in “The clouds in the sky are”, the model can easily select “blue”. This works well up to a point, and that point is “The longer it has been since the relevant info was typed in, the less useful the model will be in predicting.”

“She was born in France in the summer of 1997. She grew up speaking...”

We know it’s *French* but RNN has a challenge retaining the key value “France” for such a long period and thus may not accurately predict. Your model will know that it should predict “a language” here, but it may not be able to know which language is best. 

“France” in the above is a **dependency** in RNN speak. The larger the gap between the dependency and the prediction, the less likely RNN will work for you. 

## LTSM (Long Term Short Memory)
LTSM is a form of RNN meant specifically to address the primary dependency problem with RNNs. Widely used today. 

LTSM uses the same basic flow as RNN but passes “cell state” to each node, along with using 3 “gates” to tell future nodes which values to keep/discard. 

“She was born in France in the summer of 1997. She grew up speaking...”
- Node A1: keep “she” as we can use this to predict future pronouns 
- Node A2: keep “summer” as we can use to predict month, activity, or temperature
- Node A3: Discard “in the”
- Node A4: Keep “France” as we can use this to predict language, city, region

### Variations on LTSM
#### Gated Recurrent Unit (GRU)
A bit simpler than LTSM and is becoming popular 

#### Depth Gated RNNs

http://colah.github.io/posts/2015-08-Understanding-LSTMs/


## Clockwork RNNs
Todo