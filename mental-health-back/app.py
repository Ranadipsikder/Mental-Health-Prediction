from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the saved model
with open('model.pkl', 'rb') as file:
    model = pickle.load(file)

# Define features in the same order used during training
features = ['Age', 'Gender', 'self_employed', 'family_history', 'work_interfere',
            'remote_work', 'tech_company', 'benefits', 'care_options', 'wellness_program',
            'seek_help', 'anonymity', 'leave', 'mental_health_consequence',
            'phys_health_consequence', 'coworkers', 'supervisor',
            'mental_health_interview', 'phys_health_interview', 'mental_vs_physical',
            'obs_consequence']

@app.route('/')
def home():
    return "Mental Health Prediction API is running. Use /predict endpoint."

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)

        # Validate all required fields are present
        missing_fields = [field for field in features if field not in data]
        if missing_fields:
            return jsonify({'error': f'Missing fields: {missing_fields}'}), 400

        # Extract input data in the correct order
        input_data = [data[feature] for feature in features]
        input_array = np.array(input_data).reshape(1, -1)

        # Make prediction
        prediction = model.predict(input_array)[0]

        result = {'prediction': int(prediction)}
        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)