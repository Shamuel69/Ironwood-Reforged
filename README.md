# Ironwood

This project was built to strengthen my backend development skills by using Flask and SQLite to create an inventory management system.

I plan to incorporate this style into future marketplace projects as I continue developing my backend skills.

## Current Features

- Mobile-friendly storefront
- Add, edit, and remove products through the `/admin` dashboard
- Customize product information
- Individual product pages
- Search and category filtering

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

Go to the url and add `/admin`, this will take you to the page where you can insert your own items into the database, or edit the currently existing ones.

(Note: this part is NOT mobile friendly as of right now)

## How to install

1. Clone the repository

```bash
git clone https://github.com/Shamuel69/Ironwood-inventory.git ironwood
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

3. Set up the React frontend:

Open a second terminal and navigate to the frontend:

`cd ironwood-inventory`

Open a second terminal and install the frontend dependencies:

`npm install`

Start the development server:

`npm run dev`

Vite will show you the local address to open in your browser.