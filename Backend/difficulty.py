import sql_connection

#Palautetaan käyttäjän valitsema vaikeustaso
def difficulty(set_difficulty):

    if set_difficulty == "1":
        vaikeustaso1 = "Helppo"
        print('Valitsit helpon.')
        print('Pelin voittaa pelaaja, jolla on lyhyin matka.\n')
    elif set_difficulty == "2":
        vaikeustaso1 = "Keskitaso"
        print('Valitsit keskitason.')
        print('Pelin voittaa pelaaja, jolla on lyhyin matka.\n')
    else:
        vaikeustaso1 = "Vaikea"
        print('Valitsit vaikean.')
        print('Pelin voittaa pelaaja, jolla on lyhyin matka.\n')

    return vaikeustaso1

#Hae sql:stä vaikeustason mukaiset tiedot
def setDifficultyFromSql(userinput):
    kursori = sql_connection.dbconn.cursor()
    valinta = difficulty(userinput)

    #Hae sql:stä vaikeustason mukaiset tiedot
    if valinta == 'Helppo':
        sql = "SELECT airport.name, airport.municipality, airport.latitude_deg, airport.longitude_deg FROM airport " \
              "INNER JOIN country ON airport.iso_country = country.iso_country " \
              "WHERE country.name = %s AND airport.type IN (%s, %s) " \
              "ORDER BY RAND() LIMIT 10;"

        country_name_easy = "Finland"
        airport_types = ("medium_airport", "large_airport")

        kursori.execute(sql, (country_name_easy, *airport_types))
        tulos = kursori.fetchall()

    elif valinta == 'Keskitaso':
        sql1 = ('SELECT airport.name, country.name, airport.latitude_deg, airport.longitude_deg FROM airport INNER JOIN '
                'country On airport.iso_country = country.iso_country'
                ' WHERE country.continent = "EU" AND airport.type '
                '= "large_airport" ORDER BY RAND() LIMIT 10;')

        kursori.execute(sql1)
        tulos = kursori.fetchall()

    elif valinta == 'Vaikea':
        sql2 = ('SELECT airport.name, country.name, airport.latitude_deg, airport.longitude_deg FROM airport INNER JOIN '
                'country On airport.iso_country = country.iso_country'
                ' WHERE airport.type '
                '= "large_airport" ORDER BY RAND() LIMIT 10;')
        kursori.execute(sql2)
        tulos = kursori.fetchall()

    return tulos

#Käyttäjän valitsema vaikeustaso
def select_difficulty():
    while True:
        vaikeustaso = str(input('Valitse vaikeustaso: '))
        lentopeli.check_if_user_wants_to_exit_game(vaikeustaso)
        if vaikeustaso in ["1", "2", "3"]:
            return vaikeustaso
        print("Virheellinen syöttö, valitse vaikeustaso väliltä 1-3")