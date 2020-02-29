[Documentation on python magic commands](https://ipython.readthedocs.io/en/stable/interactive/magics.html)

# Python has lots of magic built in
* Magic commands - multiple syntaxes
* Magic methods / functions

# My favorites 
%timeit - runs timer over next single line of code. Can automatically run multiple iterations and provide aggregates at end

%%timeit - Same as %timeit but for the entire cell in a jupyter notebook

%env - environment variables mgmt. Scope of environment variable is all notebooks running on the jupyter server
* %env # no arguments = "list all environment variables in play"
* %env NUM_PROCESSES = 2 # creates new variable

### Re-using code from other scripts and notebooks 
Can execute.py files or jupyter notebooks\
\# this will execute all the code cells from different notebooks\
%run ./2015-09-29-NumpyTipsAndTricks1.ipynb

### Suppressing output 
**Semi-colon is an instruction to suppress last line output**
It works w native python but some libraries do not honor

x = 1 + 1\
x; # Output suppressed 

%matplotlib inline\
from matplotlib import pyplot as plt\
import numpy\
x = numpy.linspace(0, 1, 1000)**1.5\
plt.hist(x); # Output not suppressed w/ semicolon

### Running shell commands
You can run any shell command by preforming it with !
* !pip install numpy
* !pip list | grep Theano

### View source code of method

from sklearn.cross_validation import train_test_split

Show the sources of train_test_split function in the pop-up window\
train_test_split??

\# you can use ? to get details about magics\
%pycat?


# Help available
* %lsmagic - lists all magic commands and functions available 
* %magic - another list w specific examples
* %timeit? - help about a specific magic command



