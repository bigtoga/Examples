For Windows - 

# Step 1 - gather information about conda, python
```python
# What version of conda are you on?
conda info
conda --version

# Update conda if needed
conda update conda

# List your installed versions of python
where python

# Show currently running python version
python --version

# Show possible version numbers that you can create an environment from
conda search "^python$"
```

# Creating, listing, saving environments
Full list of arguments to `conda create`: https://docs.conda.io/projects/conda/en/latest/commands/create.html#Named%20Arguments
```python
# Create the environment from the Anaconda command prompt - display progress but do not ask Y/N to install
conda create --name py37 python=3.7 --verbose --yes

# Create a new environment and install the "biopython" package
conda create --name bio-env biopython

# Activate the environment
activate py37

# Deactivate the current environment
deactivate

# List the active environments
conda env list

# List the changes to the current environment
conda list --revisions

# Revert a change
conda install --revision 2

# Save environment to a file
conda list --explicit > bio-env.txt

# Create environment from a file
conda env create --file bio-env.txt

# Delete an environment and everything in it
conda env remove --name bio-env

```

# Installing, uninstalling, updating packages
```python
# Install packages directly from Anaconda repository
conda install jupyter

conda update scikit-learn

# Uninstall multiple packages
conda remove --name bio-env toolz boltons

# Install packages from PyPi
pip install boltons

```
