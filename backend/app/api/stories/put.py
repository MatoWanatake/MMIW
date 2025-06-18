from flask import request, jsonify, abort
from flask_login import current_user, login_required
from app.models import Story, db
from . import stories_bp

@stories_bp.route('/<int:id>', methods=['PUT', 'PATCH'])
@login_required
def update_story(id):
    #Replace or Update Story fields
    story = Story.query.get_or_404(id)
    # check if you have permission to edit
    if story.user_id != current_user.id:
        abort(403, description="You do not have permission to edit this story")

    updates = request.get_json() or {}
    for key, val in updates.items():
        setattr(story, key, val)
    db.session.commit()
    return jsonify(story.to_dict()), 200
