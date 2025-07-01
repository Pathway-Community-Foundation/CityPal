# filter_beatties_hin.py

import pandas as pd

# Load the CSV file (update filename if needed)
df = pd.read_csv("High_Injury_Network.csv")

# Filter rows where 'Street' contains 'Beatties Ford' (case-insensitive)
df_beatties = df[df['Street'].str.contains("beatties", case=False, na=False)]

# Save filtered data to new file
df_beatties.to_csv("BeattiesFord_HIN.csv", index=False)

print(f"Filtered {len(df_beatties)} rows for Beatties Ford Road.")
