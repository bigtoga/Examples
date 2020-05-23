[Source for most of this](http://arogozhnikov.github.io/2016/09/10/jupyter-features.html)\
[Another great resource I used](https://blog.dominodatalab.com/lesser-known-ways-of-using-notebooks/)
[Documentation on python magic commands](https://ipython.readthedocs.io/en/stable/interactive/magics.html)

# Python has lots of magic built in
* Magic commands - multiple syntaxes
* Magic methods / functions

# My favorites
###Timing
`%time` - times whatever you have

`%timeit` - runs timer over next single line of code. Can automatically run multiple iterations and provide aggregates at end

`%timeit numpy.random.normal(size=100)` - 
The slowest run took 13.85 times longer than the fastest. This could mean that an intermediate result is being cached.
100000 loops, best of 3: 6.35 µs per loop

`%%timeit` - Same as `%timeit` but for the entire cell in a jupyter notebook

### Passing data between notebooks 
`%env` - environment variables mgmt. Scope of environment variable is all notebooks running on the jupyter server
* `%env` # no arguments = "list all environment variables in play"
* `%env NUM_PROCESSES = 2` # creates new variable

```python
data = 'this is the string I want to pass to different notebook'
%store data
del data # deleted variable
Stored 'data' (str)
```

```python
# in second notebook I will use:
%store -r data
print data
```

```shell
this is the string I want to pass to different notebook
```

```python
# %who allows you to see global variables
%who str # lists all global string variables
```


### Re-using code from other scripts and notebooks 
Can execute .py files or jupyter notebooks
```python
# this will execute all the code cells from a different notebook
%run ./DatabricksPrep.ipynb

%run app.py
```

Load a script into the current cell
```python
%load http://matplotlib.org/mpl_examples/pylab_examples/contour_demo.py
```

### Suppressing output 
**Semi-colon is an instruction to suppress last line output**
It works w native python but some libraries do not honor

```python
x = 1 + 1
x; # Output suppressed 
```

%matplotlib inline\
from matplotlib import pyplot as plt\
import numpy\
x = numpy.linspace(0, 1, 1000)**1.5\
plt.hist(x); # Output not suppressed w/ semicolon

### Running shell commands
You can run any shell command by preforming it with !
* !pip install numpy
* !pip list | grep Theano

### Charting and plotting

%matplotlib inline \# to show matplotlib plots inline the notebook.

### Misc
%pastebin 'file.py' to upload code to pastebin and get the url returned.

%bash to run cell with bash in a subprocess.

%%latex to render cell contents as LaTeX (math)

%%HTML - renders cell as HTML

### View source code of method

from sklearn.cross_validation import train_test_split

Show the sources of train_test_split function in the pop-up window\
train_test_split??

\# you can use ? to get details about magics\
%pycat?

\# View source code of a file w pycat\
%pycat pythoncode.py

### Saving python scripts
~~~
# Will save cell code as pythoncode.py
%%writefile pythoncode.py

import numpy
~~~

Reset all variables with `%reset_all`
def append_if_not_exists(arr, x):
    if x not in arr:
        arr.append(x)
        
def some_useless_slow_function():
    arr = list()
    for i in range(10000):
        x = numpy.random.randint(0, 10000)
        append_if_not_exists(arr, x)
~~~


# Help available
* %lsmagic - lists all magic commands and functions available 
* %magic - another list w specific examples
* %timeit? - help about a specific magic command



