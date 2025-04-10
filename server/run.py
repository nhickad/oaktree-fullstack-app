from app import create_app
from db import init_db

app = create_app()
init_db()

# Only run this locally
if __name__ == "__main__":
    app.run(debug=True)
