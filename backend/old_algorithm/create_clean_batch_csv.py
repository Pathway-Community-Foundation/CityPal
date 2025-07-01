import pandas as pd

df = pd.read_csv("BeattiesFord_ModelInput_With311.csv")

# Keep only valid coordinates
df = df[(df["LATITUDE"].notnull()) & (df["LONGITUDE"].notnull())]

# Round to 6 decimals (Census likes this)
df["LATITUDE"] = df["LATITUDE"].round(6)
df["LONGITUDE"] = df["LONGITUDE"].round(6)

# Build batch DataFrame
batch_df = pd.DataFrame()
batch_df["id"] = df.index.astype(str)
batch_df["lon"] = df["LONGITUDE"]
batch_df["lat"] = df["LATITUDE"]

# Save without header or index
batch_df.to_csv("batch_input.csv", index=False, header=False)

print("✅ Clean batch_input.csv created.")
