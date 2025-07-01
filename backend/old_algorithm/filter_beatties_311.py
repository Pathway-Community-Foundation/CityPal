# filter_beatties_311.py

import pandas as pd

# Load your 311 Excel file (update the filename if needed)
df_311 = pd.read_excel("jan-mar_311.xlsx")  # change to your actual file name

# Filter where the STREET_NAME contains 'Beatties Ford'
df_beatties_311 = df_311[df_311['STREET_NAME'].str.contains("beatties", case=False, na=False)]

# Save to a new file
df_beatties_311.to_csv("BeattiesFord_311.csv", index=False)

print(f"✅ Done! Filtered {len(df_beatties_311)} 311 reports for Beatties Ford Road.")
