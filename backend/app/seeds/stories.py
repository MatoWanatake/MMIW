# app/seeds/stories.py
from app.models import db, Story
from sqlalchemy.sql import text
from app.models.db import environment, SCHEMA


def seed_stories(users):
    s1 = Story(
        title='My First Tale',
        content='Once upon a time…',
        country='Canada',
        state_or_region='vancouver',
        status='survivor',
        user_id=users[0].id
    )
    s2 = Story(
        title='Another Story',
        content='In a galaxy far away…',
        country='United States',
        state_or_region='Arizona',
        status='Missing',
        user_id=users[1].id
    )

    db.session.add_all([s1, s2])
    return [s1, s2]




def undo_stories():
    if environment == "production":
        db.session.execute(f'TRUNCATE table "{SCHEMA}".stories RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text("DELETE FROM stories"))
    db.session.commit()
