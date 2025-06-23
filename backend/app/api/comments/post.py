from flask import request, jsonify
from flask_login import login_required, current_user
from app.models import Comment, Story, db
from . import comments_bp

@comments_bp.route('', methods=['POST'])
@login_required
def create_comment():

    data = request.get_json() or {}

    story_id = data.get('story_id')


    Story.query.get_or_404(story_id)

    new = Comment(
        story_id = story_id,
        user_id = current_user.id,
        content = content
    )

    db.session.add(new)
    db.session.commit()
    return jsonify(new.to_dict()), 201
