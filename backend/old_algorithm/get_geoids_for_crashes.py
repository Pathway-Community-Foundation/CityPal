# get_geoids_for_crashes.py

import pandas as pd
import requests
import time

# Load crash data
df = pd.read_csv("BeattiesFord_ModelInput_With311.csv")

# Prepare output
geoids = []

for i, row in df.iterrows():
    lat, lon = row["LATITUDE"], row["LONGITUDE"]
    url = (
        f"https://geocoding.geo.census.gov/geocoder/geographies/coordinates"
        f"?x={lon}&y={lat}&benchmark=Public_AR_Current&vintage=Current_Current&format=json"
    )

    try:
        response = requests.get(url)
        data = response.json()
        geoid = data["result"]["geographies"]["Census Blocks"][0]["GEOID"]
        geoids.append(geoid)
    except Exception as e:
        print(f"❌ Failed for row {i} - lat: {lat}, lon: {lon}: {e}")
        geoids.append(None)

    time.sleep(0.5)  # Pause to avoid rate-limiting

# Add to dataframe
df["GEOID10"] = geoids

# Save updated data
df.to_csv("BeattiesFord_WithGEOID.csv", index=False)

print("✅ GEOID10s added to crash dataset.")
