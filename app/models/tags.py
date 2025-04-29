from .db import db, environment, SCHEMA, add_prefix_for_prod
from .stories import Story, story_tags


class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False, unique=True)

    stories = db.relationship("Story", secondary=story_tags, back_populates="tags")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
