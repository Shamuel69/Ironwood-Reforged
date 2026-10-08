import sqlite3

conn = sqlite3.connect('server/ironwood.db')

cursor = conn.cursor()

command1 = """CREATE TABLE IF NOT EXISTS products(
id INTEGER PRIMARY KEY, 
name TEXT NOT NULL,
category TEXT NOT NULL,
price REAL NOT NULL,
quantity INTEGER NOT NULL,
description TEXT,
image TEXT); """

data = [
    {'id': 2, 'name': 'Ironwood Camp Kettle', 'category': 'cooking', 'price': 52.7, 'quantity': 9, 'description': 'A rugged steel kettle designed to handle high heat while keeping your coffee and tea warm at camp.', 'image': '/server/images/kettle3.jpg'},
    {'id': 3, 'name': 'Ridgeback Pouring Kettle2', 'category': 'cooking', 'price': 46.93, 'quantity': 31, 'description': 'A compact kettle with a controlled pouring spout, ideal for brewing coffee or preparing hot drinks.', 'image': '/server/images/kettle2.jpg'},
    {'id': 4, 'name': 'Foundry Steel Kettle', 'category': 'cooking', 'price': 67.99, 'quantity': 6, 'description': 'A heavy steel kettle made for demanding outdoor cooking, with plenty of capacity for a group.', 'image': '/server/images/kettle1.jpg'}, 
    {'id': 9092334, 'name': 'durable heavy-duty kettle', 'category': 'cooking', 'price': 44.99, 'quantity': 23, 'description': 'Perfect for a morning brew of coffee, or to boil water for quick, ready-made stews!', 'image': '/server/images/kettle3.jpg'}, 
    {'id': 9092335, 'name': 'Trailfire Enamel Kettle', 'category': 'cooking', 'price': 38.99, 'quantity': 17, 'description': 'A lightweight enamel kettle built for campfires, stovetops, and slow mornings in the wilderness.', 'image': '/server/images/kettle4.jpg'}, 
    {'id': 9092336, 'name': 'Wayfarer Camp Kit', 'category': 'camping', 'price': 84.99, 'quantity': 14, 'description': 'A compact collection of essential camp cookware and utensils designed for lightweight trips into the backcountry.', 'image': '/server/images/camping_kit1.jpg'}, 
    {'id': 9092337, 'name': 'Ridgewalker Cook Set', 'category': 'camping', 'price': 112.5, 'quantity': 8, 'description': 'A rugged outdoor cooking set with durable cookware and tools for preparing full meals around the campfire.', 'image': '/server/images/camping_kit2.jpg'}, 
    {'id': 9092338, 'name': 'Timberline Camp Set', 'category': 'camping', 'price': 96.75, 'quantity': 21, 'description': "A versatile camp set built for weekend trips, combining practical cookware with lightweight equipment that's easy to pack.", 'image': '/server/images/camping_kit3.jpg'}, 
    {'id': 9092339, 'name': 'Emberstone Outdoor Kit', 'category': 'camping', 'price': 139.99, 'quantity': 5, 'description': 'A heavy-duty cooking kit made for extended stays outdoors, with durable components designed for repeated use over open flame.', 'image': '/server/images/camping_kit4.jpg'}, 
    {'id': 9092340, 'name': 'Pinecrest Traveler Kit', 'category': 'camping', 'price': 72.49, 'quantity': 27, 'description': 'A lightweight travel kit containing the essentials for simple meals and hot drinks without weighing down your pack.', 'image': '/server/images/camping_kit5.jpg'}, 
    {'id': 9092341, 'name': 'Ironwood Expedition Set', 'category': 'camping', 'price': 158.0, 'quantity': 4, 'description': 'A comprehensive outdoor cooking set designed for longer expeditions where dependable equipment matters most.', 'image': '/server/images/camping_kit6.jpg'}, 
    {'id': 9092342, 'name': 'Blackridge Camp Collection', 'category': 'camping', 'price': 124.99, 'quantity': 11, 'description': 'A durable collection of camp kitchen essentials built for groups, with sturdy components suited for cooking at the campsite.', 'image': '/server/images/camping_kit7.jpg'}, 
    {'id': 9092343, 'name': 'Emberwatch Lantern', 'category': 'lighting', 'price': 42.99, 'quantity': 18, 'description': 'A warm-burning campsite lantern designed to provide dependable light around the tent, cabin, or workbench.', 'image': '/server/images/lantern4.jpg'}, 
    {'id': 9092344, 'name': 'Blackridge Field Lantern', 'category': 'lighting', 'price': 57.5, 'quantity': 7, 'description': 'A rugged metal lantern built for rough weather and long evenings spent working or relaxing outdoors.', 'image': '/server/images/lantern3.jpg'}, 
    {'id': 9092345, 'name': 'Wayfinder Lantern', 'category': 'lighting', 'price': 34.99, 'quantity': 24, 'description': 'A compact portable lantern that packs easily into a camp bag while providing a broad, comfortable glow.', 'image': '/server/images/lantern2.jpg'}, 
    {'id': 9092346, 'name': 'Ironwood Beacon Lantern', 'category': 'lighting', 'price': 76.99, 'quantity': 3, 'description': 'A heavy-duty lantern made for extended outdoor use, featuring a reinforced frame and powerful illumination.', 'image': '/server/images/lantern1.jpg'}, 
    {'id': 9092347, 'name': 'Timberline Utility Rope', 'category': 'utility', 'price': 24.99, 'quantity': 32, 'description': 'A dependable utility rope for securing equipment, tying down loads, and handling everyday campsite tasks.', 'image': '/server/images/rope4.jpg'}, 
    {'id': 9092348, 'name': 'Ridgecraft Climbing Cord', 'category': 'utility', 'price': 31.5, 'quantity': 15, 'description': 'A durable braided cord designed for hauling, securing gear, and general outdoor utility work.', 'image': '/server/images/rope3.jpg'}, 
    {'id': 9092349, 'name': 'ForgeLine Utility Cord', 'category': 'utility', 'price': 18.75, 'quantity': 41, 'description': "A lightweight and versatile cord that's easy to pack and useful for everything from shelter setup to equipment repair.", 'image': '/server/images/rope2.jpg'}, 
    {'id': 9092350, 'name': 'Ironwood Heavy Rope', 'category': 'utility', 'price': 45.99, 'quantity': 9, 'description': 'A thick, hard-wearing rope intended for demanding tie-down jobs, hauling equipment, and heavy outdoor use.', 'image': '/server/images/rope.jpg'}, 
    {'id': 9092351, 'name': 'Trailfire Enamel Kettle', 'category': 'cooking', 'price': 38.99, 'quantity': 17, 'description': 'A lightweight enamel kettle built for campfires, stovetops, and slow mornings in the wilderness.', 'image': '/server/images/kettle4.jpg'}, 
    {'id': 9092352, 'name': 'Wayfarer Camp Kit', 'category': 'camping', 'price': 84.99, 'quantity': 14, 'description': 'A compact collection of essential camp cookware and utensils designed for lightweight trips into the backcountry.', 'image': '/server/images/camping_kit1.jpg'}, 
    {'id': 9092353, 'name': 'Ridgewalker Cook Set', 'category': 'camping', 'price': 112.5, 'quantity': 8, 'description': 'A rugged outdoor cooking set with durable cookware and tools for preparing full meals around the campfire.', 'image': '/server/images/camping_kit2.jpg'}, 
    {'id': 9092354, 'name': 'Timberline Camp Set', 'category': 'camping', 'price': 96.75, 'quantity': 21, 'description': "A versatile camp set built for weekend trips, combining practical cookware with lightweight equipment that's easy to pack.", 'image': '/server/images/camping_kit3.jpg'}, 
    {'id': 9092355, 'name': 'Emberstone Outdoor Kit', 'category': 'camping', 'price': 139.99, 'quantity': 5, 'description': 'A heavy-duty cooking kit made for extended stays outdoors, with durable components designed for repeated use over open flame.', 'image': '/server/images/camping_kit4.jpg'}, 
    {'id': 9092356, 'name': 'Pinecrest Traveler Kit', 'category': 'camping', 'price': 72.49, 'quantity': 27, 'description': 'A lightweight travel kit containing the essentials for simple meals and hot drinks without weighing down your pack.', 'image': '/server/images/camping_kit5.jpg'}, 
    {'id': 9092357, 'name': 'Ironwood Expedition Set', 'category': 'camping', 'price': 158.0, 'quantity': 4, 'description': 'A comprehensive outdoor cooking set designed for longer expeditions where dependable equipment matters most.', 'image': '/server/images/camping_kit6.jpg'}, 
    {'id': 9092358, 'name': 'Blackridge Camp Collection', 'category': 'camping', 'price': 124.99, 'quantity': 11, 'description': 'A durable collection of camp kitchen essentials built for groups, with sturdy components suited for cooking at the campsite.', 'image': '/server/images/camping_kit7.jpg'}, 
    {'id': 9092359, 'name': 'Emberwatch Lantern', 'category': 'lighting', 'price': 42.99, 'quantity': 18, 'description': 'A warm-burning campsite lantern designed to provide dependable light around the tent, cabin, or workbench.', 'image': '/server/images/lantern4.jpg'}, 
    {'id': 9092360, 'name': 'Blackridge Field Lantern', 'category': 'lighting', 'price': 57.5, 'quantity': 7, 'description': 'A rugged metal lantern built for rough weather and long evenings spent working or relaxing outdoors.', 'image': '/server/images/lantern3.jpg'}, 
    {'id': 9092361, 'name': 'Wayfinder Lantern', 'category': 'lighting', 'price': 34.99, 'quantity': 24, 'description': 'A compact portable lantern that packs easily into a camp bag while providing a broad, comfortable glow.', 'image': '/server/images/lantern2.jpg'}, 
    {'id': 9092362, 'name': 'Ironwood Beacon Lantern', 'category': 'lighting', 'price': 76.99, 'quantity': 3, 'description': 'A heavy-duty lantern made for extended outdoor use, featuring a reinforced frame and powerful illumination.', 'image': '/server/images/lantern1.jpg'}, 
    {'id': 9092363, 'name': 'Timberline Utility Rope', 'category': 'utility', 'price': 24.99, 'quantity': 32, 'description': 'A dependable utility rope for securing equipment, tying down loads, and handling everyday campsite tasks.', 'image': '/server/images/rope4.jpg'}, {'id': 9092364, 'name': 'Ridgecraft Climbing Cord', 'category': 'utility', 'price': 31.5, 'quantity': 15, 'description': 'A durable braided cord designed for hauling, securing gear, and general outdoor utility work.', 'image': '/server/images/rope3.jpg'}, {'id': 9092365, 'name': 'ForgeLine Utility Cord', 'category': 'utility', 'price': 18.75, 'quantity': 41, 'description': "A lightweight and versatile cord that's easy to pack and useful for everything from shelter setup to equipment repair.", 'image': '/server/images/rope2.jpg'}, {'id': 9092366, 'name': 'Ironwood Heavy Rope', 'category': 'utility', 'price': 45.99, 'quantity': 9, 'description': 'A thick, hard-wearing rope intended for demanding tie-down jobs, hauling equipment, and heavy outdoor use.', 'image': '/server/images/rope.jpg'}, {'id': 9092367, 'name': 'Trailfire Enamel Kettle', 'category': 'cooking', 'price': 38.99, 'quantity': 17, 'description': 'A lightweight enamel kettle built for campfires, stovetops, and slow mornings in the wilderness.', 'image': '/server/images/kettle4.jpg'}, {'id': 9092368, 'name': 'Wayfarer Camp Kit', 'category': 'camping', 'price': 84.99, 'quantity': 14, 'description': 'A compact collection of essential camp cookware and utensils designed for lightweight trips into the backcountry.', 'image': '/server/images/camping_kit1.jpg'}, {'id': 9092369, 'name': 'Ridgewalker Cook Set', 'category': 'camping', 'price': 112.5, 'quantity': 8, 'description': 'A rugged outdoor cooking set with durable cookware and tools for preparing full meals around the campfire.', 'image': '/server/images/camping_kit2.jpg'}, {'id': 9092370, 'name': 'Timberline Camp Set', 'category': 'camping', 'price': 96.75, 'quantity': 21, 'description': "A versatile camp set built for weekend trips, combining practical cookware with lightweight equipment that's easy to pack.", 'image': '/server/images/camping_kit3.jpg'}, {'id': 9092371, 'name': 'Emberstone Outdoor Kit', 'category': 'camping', 'price': 139.99, 'quantity': 5, 'description': 'A heavy-duty cooking kit made for extended stays outdoors, with durable components designed for repeated use over open flame.', 'image': '/server/images/camping_kit4.jpg'}, {'id': 9092372, 'name': 'Pinecrest Traveler Kit', 'category': 'camping', 'price': 72.49, 'quantity': 27, 'description': 'A lightweight travel kit containing the essentials for simple meals and hot drinks without weighing down your pack.', 'image': '/server/images/camping_kit5.jpg'}, {'id': 9092373, 'name': 'Ironwood Expedition Set', 'category': 'camping', 'price': 158.0, 'quantity': 4, 'description': 'A comprehensive outdoor cooking set designed for longer expeditions where dependable equipment matters most.', 'image': '/server/images/camping_kit6.jpg'}, {'id': 9092374, 'name': 'Blackridge Camp Collection', 'category': 'camping', 'price': 124.99, 'quantity': 11, 'description': 'A durable collection of camp kitchen essentials built for groups, with sturdy components suited for cooking at the campsite.', 'image': '/server/images/camping_kit7.jpg'}, {'id': 9092375, 'name': 'Emberwatch Lantern', 'category': 'lighting', 'price': 42.99, 'quantity': 18, 'description': 'A warm-burning campsite lantern designed to provide dependable light around the tent, cabin, or workbench.', 'image': '/server/images/lantern4.jpg'}, {'id': 9092376, 'name': 'Blackridge Field Lantern', 'category': 'lighting', 'price': 57.5, 'quantity': 7, 'description': 'A rugged metal lantern built for rough weather and long evenings spent working or relaxing outdoors.', 'image': '/server/images/lantern3.jpg'}, {'id': 9092377, 'name': 'Wayfinder Lantern', 'category': 'lighting', 'price': 34.99, 'quantity': 24, 'description': 'A compact portable lantern that packs easily into a camp bag while providing a broad, comfortable glow.', 'image': '/server/images/lantern2.jpg'}, {'id': 9092378, 'name': 'Ironwood Beacon Lantern', 'category': 'lighting', 'price': 76.99, 'quantity': 3, 'description': 'A heavy-duty lantern made for extended outdoor use, featuring a reinforced frame and powerful illumination.', 'image': '/server/images/lantern1.jpg'}, {'id': 9092379, 'name': 'Timberline Utility Rope', 'category': 'utility', 'price': 24.99, 'quantity': 32, 'description': 'A dependable utility rope for securing equipment, tying down loads, and handling everyday campsite tasks.', 'image': '/server/images/rope4.jpg'}, {'id': 9092380, 'name': 'Ridgecraft Climbing Cord', 'category': 'utility', 'price': 31.5, 'quantity': 15, 'description': 'A durable braided cord designed for hauling, securing gear, and general outdoor utility work.', 'image': '/server/images/rope3.jpg'}, {'id': 9092381, 'name': 'ForgeLine Utility Cord', 'category': 'utility', 'price': 18.75, 'quantity': 41, 'description': "A lightweight and versatile cord that's easy to pack and useful for everything from shelter setup to equipment repair.", 'image': '/server/images/rope2.jpg'}, {'id': 9092382, 'name': 'Ironwood Heavy Rope', 'category': 'utility', 'price': 45.99, 'quantity': 9, 'description': 'A thick, hard-wearing rope intended for demanding tie-down jobs, hauling equipment, and heavy outdoor use.', 'image': '/server/images/rope.jpg'}, {'id': 9092383, 'name': 'gregkettle', 'category': 'camping', 'price': 69.69, 'quantity': 3, 'description': 'blab blab blab', 'image': '/images/campingkit1.jpg'}, {'id': 9092384, 'name': 'gregkettle', 'category': 'camping', 'price': 69.69, 'quantity': 3, 'description': 'blab blab blab', 'image': '/images/campingkit1.jpg'}, {'id': 9092385, 'name': 'Trailfire Enamel Kettle', 'category': 'cooking', 'price': 38.99, 'quantity': 17, 'description': 'A lightweight enamel kettle built for campfires, stovetops, and slow mornings in the wilderness.', 'image': '/server/images/kettle4.jpg'}, {'id': 9092386, 'name': 'Wayfarer Camp Kit', 'category': 'camping', 'price': 84.99, 'quantity': 14, 'description': 'A compact collection of essential camp cookware and utensils designed for lightweight trips into the backcountry.', 'image': '/server/images/camping_kit1.jpg'}, {'id': 9092387, 'name': 'Ridgewalker Cook Set', 'category': 'camping', 'price': 112.5, 'quantity': 8, 'description': 'A rugged outdoor cooking set with durable cookware and tools for preparing full meals around the campfire.', 'image': '/server/images/camping_kit2.jpg'}, {'id': 9092388, 'name': 'Timberline Camp Set', 'category': 'camping', 'price': 96.75, 'quantity': 21, 'description': "A versatile camp set built for weekend trips, combining practical cookware with lightweight equipment that's easy to pack.", 'image': '/server/images/camping_kit3.jpg'}, {'id': 9092389, 'name': 'Emberstone Outdoor Kit', 'category': 'camping', 'price': 139.99, 'quantity': 5, 'description': 'A heavy-duty cooking kit made for extended stays outdoors, with durable components designed for repeated use over open flame.', 'image': '/server/images/camping_kit4.jpg'}, {'id': 9092390, 'name': 'Pinecrest Traveler Kit', 'category': 'camping', 'price': 72.49, 'quantity': 27, 'description': 'A lightweight travel kit containing the essentials for simple meals and hot drinks without weighing down your pack.', 'image': '/server/images/camping_kit5.jpg'}, {'id': 9092391, 'name': 'Ironwood Expedition Set', 'category': 'camping', 'price': 158.0, 'quantity': 4, 'description': 'A comprehensive outdoor cooking set designed for longer expeditions where dependable equipment matters most.', 'image': '/server/images/camping_kit6.jpg'}, {'id': 9092392, 'name': 'Blackridge Camp Collection', 'category': 'camping', 'price': 124.99, 'quantity': 11, 'description': 'A durable collection of camp kitchen essentials built for groups, with sturdy components suited for cooking at the campsite.', 'image': '/server/images/camping_kit7.jpg'}, {'id': 9092393, 'name': 'Emberwatch Lantern', 'category': 'lighting', 'price': 42.99, 'quantity': 18, 'description': 'A warm-burning campsite lantern designed to provide dependable light around the tent, cabin, or workbench.', 'image': '/server/images/lantern4.jpg'}, {'id': 9092394, 'name': 'Blackridge Field Lantern', 'category': 'lighting', 'price': 57.5, 'quantity': 7, 'description': 'A rugged metal lantern built for rough weather and long evenings spent working or relaxing outdoors.', 'image': '/server/images/lantern3.jpg'}, {'id': 9092395, 'name': 'Wayfinder Lantern', 'category': 'lighting', 'price': 34.99, 'quantity': 24, 'description': 'A compact portable lantern that packs easily into a camp bag while providing a broad, comfortable glow.', 'image': '/server/images/lantern2.jpg'}, {'id': 9092396, 'name': 'Ironwood Beacon Lantern', 'category': 'lighting', 'price': 76.99, 'quantity': 3, 'description': 'A heavy-duty lantern made for extended outdoor use, featuring a reinforced frame and powerful illumination.', 'image': '/server/images/lantern1.jpg'}, {'id': 9092397, 'name': 'Timberline Utility Rope', 'category': 'utility', 'price': 24.99, 'quantity': 32, 'description': 'A dependable utility rope for securing equipment, tying down loads, and handling everyday campsite tasks.', 'image': '/server/images/rope4.jpg'}, {'id': 9092398, 'name': 'Ridgecraft Climbing Cord', 'category': 'utility', 'price': 31.5, 'quantity': 15, 'description': 'A durable braided cord designed for hauling, securing gear, and general outdoor utility work.', 'image': '/server/images/rope3.jpg'}, {'id': 9092399, 'name': 'ForgeLine Utility Cord', 'category': 'utility', 'price': 18.75, 'quantity': 41, 'description': "A lightweight and versatile cord that's easy to pack and useful for everything from shelter setup to equipment repair.", 'image': '/server/images/rope2.jpg'}, {'id': 9092400, 'name': 'Ironwood Heavy Rope', 'category': 'utility', 'price': 45.99, 'quantity': 9, 'description': 'A thick, hard-wearing rope intended for demanding tie-down jobs, hauling equipment, and heavy outdoor use.', 'image': '/server/images/rope.jpg'}]


