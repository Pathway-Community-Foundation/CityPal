import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import classification_report

df = pd.read_csv("output/merged_street_data.csv")

if 'STREETCLASS' in df.columns:
    df['StreetClassEncoded'] = LabelEncoder().fit_transform(df['STREETCLASS'].astype(str))
else:
    df['StreetClassEncoded'] = 0  

features = [
    'SPEEDLIMIT',       
    'NUMBEROFLA',       
    'LENGTH',           
    'SPEEDHUMP',       
    'ONEWAY',          
    'MEDIAN',           
    'crash_count',      
    'complaint_count',  
]


X = df[features]
y = df['label_high_risk']

X = X.fillna(0)

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.3, random_state=42)

knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(X_train, y_train)

# Predict and evaluate
predictions = knn.predict(X_test)
print("📊 Classification Report:")
print(classification_report(y_test, predictions))

# Save results
df.loc[y_test.index, 'prediction'] = predictions
df.to_csv("output/predicted_results.csv", index=False)
