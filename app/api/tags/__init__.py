from flask import Blueprint

tags_bp = Blueprint('tags', __name__, url_prefix='/api/tags')

from .get import *
from .post import *
from .delete import *
