# CityPal: A Smart Pedestrian Safety Web App

CityPal is a predictive and real-time web application that identifies high-risk pedestrian zones using advanced data analytics, computer vision, and community reports. The goal is to help city officials and residents make smarter decisions about pedestrian safety infrastructure and awareness in the city of Charlotte.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [How to Run Locally](#how-to-run-locally)
- [Model Details](#model-details)
- [Future Plans](#future-plans)
- [License](#license)

---

## Project Overview

CityPal collects and analyzes data such as crash reports, 311 service calls, and historical injury networks to predict pedestrian safety risks. The frontend visualizes this data on an interactive map, while the backend processes the data, runs the machine learning model, and serves the risk predictions.

---

## Features

- Predictive pedestrian risk classification using ML  
- Interactive map with clustered and color-coded markers  
- Real-time alert system and notifications  
- "View on Map" functionality for detailed incident reports  
- YOLOv8 integration (in progress) for visual detection  

---

## Tech Stack

**Frontend**

- React.js  
- Tailwind CSS  
- Leaflet.js  
- Recharts  

**Backend**

- Python Flask  
- Pandas, scikit-learn  
- Geopandas, Folium  
- Pickle  

---

**Data Sources**

- Crash Reports  
- 311 Service Requests  
- High Injury Network (HIN)  
- Charlotte Street Segments  
- WalkScore  
- Crime Reports  

---

## How to Run Locally

### Backend

cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py

### Frontend
cd frontend
npm install
npm run dev

---

## Model Details

**Algorithm:**  
Random Forest Classifier

**Input Features:**  
- Crash data  
- 311 complaints  
- Traffic volume  
- Speed limits  
- Number of lanes

**Output:**  
Binary classification — High Risk or Low Risk

**Additional Techniques:**  
- K-means clustering for spatial grouping  
- SHAP for interpretability

---

## Future Plans

- Integrate YOLOv8 for real-time visual detection  
- Add live feed data from IoT sensors  
- Support video uploads and object detection  
- Connect to 911 emergency feeds  
- Deploy full-stack app with user login
