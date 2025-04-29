from .db import db

class Photo(db.Model):
    __tablename__ = 'photos'

    id = db.Column(db.Integer, primary_key=True)
    story_id = db.Column(db.Integer, db.ForeignKey('stories.id'), nullable=False)
    url = db.Column(db.String(255), nullable=False)

    story = db.relationship('Story', back_populates='photos')
