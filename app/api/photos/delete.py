from flask import abort
from flask_login import login_required, current_user
from app.models import Photo, Story, db
from . import photos_bp

@photos_bp.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_photo(id):
    # DELETE photo
    photo = Photo.query.get_or_404(id)
    story = Story.query.get_or_404(photo.story_id)

    if story.user_id != current_user.id:
        abort(403, description='Not allowed to delete this photo')

    db.session.delete(photo)
    db.session.commit()
    return '', 204
