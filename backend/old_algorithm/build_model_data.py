# build_model_data.py

import pandas as pd

# Load Beatties Ford crash data
df_crashes = pd.read_csv("BeattiesFord_Crashes.csv")

# Create a new binary label: 1 if fatal or serious injury, else 0
df_crashes["label"] = df_crashes["CRASH LEVEL"].str.contains("fatal|serious", case=False, na=False).astype(int)

# Group by LATITUDE and LONGITUDE to get crash counts per location
df_grouped = df_crashes.groupby(["LATITUDE", "LONGITUDE"]).agg({
    "label": "sum",
    "CRASH ID": "count"
}).reset_index()

df_grouped.rename(columns={"label": "risk_score", "CRASH ID": "num_crashes"}, inplace=True)

# Add binary high-risk label (you can adjust threshold later)
df_grouped["high_risk"] = (df_grouped["risk_score"] > 0).astype(int)

# Save this initial training-ready table
df_grouped.to_csv("BeattiesFord_ModelInput.csv", index=False)

print(f"✅ Created model input with {len(df_grouped)} unique crash locations.")
