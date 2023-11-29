import sqlconnection

class Airports:
    def __init__(self, airports):
        #put airports in this class when they are selected by difficulty level on another class
        self.airports = airports
    def return_airports(self):
        return self.airports

class DifficultyLevel:
    def __init__(self, difficulty):
        self.difficulty = difficulty

    def return_difficulty(self):
        if self.difficulty == 'easy':
            # airports("easy airports") #putting easy airports for the airports list when sql is ready
            return 'easy airports' #here will be easy airports from sql
        elif self.difficulty == 'medium':
            # airports("medium airports") #putting medium airports for the airports list when sql is ready
            return 'medium airports' #here will be medium airports from sql
        elif self.difficulty == 'hard':
            #airports("hard airports") #putting hard airports for the airports list when sql is ready
            return 'hard airports' #here will be hard airports from sql



class Game:
    def __init__(self, game_id, players, airports = Airports.return_airports()):
        self.game_id = game_id
        self.players = players
        self.playerScore = 0


    def getGameId(self):
        return self.game_id

    def getPlayers(self):
        return self.players

    def getLocations(self):
        return self.locations

    def getPlayerScore(self):
        return self.playerScore

    def setPlayerScore(self, score):
        self.playerScore = score

    def setGameId(self, game_id):
        self.game_id = game_id

    def setPlayers(self, players):
        self.players = players

    def setLocations(self, locations):
        self.locations = locations

    def __str__(self):
        return self.game_id + " " + str(self.players) + " " + str(self.locations)


