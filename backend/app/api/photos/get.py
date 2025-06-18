from flask import jsonify, request
from app.models import Photo
from . import photos_bp


@photos_bp.route("", methods=["GET"])
def get_photos():
    # GET /api/photos
    story_id = request.args.get("story_id", type=int)
    if story_id:
        photos = Photo.query.filter_by(story_id=story_id).all()
    else:
        photos = Photo.query.all()
    return (
        jsonify([{"id": p.id, "story_id": p.story_id, "url": p.url} for p in photos]),
        200,
    )


@photos_bp.route("/<int:id>", methods=["GET"])
def get_photo(id):
    # GET photo by id
    p = Photo.query.get_or_404(id)
    return jsonify({"id": p.id, "story_id": p.story_id, "url": p.url}), 200
