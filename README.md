# Ironwood Reforged

Ironwood Reforged is a full-stack inventory management and storefront project built with React, Flask, and SQLite. Built upon a previous project, Ironwood Reforged was created to strengthen my backend development skills through database design, API development, and implementing more complex CRUD operations.

This project serves as a foundation for future marketplace applications as I continue expanding my full-stack development experience.

## Current Features

- Responsive, mobile-friendly storefront and admin dashboard
- Create, edit, and delete products through the admin dashboard
- Customize product information
- Individual product detail pages
- Search and category filtering
- SQLite database integration through a Flask backend
- Supplier management and product-supplier relationships
- Accounts and account authentication

## Technologies

### Frontend

- React
- Vite
- Tailwind CSS
- Axios

### Backend

- Python
- Flask
- SQLite

## How to use

When you start the vite program, append `/admin` to the base url. This will take you to the admin page, and the main focus of this website. Here is where you can upload, edit, and view products and suppliers; alongside their relationships.

(Now proud to say this part IS mobile friendly!)

## How to install

1. Clone the repository

```bash
git clone https://github.com/Shamuel69/Ironwood-Reforged.git ironwood-2
cd ironwood-2
```

2. Set up the python backend:

Navigate to the server directory in another terminal:
```cd server```

Create a virtual environment:
```python -m venv venv```

Activate it on Windows:
```venv\Scripts\activate```

Install the required Python packages:
```pip install -r requirements.txt```

Start the Flask server:

```bash
python main.py
```

1. Set up the React frontend:

Open a second terminal and navigate to the frontend:

`cd ironwood-inventory`

Open a second terminal and install the frontend dependencies:

`npm install`

Start the development server:

`npm run dev`

Vite will show you the local address to open in your browser.

## Future Development

Ironwood Reforged is an ongoing project. I plan to continue improving this project as I expand my full-stack development skills.

Some ideas I am considering for future versions:

- Improved storefront: Refine the homepage, product browsing experience, and search functionality.
- Shopping cart and wishlist: Allow users to save products and build orders.
- Inventory improvements: Expand inventory management and make product and supplier information easier to manage.
- User accounts: Continue to add more account functionality, like collection and profile customization.
- Deployment: Explore hosting the application so it can be accessed outside a local development environment.
