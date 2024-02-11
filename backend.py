
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import json
import pickle

app = Flask(__name__)
CORS(app)

def load_json(file_json):
    with open(file_json, encoding='utf-8') as f:
        data = json.load(f)
        return data

@app.route('/main', methods=['GET'])
def main():
    data = load_json('mainjson.json')
    return jsonify(data)

def predict(data):
    model_save_path = None

    with open(model_save_path, 'rb') as model_file:
        predict_price = pickle.load(model_file)

        main_floor = data['mainfloor']
        index_name = data['location']
        
        
        arr = np.array([ main_floor,   index_name])
        arr = arr.reshape(1, -1)

        price = predict_price.predict(arr)
        
        
        return int(price[0])

@app.route('/predict', methods=['POST']) 
def return_Predict():
    data = request.get_json(force=True)
    price = predict(data)
    sent_data = {"price": price}
    print(sent_data)
    return jsonify(sent_data)



@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return response

if __name__ == "__main__":

    app.run(debug=True, port=8080)