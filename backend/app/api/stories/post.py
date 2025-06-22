# app/api/stories/post.py
import os, base64, traceback
from uuid import uuid4
from flask import request, jsonify, current_app
from flask_login import login_required, current_user
from werkzeug.exceptions import HTTPException
from app.models import Story, Photo, Tag, db  # ← add Tag
from . import stories_bp

@stories_bp.route('', methods=['POST'])
@login_required
def create_story():
    try:
        data = request.get_json(force=True) or {}

        # required fields
        title           = data.get('title', '').strip()
        content         = data.get('content', '').strip()
        country         = data.get('country', '').strip()
        state_or_region = data.get('state_or_region', '').strip()
        status          = data.get('status', None)

        if not all([title, content, country, state_or_region]):
            return jsonify({"error": "Missing one of [title, content, country, state_or_region]"}), 400

        # 1) create story record
        new_story = Story(
            title=title, content=content,
            country=country, state_or_region=state_or_region,
            status=status, user_id=current_user.id
        )
        db.session.add(new_story)
        db.session.flush()

        # 2) handle Base64 photos
        for img_str in data.get('photos', []):
            if not isinstance(img_str, str) or ',' not in img_str:
                continue

            header, b64data = img_str.split(",", 1)
            try:
                ext = header.split(';')[0].split('/')[1]
                binary = base64.b64decode(b64data)
            except Exception:
                continue

            filename = f"{uuid4()}.{ext}"
            save_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)

            try:
                with open(save_path, 'wb') as f:
                    f.write(binary)
            except IOError:
                continue

            url = f"{request.url_root.rstrip('/')}/uploads/{filename}"
            db.session.add(Photo(story_id=new_story.id, url=url))

        # 3) handle tags (if any)
        tag_names = data.get('tags', [])
        for name in tag_names:
            name = name.strip()
            if not name:
                continue

            tag = Tag.query.filter_by(name=name).first()
            if not tag:
                tag = Tag(name=name)
                db.session.add(tag)

            new_story.tags.append(tag)

        db.session.commit()
        return jsonify(new_story.to_dict(include_tags=True, include_photos=True)), 201

    except HTTPException:
        raise

    except Exception as e:
        traceback.print_exc()
        db.session.rollback()
        current_app.logger.error(traceback.format_exc())
        return jsonify({
            "error": "Could not create story",
            "details": str(e)
        }), 500
