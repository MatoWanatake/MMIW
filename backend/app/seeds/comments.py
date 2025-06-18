# app/seeds/comments.py
from app.models import db, Comment

def seed_comments():
    c1 = Comment(content='thank you for your story', user_id=2, story_id=1)
    c2 = Comment(content='wopila kola', user_id=3, story_id=1)
    c3 = Comment(content='live well nephew',user_id=1, story_id=2)
    db.session.add_all([c1, c2, c3])
    db.session.commit()

def undo_comments():
    Comment.query.delete()
    db.session.commit()
