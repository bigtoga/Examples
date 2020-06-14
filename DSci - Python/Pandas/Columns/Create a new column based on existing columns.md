Use `assign` to create a new column `fan_ppg` using a formula:

```python   

season_tot_df = season_tot_df.assign(
    fan_ppg=(
        (season_tot_df.points+
         (season_tot_df.offensive_rebounds+season_tot_df.defensive_rebounds)*1.2+
         season_tot_df.assists*1.5+season_tot_df[‘blocks’]*2+season_tot_df.steals*2-season_tot_df.turnovers)
        /season_tot_df.games_played
    )
)
```
