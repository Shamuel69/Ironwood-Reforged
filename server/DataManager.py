from werkzeug.security import generate_password_hash, check_password_hash

from dataPlayer import dataPlayer


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

    def set_suppliers(self, user_id, suppliers):
        self.db.insert("suppliers", {"user_id": user_id, "suppliers": suppliers})

if __name__ == '__main__':
    # db = DataManager().db
    # for i in data:
    #     db.insert("products", i)
    
    


    command = """CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        image TEXT NOT NULL,
        description TEXT NOT NULL,
            )"""

    print(f"Executing command: {command}\n\n")

    # results = DataManager().db.select("products")
    # print(results)

    DataManager().db.cursor.close()
    DataManager().db.conn.close()