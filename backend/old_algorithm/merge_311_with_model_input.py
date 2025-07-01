import pandas as pd
from sklearn.neighbors import BallTree
import numpy as np

# Load crash input data
df_model = pd.read_csv("BeattiesFord_ModelInput.csv")

# Load 311 data
df_311 = pd.read_csv("BeattiesFord_311.csv")

# Standardize column names
df_311.columns = [col.strip().upper() for col in df_311.columns]

# Drop rows where LATITUDE or LONGITUDE is the string "LATITUDE" (common CSV bug)
df_311 = df_311[~df_311["LATITUDE"].astype(str).str.upper().eq("LATITUDE")]
df_311 = df_311[~df_311["LONGITUDE"].astype(str).str.upper().eq("LONGITUDE")]

# Remove invalid numeric rows
df_311 = df_311[pd.to_numeric(df_311["LATITUDE"], errors="coerce").notnull()]
df_311 = df_311[pd.to_numeric(df_311["LONGITUDE"], errors="coerce").notnull()]

# Convert to float and reset index
df_311["LATITUDE"] = df_311["LATITUDE"].astype(float)
df_311["LONGITUDE"] = df_311["LONGITUDE"].astype(float)
df_311 = df_311.reset_index(drop=True)

print(f"✅ Cleaned 311 data: {len(df_311)} rows with valid lat/lon.")



# Build a BallTree for spatial matching (within 100 meters)
crash_coords = np.radians(df_model[["LATITUDE", "LONGITUDE"]])
tree = BallTree(crash_coords, metric='haversine')

print("🚨 First few LAT/LON values:")
print(df_311[["LATITUDE", "LONGITUDE"]].head(10))
# Convert 311 coords to radians
# report_coords = np.radians(df_311[["LATITUDE", "LONGITUDE"]])
report_coords = np.radians(df_311[["LATITUDE", "LONGITUDE"]].to_numpy())

radius = 100 / 6371000  # 100 meters in radians

# For each 311 report, find nearby crash points
counts = np.zeros(len(df_model), dtype=int)

print("🔍 Shape of report_coords:", report_coords.shape)
# print("🔍 First report_coords row:", report_coords[0])
# print("🔍 Type of first coord:", type(report_coords[0]))

# for coord in report_coords:
#     nearby = tree.query_radius([coord], r=radius)[0]
#     for idx in nearby:
#         counts[idx] += 1

counts = np.zeros(len(df_model), dtype=int)

for i in range(len(report_coords)):
    coord = report_coords[i].reshape(1, -1)  # Ensure it's 2D
    nearby = tree.query_radius(coord, r=radius)[0]
    for idx in nearby:
        counts[idx] += 1


# Add 311 report frequency to the crash model
df_model["nearby_311_reports"] = counts

# Save updated version
df_model.to_csv("BeattiesFord_ModelInput_With311.csv", index=False)

print("✅ Merged 311 report frequencies into model input.")
