import mysql.connector

hostname = 'iclosetdb.dcermann.de'
username = 'esra'
password = 'esrafrank21.03'
database = 'icloset'

# Simple routine to run a query on a database and print the results:


def doQuery(conn):
    cur = conn.cursor()

    cur.execute("SELECT * FROM tshirts")

    for res in cur.fetchall():
        print(res)


myConnection = mysql.connector.connect(
    host=hostname, user=username, passwd=password, db=database)
doQuery(myConnection)
myConnection.close()