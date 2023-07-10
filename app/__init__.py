#
# NOTE: This file might contain code to create the Flask application instance, initialize any extensions, 
# and register any blueprints. 
#

# Importing Flask and required extensions
from flask import Flask
from .routes import bp
from pymongo import MongoClient

# Creating the Mongo Object
client = MongoClient('mongodb+srv://admin:Proyecto123@pbooki.6x0msli.mongodb.net/')

# Creating the connection to the BD
db = client.ibookdb

def create_app():
    # Creating the Flask application instance
    app = Flask(__name__)

    # Register blueprints
    app.register_blueprint(bp)

    return app