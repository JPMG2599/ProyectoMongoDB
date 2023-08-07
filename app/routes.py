#
# NOTE: This file might contain code to define the routes and the controller logic for the application.
#

# Imports
import json
from flask import Blueprint, render_template, request, session, redirect, url_for
from .MongoQueries import isUser, getUsers, inserOneUser, getProfilePic, getUserByEmail, getBooks, getRole, insertBook, getBookByID 
from .MongoQueries import insertReserve,getNextID,insertRate, getBookByTitle, getRateByUser, deleteBookById, updateBookByID, getNextUserID, updateOneUser, insertFavGenre
from .MongoQueries import getFavGenre, getBookByGenres, updateUserByMail
from .MongoQueries import getReserves

# Create a Blueprint object
bp = Blueprint("main", __name__)

# Defining routes
@bp.route('/')
def index():
    session.clear()
    return redirect(url_for("main.login"))

@bp.route("/inicio-sesion", methods=['GET', 'POST'])
def login():
    session.clear()
    # Autenticación de usuario
    if request.method == 'POST':
        # Se obtiene los datos segun el name del input
        email = request.form['email']
        password = request.form['password']

        # se comprueba si el usuario existe o no
        if isUser(email, password):
            # se guarda el usuario en sesión por si se necesita mas adelante
            session['userEmail'] = email
            session['userRole'] = getRole(email)
            return redirect(url_for("main.dashboard"))
        elif isUser(email, password) == False:
            return redirect(url_for("main.login"))
        return redirect(url_for("main.login"))

    # Sino, solo se muestra la página
    return render_template("login.html")

@bp.route("/crear-cuenta", methods=['GET', 'POST'])
def createAccount():
    # Si se acciona el formulario
    if request.method == 'POST':
        # Se obtienen los datos del form
        data = {
            'usuarios_ID': getNextUserID() + 1,
            'nombre': request.form['name'],
            'apellido1': request.form['surname'],
            'cedula': request.form['userID'],
            'correo_electronico': request.form['email'],
            'contrasena': request.form['password'],
            'rol': 'user',
            'fotoPerfil': request.form['profilePic'],
            'genFavorito': [request.form['favGenre'].capitalize()]
        }
        inserOneUser(data)
        return redirect(url_for("main.login"))
    return render_template("create-account.html")
    
@bp.route("/inicio")
def dashboard():
    email = session.get('userEmail')
    profilePicture = getProfilePic(getUserByEmail(email))
    books = getBooks()
    return render_template("dashboard.html", profilePicture=profilePicture, books=books, role=session.get('userRole'))

@bp.route("/libro/agregar", methods = ["POST"])
def insertBooks():
    data = {
        'libros_ID': len(getBooks()) + 1,
        'titulo': request.form['title'],
        'autor': request.form['author'],
        'genero': request.form['genre'].capitalize(),
        'ano_publicacion': request.form['publishDate'],
        'descripcion': request.form['description'],
        'disponibilidad': request.form['availability'],
        'imagen_Url': request.form['imageURL'],
        'copias_totales': int(request.form['totalOfCopies']),
    }
    insertBook(data)
    return redirect(url_for("main.dashboard"))

@bp.route("/libro/<int:libros_ID>", methods = ['GET', 'POST'])
def bookDetails(libros_ID):
    book = getBookByID(libros_ID)  

    # datos sin objectID para que mas adelante no de problemas
    bookData = {'libros_ID': book[0]['libros_ID'], 'titulo':  book[0]['titulo'], 'autor':  book[0]['autor'], 'genero':  book[0]['genero'],
                'ano_publicacion': str(book[0]['ano_publicacion']), 'descripcion': book[0]['descripcion'], 'disponibilidad': book[0]['disponibilidad'], 
                'imagen_Url': book[0]['imagen_Url'], 'copias_totales': book[0]['copias_totales']}
    
    rate = getRateByUser(session.get('userEmail'), book[0]['titulo'])
    return render_template("book-details.html", book=book[0], role=session.get('userRole'), 
                           userEmail = session.get('userEmail'), rate=rate[0], bookData=json.dumps(bookData), 
                           profilePicture=getProfilePic(getUserByEmail(session.get('userEmail'))))

@bp.route("/libro/reservar", methods = ["POST"])
def reserveBook():
    data = {
        'id': getNextID(),
        'usuario': request.form['userEmail'],
        'libro': request.form['bookName'],
        'fecha_reserva': request.form['reserveDate']
    }
    insertReserve(data)
    return redirect(url_for("main.dashboard"))

