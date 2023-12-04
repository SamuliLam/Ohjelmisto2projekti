# import os
#
# import mysql.connector
#
# from dotenv import load_dotenv
#
# load_dotenv()
#
# # Establish a connection to the MariaDB server
# connection = mysql.connector.connect(
#     user=os.getenv('DB_USER'),
#     password=os.getenv('DB_PASSWORD'),
#     host=os.getenv('DB_HOST'),
#     port=os.getenv('DB_PORT'),
#     database=os.getenv('DB_DATABASE')
# )
#
# # Close the cursor and connection
#
# connection.close()
