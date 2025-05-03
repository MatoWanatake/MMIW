from flask import jsonify, request
from app.models import Follow
from . import follow_bp

@follow_bp.route('', methods=['GET'])
def list_follow():
    # list either by you is following or by who follows who

    q = Follow.query
    if (fid := request.args.get('follower_id', type=int)):
        q = q.filter_by(follower_id=fid)
    if (tid := request.args.get('followed_id',  type=int)):
        q = q.filter_by(followed_id=tid)
    results = q.all()
    return jsonify([{
        'id':          f.id,
        'follower_id': f.follower_id,
        'followed_id': f.followed_id
    } for f in results]), 200
