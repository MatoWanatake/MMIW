from flask import request, jsonify, abort
from flask_login import login_required, current_user
from app.models import Photo, Story, db
from . import photos_bp

@photos_bp.route('/int:id>', methods=['PUT', 'PATCH'])
@login_required
def update_photo(id):
    #Edit photos
    photo = Photo.query.get_or_404(id)
    story = Story.query.get_or_404(photo.story_id)

    if story.user_id != current_user.id:
        abort(403, description='Not allowed to edit this photo')

    data = request.get_json() or {}
    url = data.get('url')
    if not url:
        abort(400, description='url is required')

    photo.url = url
    db.session.commit()

    return jsonify({'id': photo.id, 'story_id': photo.story_id, 'url': photo.url }), 200
