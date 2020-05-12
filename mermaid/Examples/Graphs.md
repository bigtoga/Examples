2020-05: Github does not natively support mermaid but you can install the [Chrome extension to add mermaid to github](https://chrome.google.com/webstore/detail/github-%2B-mermaid/goiiopgdnkogdbjmncgedmgpoajilohe/related?hl=en)

https://mermaid-js.github.io/mermaid/#/flowchart?id=graph

https://mermaid-js.github.io/mermaid/#/examples

# Graphs
* TD or TB means top down or top to bottom
* LR means left to right

~~~
```mermaid
graph LR
   id
```
~~~
```mermaid
graph LR
   id
```
---

~~~
```mermaid
graph LR
    id1[A node with text] --> id2(A node with text) --> id3([A node w text])
```
~~~
```mermaid
graph LR
    id1[A node with text] --> id2(A node with text) --> id3([A node w text])
```
---

~~~
```mermaid
graph LR
    id1(A rounded node with text)
```
~~~
```mermaid
graph LR
    id1(A rounded node with text)
```
---

~~~
```mermaid

```
~~~
```mermaid

```
---

~~~
```mermaid

```
~~~
```mermaid

```
---

~~~
```mermaid
graph TB
    A & B--> C & D
```
~~~

```mermaid
graph TB
    A & B--> C & D
```



# Handshake:
```
::: mermaid
sequenceDiagram
    participant Alice
    participant Bob
    Alice ->> Bob: Hello Bob, how are you?
    Bob-->>John: How about you John?
    Bob--x Alice: I am good thanks!
    Bob-x John: I am good thanks!
    Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

    Bob-->Alice: Checking with John...
    Alice->John: Yes... John, how are you?
:::         
```
```mermaid
sequenceDiagram
    participant Alice
    participant Bob
    Alice ->> Bob: Hello Bob, how are you?
    Bob-->>John: How about you John?
    Bob--x Alice: I am good thanks!
    Bob-x John: I am good thanks!
    Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

    Bob-->Alice: Checking with John...
    Alice->John: Yes... John, how are you?
```      

# Complex flow
```
sequenceDiagram
    autonumber
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
```
```mermaid
sequenceDiagram
    autonumber
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
```


# Multiple flows
~~~
```mermaid
graph TB

  SubGraph1 --> SubGraph1Flow
  subgraph "SubGraph 1 Flow"
  SubGraph1Flow(SubNode 1)
  SubGraph1Flow -- Choice1 --> DoChoice1
  SubGraph1Flow -- Choice2 --> DoChoice2
  end

  subgraph "Main Graph"
  Node1[Node 1] --> Node2[Node 2]
  Node2 --> SubGraph1[Jump to SubGraph1]
  SubGraph1 --> FinalThing[Final Thing]
end
```
~~~

```mermaid
graph TB

  SubGraph1 --> SubGraph1Flow
  subgraph "SubGraph 1 Flow"
  SubGraph1Flow(SubNode 1)
  SubGraph1Flow -- Choice1 --> DoChoice1
  SubGraph1Flow -- Choice2 --> DoChoice2
  end

  subgraph "Main Graph"
  Node1[Node 1] --> Node2[Node 2]
  Node2 --> SubGraph1[Jump to SubGraph1]
  SubGraph1 --> FinalThing[Final Thing]
end
```
