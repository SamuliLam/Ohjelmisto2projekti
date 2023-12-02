from flask import Flask, request, jsonify
from difficulty import return_difficulty

app = Flask(__name__)
@app.route('/difficulty/<vaikeustaso>')
def difficulty(vaikeustaso):
    list_of_airports = return_difficulty(vaikeustaso)
    return jsonify(list_of_airports)

@app.errorhandler(404)
def page_not_found():
    response = {
        "status": "404",
        "text": "Page not found"
    }
    return jsonify(response), 404


if __name__ == '__main__':
    app.run(use_reloader=True, host='127.0.0.1', port=5000)