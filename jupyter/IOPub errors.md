https://stackoverflow.com/questions/43288550/iopub-data-rate-exceeded-in-jupyter-notebook-when-viewing-image

>> IOPub data rate exceeded. The notebook server will temporarily stop sending output to the client in order to avoid crashing it.

# Option 1: Restart jupyter notebook with a custom data rate
1. Stop jupyter notebook
2. Run `jupyter notebook --NotebookApp.iopub_data_rate_limit=1.0e10`

# Option 2: Permanently change the config of jupyter
1. Create a new jupyter_notebook_config.py file with all the defaults by running `$ jupyter notebook --generate-config`
2. Open the file and search for `c.NotebookApp.iopub_data_rate_limit`
3. Comment out the line `c.NotebookApp.iopub_data_rate_limit = 1000000` and change it to a higher default rate
