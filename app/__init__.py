# app/__init__.py

from dotenv import load_dotenv
load_dotenv()            # must run before Config is loaded

from flask import (
    Flask, request, redirect, send_from_directory,
    jsonify, current_app
)
import os
import traceback
from werkzeug.exceptions import HTTPException

from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import User, Story, Tag, Comment, Follow, Photo, db
from .seeds import seed_commands
from .config import Config

from .api.user_routes  import user_routes
from .api.auth_routes  import auth_routes
from .api.stories      import stories_bp
from .api.photos       import photos_bp
from .api.comments     import comments_bp
from .api.follow       import follow_bp
from .api.tags         import tags_bp

app = Flask(__name__, static_folder="../../frontend/dist", static_url_path="/")

# Setup login manager
login = LoginManager(app)
login.login_view = "auth.unauthorized"

@login.user_loader
def load_user(id):
    return User.query.get(int(id))

# CLI
app.cli.add_command(seed_commands)

# Config & blueprints
app.config.from_object(Config)
app.register_blueprint(user_routes,  url_prefix='/api/users')
app.register_blueprint(auth_routes,  url_prefix='/api/auth')
app.register_blueprint(stories_bp)
app.register_blueprint(photos_bp)
app.register_blueprint(comments_bp)
app.register_blueprint(follow_bp)
app.register_blueprint(tags_bp)

# Extensions
db.init_app(app)
Migrate(app, db)
CORS(app)

# ─── HTTPS redirect in production ───────────────────────────────
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production' \
    and request.headers.get('X-Forwarded-Proto') == 'http':
        return redirect(request.url.replace('http://','https://'), code=301)

# ─── inject CSRF token on _every_ response ──────────────────────
@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure   = os.environ.get('FLASK_ENV') == 'production',
        samesite = 'Strict' if os.environ.get('FLASK_ENV')=='production' else None,
        httponly = False if os.environ.get('FLASK_ENV')=='development' else True
    )
    return response

# ─── API docs ───────────────────────────────────────────────────
@app.route("/api/docs")
def api_help():
    acceptable = ['GET','POST','PUT','PATCH','DELETE']
    return {
        rule.rule: [
            [m for m in rule.methods if m in acceptable],
            app.view_functions[rule.endpoint].__doc__
        ]
        for rule in app.url_map.iter_rules()
        if rule.endpoint != 'static'
    }

# ─── React catch-all ────────────────────────────────────────────
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_from_directory('public','favicon.ico')
    return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

# ─── Global JSON error handler ─────────────────────────────────
@app.errorhandler(Exception)
def handle_all_errors(e):
    # Preserve HTTP error codes (e.g. 401, 403, 404) but default to 500
    code = e.code if isinstance(e, HTTPException) else 500
    # Log full traceback to console/logs
    current_app.logger.error(traceback.format_exc())
    # Return JSON response instead of HTML error page
    return jsonify({"error": str(e)}), code
