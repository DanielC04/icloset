from Clothing import Clothing
from settings import app
from flask import jsonify, request, Response
from random import randint

# route to get all clothes
@app.route('/clothes', methods=['GET'])
def get_clothes():
    return jsonify({'Clothes': Clothing.get_all_clothing_items()})

# route to get all clothingItem's Ids
@app.route('/clothes_ids')
def get_clothes_id():
    return jsonify({'Clothes': Clothing.get_all_clothing_ids()})

# route to get clothingItem by id
@app.route('/clothes/<int:id>', methods=['GET'])
def get_clothes_by_id(id):
    return_value = Clothing.get_clothing(id)
    return jsonify(return_value)

# route to add new clothingItem
@app.route('/clothes', methods=['POST'])
def add_clothing_item():
    request_data = request.get_json()  # getting data from client
    print(request_data)
    Clothing.add_clothing(request_data["category"], request_data["name"], request_data["color"], request_data["length"], request_data["rating"], request_data["imgUrl"])
    response = Response("Clothing Item added", 201, mimetype='application/json')
    return response

# route to update clothing_item with PUT method
@app.route('/clothes/<int:id>', methods=['PUT'])
def update_clothing_item(id):
    request_data = request.get_json()
    Clothing.update_clothing(id, request_data['category'], request_data['name'], request_data['color'], request_data['length'], request_data['rating'], request_data['imgUrl'])
    response = Response("Movie Updated", status=200, mimetype='application/json')
    return response


# route to delete clothing item using the DELETE method
@app.route('/clothes/<int:id>', methods=['DELETE'])
def remove_clothing_item(id):
    Clothing.delete_clothing(id)
    response = Response("Movie Deleted", status=200, mimetype='application/json')
    return response

# route to get ids of clothing items in category
@app.route('/category/<string:category>', methods=['GET'])
def get_clothing_item_ids_of_category(category):
    return jsonify({'Clothes': Clothing.get_clothing_of_category(category)})

# route to get the best outfit
@app.route('/outfit', methods=['GET'])
def get_best_outfit():
    res = []
    allClothes = Clothing.query.all()
    for _ in range(4):
        randIndex = randint(0, len(allClothes) - 1)
        res.append(allClothes.pop(randIndex).id)

    return jsonify(res)


whitelist = ['http://localhost:3000']
@app.after_request
def add_cors_headers(response):
    if not request or not request.referrer:
        return response
    r = request.referrer[:-1]
    if r in whitelist:
        response.headers.add('Access-Control-Allow-Origin', r)
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Headers', 'Cache-Control')
        response.headers.add('Access-Control-Allow-Headers', 'X-Requested-With')
        response.headers.add('Access-Control-Allow-Headers', 'Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    return response


if __name__ == "__main__":
    app.run(port=5000, debug=True)