from flask import request, jsonify, abort
from flask_login import login_required, current_user
from app.models import Photo, Story, db
from . import photos_bp

@photos_bp.route('', methods=['POST'])
@login_required
def create_photo():
    # POST api/photos
    data = request.get_json() or {}
    story_id = data.get('story_id')
    url = data.get('url')
    if not story_id or not url:
        abort(400, description='Story_id and url are required')

    story = Story.query.get_or_404(story_id)
    if story.user_id != current_user.id:
        abort(403, description='Not allowed to add photos to this story')

    new = Photo(story_id=story_id, url=url)
    db.session.add(new)
    db.session.commit()

    return jsonify({'id': new.id, 'story_id': new.story_id, 'url': new.url}), 201