@bp.route("/libro/calificar", methods = ["POST"])
def rateBook():
    book = getBookByTitle(request.form['bookName'])

    data = {
        'usuario': session.get('userEmail'),
        'libro': request.form['bookName'],
        'calificacion': request.form.get('starButton')
    }
    insertRate(data)
    return redirect(url_for("main.bookDetails", libros_ID=book[0]['libros_ID']))

@bp.route('/libro/<int:libros_ID>/eliminar', methods = ['GET','POST'])
def deleteBook(libros_ID):
    deleteBookById(libros_ID)
    return redirect(url_for("main.dashboard"))

@bp.route('/libro/<int:libros_ID>/actualizar', methods = ['GET', 'POST'])
def updateBook(libros_ID):
    data = {
        'libros_ID': libros_ID,
        'titulo': request.form['title'],
        'autor': request.form['author'],
        'genero': request.form['genre'].capitalize(),
        'ano_publicacion': request.form['publishDate'],
        'descripcion': request.form['description'],
        'disponibilidad': request.form['availability'],
        'imagen_Url': request.form['imageURL'],
        'copias_totales': request.form['totalOfCopies']
    }
    updateBookByID(libros_ID,data)
    return redirect(url_for("main.bookDetails", libros_ID=libros_ID))

@bp.route('/perfil')
def myProfile():
    data = getUserByEmail(session.get('userEmail'))
    
    # datos sin objectID para que mas adelante no de problemas
    profileData = {'usuarios_ID': data[0]['usuarios_ID'], 'nombre': data[0]['nombre'], 'apellido1':data[0]['apellido1'],
                   'cedula':data[0]['cedula'], 'correo_electronico':data[0]['correo_electronico'], 'contrasena': data[0]['contrasena'], 
                   'rol': data[0]['rol'], 'generos_favoritos':data[0]['genFavorito'],
                   'fotoPerfil': data[0]['fotoPerfil']}

    return render_template('profile.html', data=data[0], profileData=json.dumps(profileData))

@bp.route('/perfil/editar', methods = ['GET', 'POST'])
def editProfile():
    data = getUserByEmail(session.get('userEmail'))

    # verificamos la contraseña
    if (request.form['password'] == ""):
        password = data[0]['contrasena']
    elif (request.form['password'] != ""):
        password = request.form["password"]

    receivedData = {
          "usuarios_ID": data[0]["usuarios_ID"],
          "nombre": request.form["name"],
          "apellido1": request.form["surname"],
          "cedula":request.form["userID"],
          "correo_electronico":request.form["email"],
          "contrasena":password,
          "fotoPerfil":request.form["profilePic"]
    }
    updateOneUser(receivedData)
    return redirect(url_for('main.myProfile'))

@bp.route('/perfil/genero/agregar', methods = ['GET', 'POST'])
def addGenre():
    userData = getUserByEmail(session.get('userEmail'))
    # agregamos el genero
    userData[0]['genFavorito'].append(request.form['genre-name'].capitalize())

    data = {
        'genFavorito': userData[0]['genFavorito']
    }
    insertFavGenre(userData[0]['usuarios_ID'], data)
    return redirect(url_for('main.myProfile'))

@bp.route('/recomendaciones', methods = ['GET', 'POST'])
def recommendations():
    email = session.get('userEmail')
    profilePicture = getProfilePic(getUserByEmail(email))
    # esto nos devuelve un array de los generos favoritos
    genreList = getFavGenre(email) 
    # esto nos devuelve los libros que tengan esos generos
    books = getBookByGenres(genreList)
    return render_template("recommendations.html", profilePicture=profilePicture, books=books)

@bp.route("/cambiar-contrasena", methods=['GET', 'POST'])
def forgotPassword():#COMPARANDO CON CREATE ACCOUNT
# Autenticación de usuario
    if request.method == 'POST':
        # Se obtiene los datos segun el name del input
        email = request.form['email']
        user = getUserByEmail(email)

        if user:
            data ={
                'contrasena': request.form['password']
            }# Se actualiza los datos
            updateUserByMail(email, data)
        else:
            return redirect(url_for("main.login"))
    # Sino, solo se muestra la página
    return render_template("change-password.html")

@bp.route("/reservaciones")
def reservations():
   
    email = session.get('userEmail')
    profilePicture = getProfilePic(getUserByEmail(email))
    reservations = getReserves()
    return render_template("reserves.html", profilePicture=profilePicture, reservations=reservations) 