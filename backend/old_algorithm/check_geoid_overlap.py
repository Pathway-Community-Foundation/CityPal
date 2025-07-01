import pandas as pd

# ✅ Use the correct file that was recently fixed and merged
df_crash = pd.read_csv("BeattiesFord_ModelInput_WithSLD.csv")
df_sld = pd.read_csv("EPA_SmartLocationDatabase_V3_Jan_2021_Final.csv", encoding="latin1")

# 🧼 Ensure both GEOID10 columns are strings and 12-digit padded
df_crash["GEOID10"] = df_crash["GEOID10"].astype(str).str.zfill(12)
df_sld["GEOID10"] = df_sld["GEOID10"].astype(str).str.zfill(12)

# 👀 Compare formats
crash_lengths = df_crash["GEOID10"].apply(len).value_counts()
sld_lengths = df_sld["GEOID10"].apply(len).value_counts()

# 🔍 Find overlapping GEOIDs
matches = set(df_crash["GEOID10"]) & set(df_sld["GEOID10"])

print(f"\n🔍 Number of matching GEOIDs: {len(matches)}")
print("🧩 Sample matches:", list(matches)[:10])
print("\nCrash GEOID lengths:")
print(crash_lengths)
print("\nSLD GEOID lengths:")
print(sld_lengths)
