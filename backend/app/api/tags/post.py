from flask import request, jsonify, abort
from flask_login import login_required
from app.models import Tag, db
from . import tags_bp

@tags_bp.route('', methods=['POST'])
@login_required
def create_tag():
    # CREATE a tag
    data = request.get_json() or {}
    name = data.get('name', '').strip()
    if not name:
        abort(400, description="name is required")
    # prevents dublicate tag names
    if Tag.query.filter_by(name=name).first():
        abort(400, description="That tag already exists")

    new_tag = Tag(name=name)
    db.session.add(new_tag)
    db.session.commit()
    return jsonify(new_tag.to_dict()), 201
