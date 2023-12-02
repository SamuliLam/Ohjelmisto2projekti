
class Game:
    def __init__(self, game_id, players, locations):
        self.game_id = game_id
        self.players = players
        self.playerScore = 0
        self.locations = locations


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


