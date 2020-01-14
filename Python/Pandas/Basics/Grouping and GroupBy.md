# Setup
import pandas as pd
mouse_metadata = "data/Mouse_metadata.csv"
mouse_metadata = pd.read_csv(mouse_metadata)

# View the groups:
grp = "Drug Regimen"
merged.groupby(grp).groups.keys()