# cursor.execute(command1)
# conn.commit()

# command2 = """
# INSERT OR REPLACE INTO products(id, name, category, price, quantity, description, image)
# VALUES (:id, :name, :category, :price, :quantity, :description, :image);
# """

# cursor.execute(command2, data)
# conn.commit()


# updateDB = """
#     UPDATE products
#     SET quantity = 25
#     WHERE id = 9092334;
# """
# cursor.execute(updateDB)
# conn.commit()

# deleteFromDB = """
#     DELETE FROM products
#     WHERE id = 9092334;
# """

# cursor.execute(deleteFromDB)
# conn.commit()

class dataPlayer():
    def __init__(self, db_path:str):
        self.conn = sqlite3.connect(db_path)
        self.conn.execute("PRAGMA foreign_keys = ON")
        self.conn.row_factory = sqlite3.Row
        self.cursor = self.conn.cursor()

    def insert(self, table:str, data):
        if isinstance(data, dict):
            data = [data]

        for array in data:
            keys = array.keys()

            columns = ", ".join(keys)
            value_keys = ", ".join(':' + k for k in keys)

            print(f"INSERT OR REPLACE INTO {table}({columns}) VALUES ({value_keys})", array)
            
            print(f"""INSERT OR REPLACE INTO {table}({columns})
                                    VALUES ({value_keys})
                                """, array)
            
            self.cursor.execute(f"""INSERT OR REPLACE INTO {table}({columns})
                                    VALUES ({value_keys})
                                """, array)

        self.conn.commit()

    def create_table(self, command):
        """
        CAUTION: YOU NEED TO KNOW HOW TO SET UP TABLES ALREADY FOR THIS!

        All you need to do is type in your command and you are done. 
        Heres an example of an actual command:\n
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            username TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL
        )"""

        
        self.cursor.execute(command)
        self.conn.commit()
        print("completed")

    def select(self, table:str, where:dict = None, ):
        """Giving you the option to select your table in the database, \n
        and finally the condition statement (if empty it will just return whats been selected)"""
        
        if not where:
            self.cursor.execute(f"""SELECT * FROM {table}""")
        else:
            clause = []
            values = []

            for key, value in where.items():
                if isinstance(value, tuple):
                    operator, val = value
                    clause.append(f'{key} {operator} ?')
                    values.append(val)
                else:
                    clause.append(f'{key} = ?')
                    values.append(value)

            clause = " AND ".join(clause)
            self.cursor.execute(f"""
                                    SELECT * FROM {table} 
                                    WHERE {clause};
                                """, values)

        results = self.cursor.fetchall()
        print("Results: ", results)
        results = [dict(row) for row in results]
        return results
    def update(self, table:str, where:dict, data:dict):
        """
        Hunts down the specific data you need and updates it right then and there with the conditions you set:\n\n
        An Example:
            "products",
            where={"id": 7},
            data={"quantity": 25}
        """
        data_key = data.keys()
        data_clause = ", ".join(f'{k} = ?' for k in data_key)
        data_values = tuple(data.values())

        where_key = where.keys() 
        where_clause =" AND ".join(f'{k} = ?' for k in where_key)
        where_values = tuple(where.values()) 
        all_values = data_values + where_values

        
        self.cursor.execute(f"""
                                UPDATE {table}
                                Set {data_clause}
                                WHERE {where_clause};
                            """, all_values)
        self.conn.commit()
            

    def delete(self, table:str, where:dict = None):
        
        if not where:
            self.cursor.execute(f"DROP TABLE IF EXISTS {table}")

        else:
            where_clause = " AND ".join(f"{k} = ?" for k in where.keys())
            where_values = tuple(where.values())

            self.cursor.execute(f"""
                                    DELETE FROM {table}
                                    WHERE {where_clause};
                                """, where_values)
        
        self.conn.commit()
        print("Deleted")
            
# cursor.execute("SELECT * FROM products WHERE id = ?", (data["id"],))

# results = cursor.fetchall()
# print(results)


if __name__ == '__main__':
    db = dataPlayer('server/ironwood.db')
    # for i in data:
    #     db.insert("products", i)
    
    command1 = """CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        image TEXT NOT NULL,
        description TEXT NOT NULL,
            )"""

    db.create_table(command1)
    results = db.select("products")
    print(results)

    db.cursor.close()
    db.conn.close()

