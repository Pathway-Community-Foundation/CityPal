import pandas as pd
import geopandas as gpd
from shapely.geometry import Point

streets = gpd.read_file("data/Streets/Streets.shp")
streets['StreetName'] = streets['WHOLESTNAM'].astype(str).str.lower()

crashes = pd.read_csv("data/crash_reports.csv")
crashes['geometry'] = crashes.apply(lambda row: Point(row['x'], row['y']), axis=1)
crashes_gdf = gpd.GeoDataFrame(crashes, geometry='geometry', crs=streets.crs)

crash_joined = gpd.sjoin_nearest(crashes_gdf, streets, how="left", distance_col="dist_to_street")

crash_counts = crash_joined.groupby("StreetName").size().reset_index(name="crash_count")

requests_311 = pd.read_excel("data/311_reports.xlsx")
requests_311['street'] = requests_311['STREET_NAME'].astype(str).str.lower()

request_counts = requests_311.groupby('street').size().reset_index(name='complaint_count')

hin = pd.read_csv("data/high_injury_network.csv")
hin['StreetName'] = hin['Street'].astype(str).str.lower()
hin['is_high_injury'] = 1

streets_bf = streets[streets['StreetName'].str.contains('beatties ford')]
crash_counts_bf = crash_counts[crash_counts['StreetName'].str.contains('beatties ford')]
request_counts_bf = request_counts[request_counts['street'].str.contains('beatties ford')]
hin_bf = hin[hin['StreetName'].str.contains('beatties ford')]

streets_bf = streets_bf.merge(crash_counts_bf, how='left', on='StreetName')
streets_bf = streets_bf.merge(request_counts_bf, how='left', left_on='StreetName', right_on='street')
streets_bf = streets_bf.merge(hin_bf[['StreetName', 'is_high_injury']], how='left', on='StreetName')
streets_bf['crash_count'] = streets_bf['crash_count'].fillna(0)
streets_bf['complaint_count'] = streets_bf['complaint_count'].fillna(0)
streets_bf['is_high_injury'] = streets_bf['is_high_injury'].fillna(0)
streets_bf['label_high_risk'] = 0
streets_bf.loc[(streets_bf['is_high_injury'] == 1) | (streets_bf['crash_count'] >= 3), 'label_high_risk'] = 1
streets_bf.to_csv("output/merged_street_data.csv", index=False)
