from flask import jsonify, Blueprint, request
from Backend.difficulty import return_difficulty
from Backend.difficulty import connection
from geopy import distance

endpoints = Blueprint('endpoints', __name__)

# This is the endpoint for the difficulty page
# The difficulty page sends a GET request to this endpoint
# The endpoint returns a list of airports based on the difficulty level
# The difficulty level is sent as a parameter in the GET request
# The difficulty level is either easy, medium or hard
# The difficulty level is used to determine which airports are returned
@endpoints.route('/difficulty/<vaikeustaso>')
def difficulty(vaikeustaso):
    list_of_airports = return_difficulty(vaikeustaso)
    return jsonify(list_of_airports)
# This is an endpoint for the game page, where we receive the json data from the frontend and send the calculated distance back
@endpoints.route('/game/airport', methods=['POST'])
def handle_game_data():
    if request.method == 'POST':
        try:
            data = request.get_json()
            total_distance = 0
            for i in range(1, len(data)):
                last_coordinate = (data[i - 1]["lat"], data[i - 1]["lng"])
                current_coordinate = (data[i]["lat"], data[i]["lng"])
                dist = distance.distance(last_coordinate, current_coordinate).km
                total_distance += dist
                rounded_distance = round(total_distance, 2)
            return jsonify({'Response': rounded_distance})
        except Exception as e:
            return jsonify({'error': str(e)}), 500


@endpoints.errorhandler(404)
def page_not_found():
    response = {
        "status": "404",
        "text": "Page not found"
    }
    return jsonify(response), 404