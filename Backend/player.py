class Player:
    def __init__(self, name):
        self.name = name
        self.distanceTraveled = 0
        self.currentLocation = ""

    def travel(self):
        pass

    def getDistanceTraveled(self):
        return self.distanceTraveled

    def getCurrentLocation(self):
        return self.currentLocation

    def setName(self, name):
        self.name = name

    def setDistanceTraveled(self, distance):
        self.distanceTraveled = distance

    def setCurrentLocation(self, location):
        self.currentLocation = location


    def __str__(self):
        return self.name + " " + str(self.distanceTraveled) + " " + self.currentLocation