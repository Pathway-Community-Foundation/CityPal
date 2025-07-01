# filter_beatties_crashes.py

import pandas as pd

# Approximate bounding box for Beatties Ford Rd corridor
lat_min, lat_max = 35.23, 35.30
lon_min, lon_max = -80.88, -80.84

# Load your crash CSV
df = pd.read_csv("Fatal & Serious Injury Crashes (2020-Present).csv")  # Update to your actual filename

# Filter crashes within Beatties Ford corridor
df_beatties = df[
    (df['LATITUDE'].between(lat_min, lat_max)) &
    (df['LONGITUDE'].between(lon_min, lon_max))
]

# Save the filtered data
df_beatties.to_csv("BeattiesFord_Crashes.csv", index=False)

print(f"✅ Filtered {len(df_beatties)} crashes within Beatties Ford corridor.")
