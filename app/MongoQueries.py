from flask import jsonify
from pymongo import MongoClient

# Creating the Mongo Object
client = MongoClient('mongodb+srv://admin:Proyecto123@pbooki.6x0msli.mongodb.net/')
# Creating the connection to the BD
db = client.IbookDB
collection = db.Usuarios

# --- Defining queries ---
def getUsers():
    results = db.Usuarios.find()

    return jsonify(results)

def isUser(email, password):
    results = collection.find({'correo_electronico': email, 'contrasena': password})

    for result in results:
        if result['correo_electronico'] == email and result['contrasena'] == password:
            return True
    return False
