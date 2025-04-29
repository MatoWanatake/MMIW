import os
from flask import request, jsonify, current_app
from werkzeug.utils import secure_filename
from flask_login import login_required, current_user
from app.models import Story, Photo, db
from . import stories_bp

@stories_bp.route('', methods=['POST'])
@login_required
def create_story():
    """Create a new story (with optional photo uploads)."""
    # 1) Grab text fields from the multipart/form-data body
    title   = request.form.get('title')
    content = request.form.get('content')

    # 2) Create the Story row
    new_story = Story(
        title   = title,
        content = content,
        user_id = current_user.id
    )
    db.session.add(new_story)
    db.session.flush()

    # 3) Handle file uploads under name="photos"
    files = request.files.getlist('photos')
    for f in files:
        if f and f.filename:
            filename = secure_filename(f.filename)
            save_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
            f.save(save_path)

            # Build a URL clients can fetch
            url = f"{request.url_root.rstrip('/')}/uploads/{filename}"
            db.session.add(Photo(story_id=new_story.id, url=url))

    # 4) Commit both Story + Photo rows in one go
    db.session.commit()

    # 5) Return the new story with its photo URLs
    return jsonify(new_story.to_dict(include_photos=True)), 201
