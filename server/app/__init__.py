from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'supersecretkey'
    CORS(app)

    from .routes import auth_bp
    app.register_blueprint(auth_bp)

    return app
