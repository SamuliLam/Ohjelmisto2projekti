import mysql.connector


connection = mysql.connector.connect(
         host='127.0.0.1',
         port= 3306,
         database='optifly',
         user='root',
         password='huono_salasana',
         autocommit=True
         )
