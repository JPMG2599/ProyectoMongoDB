#
# NOTE: This file might contain code to create the Flask application instance, initialize any extensions, 
# and register any blueprints. 
#

# Importing Flask and required extensions
from flask import Flask
from .routes import bp

def create_app():
    # Creating the Flask application instance
    app = Flask(__name__)

    # Register blueprints
    app.register_blueprint(bp)

    return app