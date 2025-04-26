from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd

# Load the trained model
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

# Create Flask app
app = Flask(__name__)
CORS(app)  # Enables CORS for all routes

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    try:
        # Convert input JSON to a DataFrame
        input_df = pd.DataFrame([data])
        
        # Predict using the loaded model
        prediction = model.predict(input_df)[0]
        
        # Return the result
        return jsonify({'treatment': prediction})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    try:
        input_df = pd.DataFrame([data])

        mappings = {
            'Yes': 1,
            'No': 0,
            'Male': 0,
            'Female': 1,
            'Other': 2,
            'Very easy': 0,
            'Somewhat easy': 1,
            "Don't know": 2,
            'Somewhat difficult': 3,
            'Very difficult': 4
        }

        for col in input_df.columns:
            input_df[col] = input_df[col].map(mappings).fillna(input_df[col])

        print("Processed input:\n", input_df)

        prediction = model.predict(input_df)[0]
        return jsonify({'treatment': "Yes" if prediction == 1 else "No"})
    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': str(e)}), 500
