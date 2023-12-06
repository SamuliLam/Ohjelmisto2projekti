import endpoints
import difficulty
import threading
from game import Game

current_game_instance = None

def game_loop():
    global current_game_instance
    while True:
        if current_game_instance is not None:

            print("game is running")

def start_game():
    global current_game_instance
    game_thread = threading.Thread(target=game_loop)
    game_thread.start()