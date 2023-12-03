import mysql.connector

# Establish a connection to the MariaDB server
connection = mysql.connector.connect(
    user="samullam",
    password="EiMurtautumista22",
    host="mysql.metropolia.fi",
    port=3306,
    database="samullam"
)

# Open the SQL file and read the contents
with open('lp.sql', 'r', encoding='utf8') as sql_file:
    sql_script = sql_file.read()

# Split the SQL script into separate queries
queries = sql_script.split(';')

# Create a cursor object
cursor = connection.cursor()

# Execute each query
for query in queries:
    cursor.execute(query)
    cursor.fetchall() # fetch any results, even if it's just an empty result set

# Commit the changes
connection.commit()

# Close the cursor and connection
cursor.close()
connection.close()
