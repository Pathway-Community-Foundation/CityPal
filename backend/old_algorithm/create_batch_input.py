import pandas as pd

# Load your enriched crash data
df = pd.read_csv("BeattiesFord_ModelInput_With311.csv")

# Census batch geocoder format: id,longitude,latitude
df_batch = pd.DataFrame()
df_batch["id"] = df.index
df_batch["lon"] = df["LONGITUDE"]
df_batch["lat"] = df["LATITUDE"]

# Save to file (no header)
df_batch.to_csv("batch_input.csv", index=False, header=False)

print("✅ Created batch_input.csv for Census Geocoder")
