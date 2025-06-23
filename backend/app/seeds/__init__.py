from flask.cli import AppGroup
from .users import seed_users, undo_users
from .stories import seed_stories, undo_stories
from .tags import seed_tags, undo_tags
from .comments import seed_comments, undo_comments
from .follows import seed_follows, undo_follows

from app.models.db import db, environment, SCHEMA

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_users()

    users = seed_users()
    db.session.commit()

    stories = seed_stories(users)
    db.session.commit()

    seed_tags()
    db.session.commit()

    seed_comments(users, stories)
    db.session.commit()

    seed_follows(users)
    db.session.commit()

@seed_commands.command('undo')
def undo():
    undo_comments()
    undo_stories()
    undo_tags()
    undo_follows()
    undo_users()
