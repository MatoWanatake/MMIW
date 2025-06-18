from flask import jsonify
from app.models import Story, db
from . import stories_bp

@stories_bp.route('<int:id>', methods=['DELETE'])

def delete_story(id):
    story = Story.query.get_or_404(id)

    db.session.delete(story)
    db.session.commit()
    return '', 204
