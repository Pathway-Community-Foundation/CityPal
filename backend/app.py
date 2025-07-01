from flask import Flask, request, jsonify, send_file
import os
import subprocess
from werkzeug.utils import secure_filename

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
OUTPUT_FOLDER = 'runs/detect/predict'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/detect", methods=["POST"])
def detect():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    # Run YOLO inference
    subprocess.run([
        "yolo", "task=detect", "mode=predict",
        "model=yolov8n.pt", f"source={filepath}", "--save"
    ])

    result_path = os.path.join(OUTPUT_FOLDER, filename)
    return send_file(result_path, mimetype='image/jpeg')

if __name__ == "__main__":
    app.run(debug=True)
