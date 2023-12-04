from flask import jsonify, Blueprint

from Backend.difficulty import return_difficulty

endpoints = Blueprint('endpoints', __name__)

@endpoints.route('/difficulty/<vaikeustaso>')
def difficulty(vaikeustaso):
    list_of_airports = return_difficulty(vaikeustaso)
    return jsonify(list_of_airports)

@endpoints.errorhandler(404)
def page_not_found():
    response = {
        "status": "404",
        "text": "Page not found"
    }
    return jsonify(response), 404

