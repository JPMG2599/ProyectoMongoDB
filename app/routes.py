#
# NOTE: This file might contain code to define the routes and the controller logic for the application.
#

# Imports
from flask import Blueprint

# Create a Blueprint object
bp = Blueprint("main", __name__)

# Defining routes
@bp.route('/')
def index():
    return "Hello world!"