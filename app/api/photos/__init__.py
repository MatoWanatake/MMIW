from flask import Blueprint

photos_bp = Blueprint('photos', __name__, url_prefix='/api/photos')

from .get import *
from .post import *
from .put import *
from .delete import *
