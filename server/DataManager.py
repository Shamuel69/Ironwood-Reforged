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
            self.db.insert("categories", { "name": category_name, "description": description})
        else:
            self.db.insert("categories", {"name": category_name})

    def get_inventory(self, specification: dict = None):
        if specification:
            inventory = self.db.select("inventory", specification)
        else:
            inventory = self.db.select("inventory")
            
        return inventory

    def get_item_supply(self):
        query = """
            SELECT 
                product_suppliers.product_id,
                products.title AS product_name,
                product_suppliers.supplier_id,
                suppliers.name AS supplier_name,
                product_suppliers.supplier_price

            FROM product_suppliers
            JOIN products
                ON product_suppliers.product_id = products.id
            JOIN suppliers
                ON product_suppliers.supplier_id = suppliers.id
            
        """

        self.db.cursor.execute(query,)
        return [dict(row) for row in self.db.cursor.fetchall()]


    def get_item_supply_info(self, product_id, supplier_id):
        # in development!
        query = """
            SELECT 
                products.id,
                products.title,
                products.price,
                suppliers.id,
                suppliers.name,
                suppliers.email,
                COALESCE(suppliers.phone, "") as supplierNumber,
                product_suppliers.supplier_price

            FROM product_suppliers
            JOIN products
                ON product_suppliers.product_id = products.id
            JOIN suppliers
                ON product_suppliers.supplier_id = suppliers.id

            WHERE products.id = ?
                AND suppliers.id = ?

            GROUP BY products.id, suppliers.id
                
        """
        self.db.cursor.execute(query, (product_id, supplier_id))
        return [dict(row) for row in self.db.cursor.fetchall()]

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

    def get_inventory_page(self):
            query = """
                        SELECT
                            products.id,
                            products.title,
                            products.image,
                            products.price,
                            
                            inventory.quantity,
                            categories.name as category
    
                        FROM products
                        LEFT JOIN categories 
                            ON categories.id = products.category_id
    
                        JOIN inventory 
                            ON products.id = inventory.product_id
                    """
            self.db.cursor.execute(query,)
            return [dict(row) for row in self.db.cursor.fetchall()]

    def QueryName(self, session_id):
        username = self.db.select("users", {"id": session_id})
        username = username[0]["username"]
        dictionary = {"id": session_id, "username": username}
        
        return dictionary


    def product_SUPER_details(self, product_id):
            query = """
                SELECT
                    products.id,
                    products.title as prod_name,
                    products.image,
                    products.description,
                    products.price as prod_price,
                    inventory.quantity as quantity,
                    COALESCE(categories.name, 'Unknown') as cat_name,
                    suppliers.name as sup_name,
                    suppliers.id as sup_id,
                    product_suppliers.supplier_price as sup_price

                FROM products
                LEFT JOIN inventory
                    ON products.id = inventory.product_id
                LEFT JOIN categories
                    ON products.category_id = categories.id
                LEFT JOIN product_suppliers
                    ON products.id = product_suppliers.product_id
                LEFT JOIN suppliers
                    ON product_suppliers.supplier_id = suppliers.id
                WHERE products.id = ?
            """
            self.db.cursor.execute(query, (product_id,))
            return [dict(row) for row in self.db.cursor.fetchall()]
        

    def product_details(self):
            query = """
                SELECT
                    products.id,
                    products.title,
                    products.price,
                    inventory.quantity
    
                FROM products
                LEFT JOIN inventory 
                    ON products.id = inventory.product_id
            """
            self.db.cursor.execute(query, )
            return [dict(row) for row in self.db.cursor.fetchall()]
    
    def SupplierDetails(self, supplier_id):
        query = """
            SELECT
                products.id,
                products.title,
                products.price,
                product_suppliers.supplier_price

            FROM product_suppliers
            LEFT JOIN products 
                ON product_suppliers.id = products.category_id
                
            WHERE product_suppliers.supplier_id = ?
        """
        self.db.cursor.execute(query, (supplier_id,))
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

    command = """CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        
        UNIQUE (username)
            )"""
    
    # results = DataManager().db.create_table(command)
    # results = DataManager().db.select("product_suppliers")
    # results = DataManager().db.select("products")
    # DataManager().db.delete("users")
    # results = DataManager().db.select("suppliers", )
    results = [DataManager().product_SUPER_details(9092360), DataManager().product_SUPER_details(9092350)]
    # results = DataManager().get_item_supply_info(9092360, 1)
    print(results)

    DataManager().db.cursor.close()
    DataManager().db.conn.close()