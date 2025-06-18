from flask import Blueprint

stories_bp = Blueprint('stories', __name__, url_prefix='/api/stories')

from .get import *
from .post import *
from .put import *
from .delete import *
