import os
import mysql.connector
from dotenv import load_dotenv

load_dotenv()
# Establish a connection to the MariaDB server
connection = mysql.connector.connect(
    user=os.getenv('DB_USER'),
    password=os.getenv('DB_PASSWORD'),
    host=os.getenv('DB_HOST'),
    port=os.getenv('DB_PORT'),
    database=os.getenv('DB_DATABASE')
)

def return_difficulty(mouseclick):
    cursor = connection.cursor()

    if mouseclick == 'easy':

        sql = "SELECT airport.name, airport.municipality, airport.latitude_deg, airport.longitude_deg FROM airport " \
              "INNER JOIN country ON airport.iso_country = country.iso_country " \
              "WHERE country.name = %s AND airport.type IN (%s, %s) " \
              "ORDER BY RAND() LIMIT 10;"

        country_name_easy = "Finland"
        airport_types = ("medium_airport", "large_airport")

        cursor.execute(sql, (country_name_easy, *airport_types))
        result = cursor.fetchall()

    elif mouseclick == 'medium':
        sql1 = (
            'SELECT airport.name, country.name, airport.latitude_deg, airport.longitude_deg FROM airport INNER JOIN '
            'country On airport.iso_country = country.iso_country'
            ' WHERE country.continent = "EU" AND airport.type '
            '= "large_airport" ORDER BY RAND() LIMIT 10;')

        cursor.execute(sql1)
        result = cursor.fetchall()

    elif mouseclick == 'hard':
        sql2 = (
            'SELECT airport.name, country.name, airport.latitude_deg, airport.longitude_deg FROM airport INNER JOIN '
            'country On airport.iso_country = country.iso_country'
            ' WHERE airport.type '
            '= "large_airport" ORDER BY RAND() LIMIT 10;')
        cursor.execute(sql2)
        result = cursor.fetchall()

    return result
