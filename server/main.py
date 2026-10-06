from flask import Flask, jsonify, request
from flask_cors import CORS

from script import dataPlayer

app = Flask(__name__, static_folder="images", static_url_path="/server/images")
CORS(app, resources={r"/api/*": {"origins": "*"}})
#get all this set up and return data to front end. might as well make the uploading on the admin page easy too.

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