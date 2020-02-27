Git bash:

~~~
# List all packages and version
pip list

# Update all packages
pip freeze --local | grep -v '^\-e' | cut -d = -f 1  | xargs -n1 pip install -U

# Downgrade a package
pip uninstall pandas
pip install pandas==0.25.3
pip list

python3 -m pip install --upgrade pandas

~~~

To copy/paste into Git Bash, copy the text, and then hit the "Insert" key on your keyboard
