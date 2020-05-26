pip install a specific branch - lots of options:

```python
# Slowest way:
pip install git+https://github.com/pycaret/pycaret/tree/dev-1.0.1

pip3 install git+https://github.com/pycaret/pycaret.git@dev-1.0.1

# Faster
pip install https://github.com/pycaret/pycaret/archive/dev-1.0.1.zip

# Bitbucket is about the same
pip install https://bitbucket.org/izi/django-admin-tools/get/default.zip

# If you have a private repo, can use ssh:
pip install git+ssh://git@github.com/myuser/foo.git@my_version

```
