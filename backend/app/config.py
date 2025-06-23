import os
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True

    # Properly parse DATABASE_URL and support both postgres:// and postgresql://
    url = os.environ.get('DATABASE_URL')
    if url and url.startswith('postgres://'):
        url = url.replace('postgres://', 'postgresql://')
    SQLALCHEMY_DATABASE_URI = url

    # Optional: for photo upload paths if you use them
    UPLOAD_FOLDER = os.path.join(BASE_DIR, '..', 'public', 'uploads')
