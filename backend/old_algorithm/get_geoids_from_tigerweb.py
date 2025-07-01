import pandas as pd
import requests
import time

df = pd.read_csv("BeattiesFord_ModelInput_With311.csv")

geoids = []

for i, row in df.iterrows():
    lat, lon = row["LATITUDE"], row["LONGITUDE"]
    url = f"https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/Tracts_Blocks/MapServer/2/query?f=json&geometry={lon},{lat}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=GEOID"

    try:
        r = requests.get(url)
        data = r.json()
        geoid = data["features"][0]["attributes"]["GEOID"]
        geoids.append(geoid)
    except:
        geoids.append(None)
        print(f"❌ Failed at row {i} for lat={lat}, lon={lon}")
    
    time.sleep(0.2)  # Stay under the limit

df["GEOID10"] = geoids
df.to_csv("BeattiesFord_WithGEOID.csv", index=False)

print("✅ TIGERWeb GEOID10s appended.")
