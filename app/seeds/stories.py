# app/seeds/stories.py
from app.models import db, Story

def seed_stories():
    s1 = Story(
        title='My First Tale',
        content='Once upon a time…',
        user_id=1,
        country='Canada',
        state_or_region='vancouver',
        status='survivor',
        )
    s2 = Story(
        title='Another Story',
        content='In a galaxy far away…',
        user_id=2,
        country='United States',
        state_or_region='Arizona',
        status='Missing'

        )
    db.session.add_all([s1, s2])
    db.session.commit()

def undo_stories():
    Story.query.delete()
    db.session.commit()
