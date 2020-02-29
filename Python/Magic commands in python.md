[Documentation on python magic commands](https://ipython.readthedocs.io/en/stable/interactive/magics.html)

# Python has lots of magic built in
* Magic commands 
* Magic methods / functions

# My favorites 
%timeit - runs timer over next single line of code. Can automatically run multiple iterations and provide aggregates at end

%%timeit - Same as %timeit but for the entire cell in a jupyter notebook

%env - environment variables mgmt. Scope of environment variable is all notebooks running on the jupyter server
* %env # no arguments = "list all environment variables in play"
* %env NUM_PROCESSES = 2 # creates new variable

# Help available
* %lsmagic - lists all magic commands and functions available 
* %magic - another list w specific examples
* %timeit? - help about a specific magic command



