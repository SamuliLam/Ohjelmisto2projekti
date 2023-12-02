from flask import Flask, render_template

from Backend import endpoints

app = Flask(__name__)

app.register_blueprint(endpoints.endpoints)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/difficulty')
def difficulty():
    return render_template('difficulty.html')

@app.route('/game')
def game():
    return render_template('game.html')

if __name__ == '__main__':
    app.run(use_reloader=True, host='127.0.0.1', port=5000)
