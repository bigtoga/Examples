Git bash:

~~~
# List all packages and version
pip list

# Update all packages
pip freeze --local | grep -v '^\-e' | cut -d = -f 1  | xargs -n1 pip install -U
~~~

To copy/paste into Git Bash, copy the text, and then hit the "Insert" key on your keyboard
