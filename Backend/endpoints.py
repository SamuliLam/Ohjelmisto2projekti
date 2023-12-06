import game
from flask import jsonify, Blueprint, request

from Backend.difficulty import return_difficulty

endpoints = Blueprint('endpoints', __name__)

@endpoints.route('/difficulty/<vaikeustaso>')
def difficulty(vaikeustaso):
    global current_game_instance, current_airports

    list_of_airports = return_difficulty(vaikeustaso)

    current_game_instance = game.Game(list_of_airports)
    current_airports = list_of_airports

    response = {
        "status": "success",
        "message": "New game instance created"
    }
    return jsonify(response)

@endpoints.route('/game')
def game():
    global current_game_instance  # Access the global variable
    if current_game_instance is not None:
        current_game_instance.start_game()
        response = {
            "status": "success",
            "message": "Game started"
        }
    else:
        response = {
            "status": "error",
            "message": "No game instance found. Create one using /difficulty endpoint."
        }
    return jsonify(response)

@endpoints.errorhandler(404)
def page_not_found():
    response = {
        "status": "404",
        "text": "Page not found"
    }
    return jsonify(response), 404
