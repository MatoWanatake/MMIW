from flask import Blueprint

comments_bp = Blueprint('comments', __name__, url_prefix='/api/comments')

from .get import *
from .post import *
from .put import *
from .delete import *
