from werkzeug.security import generate_password_hash, check_password_hash
import random
from dataPlayer import dataPlayer,data 


class DataManager():
    def __init__(self):
        
        self.db = dataPlayer("server/ironwood.db")

    def Signin(self, username, password):
        users = self.db.select("users", {"username": username})

        if not users:
            return False

        user = users[0]
        
        if not check_password_hash(
            user["password_hash"],
            password
        ): 
            return False
        return user

    def Signup(self, username, password):
        existing = self.db.select(
            "users",
            {"username": username}
        )

        if existing: return False

        password_hash = generate_password_hash(password)

        self.db.insert("users", {"username": username, "password_hash": password_hash})
        user = self.db.select("users", {"username": username})

        return user[0]

    def set_suppliers(self, Name:str, Email:str, Phone:str):
        """
            Requires the data in the form of a dictionary:
                Name,
                Email,
                Phone,
        """
        self.db.insert("suppliers", { "name": Name, "email": Email, "phone": Phone})

    def set_product_supplier(self, product_id:int, supplier_id:int, supplier_price:int):
            """
            This requires 3 things:\n
                product_id,\n
                supplier_id,\n
                supplier_price
            """

            self.db.insert("product_suppliers", {"product_id": product_id, 
                                                "supplier_id": supplier_id, 
                                                "supplier_price": supplier_price})
            
            print("Uploaded the supplier's product to the database!")

    def get_categories(self, specification:dict = None):
        if specification is None:
            categories = self.db.select("categories")
        else:
            categories = self.db.select("categories", specification)
        return categories

    def add_category(self, category_name, description:str = None):
        if description:
            self.db.insert("categories", { "cat_name": category_name, "description": description})
        else:
            self.db.insert("categories", {"cat_name": category_name})

    def get_inventory(self, specification: dict = None):
        if specification:
            inventory = self.db.select("inventory", specification)
        else:
            inventory = self.db.select("inventory")
            
        return inventory

    

        
    def get_item_supply_info(self, product_id, supplier_id):
        # in development!
        query = """
            SELECT 
                
        """

    def get_item_info(self, id):
        query = """
                    SELECT
                        products.id,
                        products.title,
                        products.image,
                        products.description,
                        products.price,
                        
                        inventory.quantity,
                        categories.name as category

                    FROM products
                    LEFT JOIN categories 
                        ON categories.id = products.category_id

                    JOIN inventory 
                        ON products.id = inventory.product_id
                        
                    WHERE products.id = ?
                """
        self.db.cursor.execute(query, (id,))
        return [dict(row) for row in self.db.cursor.fetchall()]
    
if __name__ == '__main__':
    # db = DataManager().db
    # for i in data:
    #     db.insert("products", i)
    
    # data = [{"name": "camping", "description": "camping gear and equipment"}, {"name": "cooking", "description": "kettles, cooktops, and utensils for cooking"}, 
    #         {"name": "lighting", "description": "lanterns, flashlights, and other lighting equipment"}, {"name": "utility", "description": "utility items for survival"},]

    supplier = {"product_id": 9092360, "supplier_id": 1, "supplier_price": 16}
    # DataManager().db.insert("product_suppliers", supplier)


    # nostolgballs = DataManager().db.select("products")
    categories = DataManager().get_categories()
    for iter, i in enumerate(data):
        for category in categories:
            if category["name"] == i["category"]:
                # print(f"Category {i['category']} already exists")
                # print(f"Category ID: {category['id']}")
                # print("funky data", data[iter])
                # DataManager().db.insert("suppliers", {"id": i["id"], "category_id": category["id"], 
                #                                     "price": random.randint(16, 80), "title": i["name"], 
                #                                     "description": i["description"], "image": i["image"]})
                break
        # DataManager().db.insert("inventory", {"product_id": i["id"], "quantity": random.randint(5, 30)})
        # print(f"Inserted category with ID: {category['id']} and title: {i['title']}")

    # command = """
    # SELECT
    #     products.title,
    #     products.description
    #     products.image,
        
    # FROM products
    # """

    command = """CREATE TABLE IF NOT EXISTS product_suppliers (
        product_id INTEGER NOT NULL,
        supplier_id INTEGER NOT NULL,
        supplier_price INTEGER NOT NULL,

        PRIMARY KEY (product_id, supplier_id),

        FOREIGN KEY (product_id) REFERENCES products(id),
        FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
    )"""

    
    # results = DataManager().db.create_table(command)
    # results = DataManager().db.delete("products")
    # DataManager().db.delete("suppliers")
    results = DataManager().db.select("suppliers", )
    # results = DataManager().get_item_info(9092360)
    print(results)

    DataManager().db.cursor.close()
    DataManager().db.conn.close()