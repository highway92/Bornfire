from flask import Blueprint, render_template, jsonify, request, redirect, session, abort, url_for
import datetime
from bson import ObjectId

import functools

from .models import Feed_collection, User_collection
from .nickname import make_nickname

feed = Blueprint("feed", __name__)


# def login_required(func):
#     def wrapper():
#         user = session.get('user_email')
#         if user is None:
#             return abort(404)
#         func()
#     return wrapper

def login_required(func):
    @functools.wraps(func)
    def wrapped_view(**kwargs):
        user = session.get('user_email')
        if user is None:
            return abort(404)
        return func(**kwargs)

    return wrapped_view

@feed.route("/feed")
def get_feed():
    cols = Feed_collection.find().sort('_id',-1).limit(9)

    col_list = []
    for col in cols:
        col_list.append({
            '_id' : col["_id"],
            'nickname': make_nickname(),
            'context' : col['Feed'],
            'thumbs-up': len(col['Meta']['Likes'])
        })

# TODO subject collection 넘겨 주는 것 필요.
    return render_template('feed.html', datas = col_list)



@feed.route('/feed', methods=['POST'])
@login_required
def post_feed():
    data = request.json
    email = str(session['user_email'])
    context = str(data.get('context'))
# TODO 분석 툴이 들어 와서 model emotion에 저장. 
    '''
      TODO  user_collection에 내용 저장
    User_collection.
    '''
    # TODO 초 단위까지 
    time = datetime.datetime.utcnow()
    emotion = 1
    
    log = {str(time): emotion}
    User_collection.update_one({'User_email': email}, { '$push': { 'User_feed_log': log } })

    data = {
        'Main_subject_num' : 1,
        'Side_subject_num': 1,
        'Feed' : context,
        "Meta": {'Likes': [], "Created_at": time},
        'Predicted_value' : emotion
    }
    # Feed_collection.remove({})
    Feed_collection.insert_one(data)

    cols = Feed_collection.find().sort('_id',-1).limit(1)
    #TODO [DB 정보 확인]DB에서 error가 났을 때,  예외 처리 필요. 

    col_list = []
    for col in cols:
        col_list.append({
            '_id' : str(col["_id"]), 
            'nickname': make_nickname(),
            'context' : col['Feed'],
            'thumbs-up': len(col['Meta']['Likes'])
        })

    return (jsonify(col_list))

@feed.route("/inifinity", methods=['POST'])
def infinity_page():
    data = request.json
    cols = Feed_collection.find().sort('_id',-1).skip(10*data['page']).limit(9)

    col_list = []
    for col in cols:
        col_list.append({
            '_id' : str(col["_id"]),
            'nickname': make_nickname(),
            'context' : col['Feed'],
            'thumbs-up': len(col['Meta']['Likes'])
        })

# TODO subject collection 넘겨 주는 것 필요.
    return jsonify(col_list)

@feed.route('/likes', methods=["UPDATE"])
def like():
    data = request.json
    email = str(session['user_email'])

    #query
    find_query = {'_id': ObjectId(data)}
    update_query = { '$push': { 'Meta.Likes': email } }
    delete_query = {'$pull': { 'Meta.Likes': email }}


    like_list = Feed_collection.find_one(find_query)['Meta']['Likes']

    if len(like_list)==0 and email not in like_list:
        Feed_collection.update_one(find_query, update_query)
        return jsonify(len(like_list)+1)



    Feed_collection.update_one(find_query, delete_query)
    return jsonify(len(like_list)-1)
    