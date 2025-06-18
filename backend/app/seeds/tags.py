# app/seeds/tags.py
from app.models import db, Tag

def seed_tags():
    fantasy = Tag(name='Fantasy')
    scifi   = Tag(name='Sci-Fi')
    romance = Tag(name='Romance')
    drama   = Tag(name='Drama')
    db.session.add_all([fantasy, scifi, romance, drama])
    db.session.commit()

def undo_tags():
    Tag.query.delete()
    db.session.commit()
