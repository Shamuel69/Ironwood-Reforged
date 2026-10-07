from flask import Flask, jsonify, request, session
from flask_cors import CORS

from server import DataManager
from server.dataPlayer import dataPlayer

app = Flask(__name__)
app.secret_key = "8004628"
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)
#get all this set up and return data to front end. might as well make the uploading on the admin page easy too.

@app.route("/api/auth/me", methods=["GET"])
def me():
    user_id = session.get("user_id")
    if not user_id:
        return {"error": "this guy aint signed in"}, 401
    
    username = DataManager().QueryName(user_id)


    return {"user_id": user_id, "username": username["username"]}

@app.route("/api/auth/signin", methods=["POST"])
def signin():
    data = request.get_json()

    username = data["username"]
    password = data["password"]

    user = DataManager().Signin(username, password)

    if not user:
        return {"error": "Invalid username or password"}, 401

    session["user_id"] = user["id"]

    return {"message": "Signed in"}

@app.route("/api/auth/signup", methods=["POST"])
def signup():
    data = request.get_json()

    username = data["username"]
    password = data["password"]
    
    user = DataManager().Signup(username, password)

    if not user:
        return {"error": "something happened on the sign up page"}, 401

    session["user_id"] = user["id"]

    DataManager().initialize_categories(user["id"])
    
    return {"message": "Signed up!"}


@app.route("/api/auth/logout", methods=["POST"])
def logout():
    session.clear()
    return {"message": "Signed out"}, 200

@app.route("/api/auth/username", methods=["GET"])
def username():
    user_id = session.get("user_id")
    username = DataManager().QueryName(user_id)

    return {"username": username["username"]}

@app.route("/api/categories", methods=["GET"])
def categories_get():
    user_id = session.get("user_id")
    
    if not user_id:
        return {"error": "Not signed in"}, 401

    # maybe use later
    # categories = DataManager().db.select("categories", {"user_id": user_id})
    categories = DataManager().db.select("categories")

    return categories

@app.route("/api/categories", methods=["POST"])
def categories_send():
    user_id = session.get("user_id")
    data = request.get_json()
    DataManager().db.insert("categories", {"user_id": user_id, "cat_name": data["category_name"]})

    return {"message": "Category creation complete!"}, 201

@app.route("/api/inventory/", methods=["POST"])
def Add_item():
    item_data = request.get_json()
    print(f"API request received to add item with ID: {item_data}")
    dataPlayer("server/ironwood.db").insert("products", item_data)
    return jsonify({"message": f"Item with ID {item_data} added successfully."})


@app.route("/api/inventory/<item_id>", methods=["PUT"])
def update_item(item_id):
    print(f"API request received to update item with ID: {item_id}")
    # Implement item update logic here
    dataPlayer("server/ironwood.db").update("products", {"id": item_id}, request.get_json())
    return jsonify({"message": f"Item with ID {item_id} updated successfully."})

@app.route("/api/inventory/<item_id>", methods=["DELETE"])
def delete_item(item_id):
    print(f"API request received to delete item with ID: {item_id}")
    dataPlayer("server/ironwood.db").delete("products", {"id": item_id})
    return jsonify({"message": f"Item with ID {item_id} deleted successfully."})

@app.route("/api/inventory", methods=["GET"])
def get_data():
    print("API request received for inventory data.")
    data = dataPlayer("server/ironwood.db").select("products")
    # data = [
    #     {"name": "Product 1", "quantity": 10, "price": 19.99, "id": 1},
    #     {"name": "Product 2", "quantity": 5, "price": 29.99, "id": 2},
    #     {"name": "Product 3", "quantity": 20, "price": 9.99, "id": 3}
    # ]
    print(f"Returning data: {data}")

    return jsonify(data)

@app.route("/api/inventory/<item_id>", methods=["GET"])
def get_item(item_id):
    print(f"API request received for item with ID: {item_id}")
    data = dataPlayer("server/ironwood.db").select("products", {"id": item_id})
    print(f"Returning data: {data}")
    return jsonify(data)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)