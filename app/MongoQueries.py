from flask import jsonify
from pymongo import MongoClient

# Creating the Mongo Object
client = MongoClient('mongodb+srv://admin:Proyecto123@pbooki.6x0msli.mongodb.net/')
# Creating the connection to the BD
db = client.IbookDB
UserCollection = db.Usuarios
BookCollection = db.Libros
ReserveCollection = db.Reservas
RatesCollection = db.Calificaciones 

# --- Defining queries ---
# USUARIOS
def inserOneUser(data):
    try:
        UserCollection.insert_one(data)
    except:
        print("Error!")

def getNextUserID():
    try:
        users = list(UserCollection.find())
        return len(users)
    except:
        print("Error!")
    return 0

def insertFavGenre(id, data):
    try:
        UserCollection.update_one({'usuarios_ID': id}, {'$set': data})
    except:
        print("Error!")
        
def updateOneUser(data):
    try:
        UserCollection.update_one({'usuarios_ID': data['usuarios_ID']}, {'$set': data})
    except:
        print("Error!")

def getUsers():
    try:
        results = UserCollection.find()
    except:
        results = []
    return jsonify(results)

def isUser(email, password):
    try:
        results = UserCollection.find({'correo_electronico': email, 'contrasena': password})
        for result in results:
            if result['correo_electronico'] == email and result['contrasena'] == password:
                return True
    except:
        print("Error!")
        return False
    return False

def getRole(email):
    try:
        results = UserCollection.find({'correo_electronico':email})
        for result in results:
            return result['rol']
    except:
        return "undefined"
    return  "undefined"

def getUserByEmail(email):
    try:
        results = list(UserCollection.find({'correo_electronico': email}))
    except:
        results = []
    return results

def getProfilePic(data):
    return data[0]['fotoPerfil']

def getFavGenre(email):
    try:
        user = UserCollection.find_one({'correo_electronico': email}, {'genFavorito': 1, '_id': 0})
        if user:
            return user.get('genFavorito', [])
        else: return None
    except:
        print("Error!")
        return None

def updateUserByMail(email, data):
    try:
        UserCollection.find_one_and_update({'correo_electronico': email}, {'$set': data})
    except:
        print("Error!")

# LIRBOS
def getBooks():
    try:
        books = list(BookCollection.find())
    except:
        books = []
    return books

def getBookByID(id):
    try:
        book = list(BookCollection.find({'libros_ID': id}))
    except:
        book = []
    return book

def getBookByGenres(genreList):
    try:
        normalized_genre_list = [genre.capitalize() for genre in genreList]
        books = list(BookCollection.find({'genero': {'$in': normalized_genre_list}}))
    except:
        books = []
    return books

def insertBook(data):
    try:
        BookCollection.insert_one(data)
    except:
        print("Error!")

def getBookByTitle(title):
    try:
        return list(BookCollection.find({'titulo': title}))
    except:
        return False
    
def deleteBookById(id):
    try:
        BookCollection.delete_one({'libros_ID': id})
    except:
        print("Error!")

def updateBookByID(id, data):
    try:
        BookCollection.find_one_and_update({'libros_ID': id}, {'$set': data})
    except:
        print("Error!")

# RESERVAS
def insertReserve(data):
    try:
        ReserveCollection.insert_one(data)
    except:
        print("Error!")

def getNextID():
    try:
        reserves = list(ReserveCollection.find())
        return "RE" + str(len(reserves) + 1).zfill(5)
    except:
        print("Error!")
    return "RE00000"

# CALIFICACIONES
def insertRate(data):    
    try:
        existingRate = getRateByUser(data['usuario'], data['libro'])

        if (existingRate[0]['calificacion'] != 0):
            RatesCollection.update_one({'usuario':data['usuario'],  'libro': data['libro']}, {'$set': data})
        elif (existingRate[0]['calificacion'] == 0):
            RatesCollection.insert_one(data)
    except:
        print("Error!")

def getRateByUser(email, bookTitle):
    try:
        rate = list(RatesCollection.find({'usuario':email, 'libro': bookTitle}))
        if len(rate) == 0:
            rate = [{'calificacion': 0}]
    except:
        print("Error!")
    return rate