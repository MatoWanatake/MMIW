from flask import jsonify
from app.models import Story
from . import stories_bp

# Return list of all stories
def get_stories():
    stories = Story.query.all()
    return jsonify([s.to_dict() for s in stories]), 200

# Return a single story by id
def get_story(id):
    story = Story.query.get_or_404(id)
    return jsonify(story.to_dict()), 200
