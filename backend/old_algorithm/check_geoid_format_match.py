import pandas as pd

# Load both files
df_crash = pd.read_csv("BeattiesFord_WithGEOID.csv")
df_sld = pd.read_csv("EPA_SmartLocationDatabase_V3_Jan_2021_Final.csv", encoding="latin1")

# Fix formatting
df_crash["GEOID10"] = df_crash["GEOID10"].astype(str).str.zfill(12)
df_sld["GEOID10"] = df_sld["GEOID10"].astype(str).str.zfill(12)
df_sld = df_sld[df_sld["GEOID10"].str.startswith("37119")]

# Find overlap
overlap = set(df_crash["GEOID10"]).intersection(set(df_sld["GEOID10"]))
print(f"🔍 Number of matching GEOIDs: {len(overlap)}")
print("🧩 Sample matches:", list(overlap)[:10])



print("\nCrash GEOID lengths:")
print(df_crash["GEOID10"].apply(len).value_counts())

print("\nSLD GEOID lengths:")
print(df_sld["GEOID10"].apply(len).value_counts())
