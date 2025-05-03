from flask import Blueprint

follow_bp = Blueprint('follow', __name__, url_prefix='/api/follow')

from .get import *
from .post import *
from .delete import *
