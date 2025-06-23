from app.models.db import db, environment, SCHEMA
from sqlalchemy.sql import text
from app.models import User

def seed_users():
    demo = User(username='Demo', email='demo@aa.io', password='password')
    marnie = User(username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(username='bobbie', email='bobbie@aa.io', password='password')

    db.session.add_all([demo, marnie, bobbie])
    return [demo, marnie, bobbie]



def undo_users():
    db.session.execute(text(f'DELETE FROM "{SCHEMA}".users'))
    db.session.commit()
