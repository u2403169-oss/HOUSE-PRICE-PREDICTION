from flask import Flask, request, jsonify
import pandas as pd
import joblib

app = Flask(__name__)

# Load saved objects
model = joblib.load("house_price_model.pkl")
scaler = joblib.load("scaler.pkl")

num_cols = joblib.load("num_cols.pkl")
feature_columns = joblib.load("feature_columns.pkl")


@app.route("/")
def home():
    return "House Price Prediction API Running"


@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.json

        # Convert JSON to DataFrame
        df = pd.DataFrame([data])

        # One Hot Encoding
        df = pd.get_dummies(df)

        # Match training columns
        df = df.reindex(
            columns=feature_columns,
            fill_value=0
        )

        # Scale numerical columns
        df[num_cols] = scaler.transform(
            df[num_cols]
        )

        prediction = model.predict(df)

        return jsonify({
            "predicted_price": round(
                float(prediction[0]), 2
            )
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        })


if __name__ == "__main__":
    app.run(debug=True)
    
