from flask import Flask, render_template

from Backend import endpoints

app = Flask(__name__)

app.register_blueprint(endpoints.endpoints)

if __name__ == '__main__':
    app.run(use_reloader=True, host='127.0.0.1', port=5000)



def index():
    return render_template('index.html')