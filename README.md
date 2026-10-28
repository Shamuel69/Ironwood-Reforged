# Ironwood Reforged

Ironwood Reforged is a full-stack inventory management and storefront project built with React, Flask, and SQLite. Built upon a previous project, Ironwood Reforged was created to strengthen my backend development skills through database design, API development, and the introduction of complex CRUD operations.

This project serves as a foundation for future marketplace applications as I continue expanding my full-stack development experience.

## Current Features

- Responsive, mobile-friendly storefront and admin dashboard
- Create, edit, and delete products through the admin dashboard
- Customize product information
- Individual product detail pages
- Search and category filtering
- SQLite database integration through a Flask backend

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

When you start the vite program, append `/admin` to the base url. This will take you to the admin page, and the main focus of this website. Here is where you can upload, edit, and view products and suppliers; along side their relations.

(Now proud to say this part IS mobile friendly!)

## How to install

1. Clone the repository

```bash
git clone https://github.com/Shamuel69/Ironwood-Reforged.git ironwood
cd ironwood
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
python server/main.py
```

1. Set up the React frontend:

Open a second terminal and navigate to the frontend:

`cd ironwood-inventory`

Open a second terminal and install the frontend dependencies:

`npm install`

Start the development server:

`npm run dev`

Vite will show you the local address to open in your browser.

## Future Improvements

This project is part of my ongoing development as a full-stack developer. Future improvements may include additional marketplace features and expanded functionality.