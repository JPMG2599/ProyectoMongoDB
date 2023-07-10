#
# NOTE: This file might contain code to define the routes and the controller logic for the application.
#

# Imports
from flask import Blueprint, render_template, request, session, redirect, url_for
from .MongoQueries import isUser, getUsers
import json

# Create a Blueprint object
bp = Blueprint("main", __name__)

# Defining routes
@bp.route('/')
def index():
    return "Hello world!"

@bp.route("/inicio-sesion", methods=['GET', 'POST'])
def login():
    # Autenticación de usuario
    if request.method == 'POST':
        # Se obtiene los datos segun el name del input
        email = request.form['email']
        password = request.form['password']

        # se comprueba si el usuario existe o no
        if isUser(email, password):
            print("User exists")
        elif isUser(email, password) == False:
            print("User is not in Db")
        return redirect(url_for("main.login"))

    # Sino, solo se muestra la página
    return render_template("login.html")
