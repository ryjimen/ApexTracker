from flask import Flask, request, jsonify
import requests
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
API_KEY = "4853042b9d8dbb2093e5cb391c638388"

# GET PLAYER by name in the route
@app.route("/player/<player_name>", methods=["GET"])
def get_player(player_name):
    platform = request.args.get("platform")

    if not platform:
        return jsonify({"error": "Missing platform parameter"}), 400

    try:
        url = f'https://api.mozambiquehe.re/bridge?auth={API_KEY}&player={player_name}&platform={platform}'
        response = requests.get(url)
        response.raise_for_status()

        return jsonify(response.json())

    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Failed to fetch player data", "details": str(e)}), 502

if __name__ == "__main__":
    app.run(debug=True)