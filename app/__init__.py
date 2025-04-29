# app/__init__.py

from dotenv import load_dotenv
load_dotenv()            # must run before Config is loaded

import os
from flask import Flask, request, redirect, send_from_directory
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db           # only the extension
from .config import Config

# instantiate extensions, un-bound
migrate       = Migrate()
csrf          = CSRFProtect()
login_manager = LoginManager()

def create_app():
    app = Flask(
        __name__,
        static_folder='../react-vite/dist',
        static_url_path='/'
    )
    app.config.from_object(Config)

    # make sure uploads folder exists
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    # register all models (including Photo) on db.metadata
    from .models import User, Story, Tag, Comment, Follow, Photo

    # bind extensions
    db.init_app(app)
    migrate.init_app(app, db)
    csrf.init_app(app)
    login_manager.init_app(app)
    CORS(app)

    # ─── register blueprints ─────────────────────────────────────
    from .api.stories import stories_bp
    app.register_blueprint(stories_bp)

    from .api.user_routes import user_routes
    from .api.auth_routes import auth_routes
    app.register_blueprint(user_routes, url_prefix='/api/users')
    app.register_blueprint(auth_routes, url_prefix='/api/auth')

    from .api.photos import photos_bp
    app.register_blueprint(photos_bp)


    # ─── login manager ───────────────────────────────────────────
    login_manager.login_view = 'auth.unauthorized'
    @login_manager.user_loader
    def load_user(user_id):
        from .models import User
        return User.query.get(int(user_id))

    # ─── seed commands ────────────────────────────────────────────
    from .seeds import seed_commands
    app.cli.add_command(seed_commands)

    # ─── serve uploaded files ─────────────────────────────────────
    @app.route('/uploads/<path:filename>')
    def uploaded_file(filename):
        return send_from_directory(
            app.config['UPLOAD_FOLDER'],
            filename
        )

    # ─── HTTPS redirect in production ────────────────────────────
    @app.before_request
    def https_redirect():
        if os.environ.get('FLASK_ENV') == 'production' \
        and request.headers.get('X-Forwarded-Proto') == 'http':
            return redirect(request.url.replace('http://', 'https://'), code=301)

    # ─── inject CSRF token ───────────────────────────────────────
    @app.after_request
    def inject_csrf_token(response):
        response.set_cookie(
            'csrf_token',
            generate_csrf(),
            secure   = os.environ.get('FLASK_ENV') == 'production',
            samesite = 'Strict' if os.environ.get('FLASK_ENV') == 'production' else None,
            httponly = True
        )
        return response

    # ─── API docs ────────────────────────────────────────────────
    @app.route("/api/docs")
    def api_help():
        acceptable = ['GET','POST','PUT','PATCH','DELETE']
        return {
            rule.rule: [
                [m for m in rule.methods if m in acceptable],
                app.view_functions[rule.endpoint].__doc__
            ]
            for rule in app.url_map.iter_rules() if rule.endpoint != 'static'
        }

    # ─── React catch-all ─────────────────────────────────────────
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def react_root(path):
        if path == 'favicon.ico':
            return app.send_from_directory('public','favicon.ico')
        return app.send_static_file('index.html')

    @app.errorhandler(404)
    def not_found(e):
        return app.send_static_file('index.html')

    return app

# create the app for flask CLI / runtime
app = create_app()
