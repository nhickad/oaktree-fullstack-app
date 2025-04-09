from flask import Blueprint, request, jsonify
from db import get_db_connection
from passlib.hash import bcrypt
import jwt, datetime

auth_bp = Blueprint('auth', __name__)
SECRET_KEY = 'supersecretkey'

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({'error': 'All fields required'}), 400

    hashed_pw = bcrypt.hash(password)

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', (name, email, hashed_pw))
        conn.commit()
        conn.close()
        return jsonify({'message': 'User registered successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('username')  # Frontend uses "username" field, actually email
    password = data.get('password')

    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
    conn.close()

    if user and bcrypt.verify(password, user['password']):
        token = jwt.encode({
            'user_id': user['id'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, SECRET_KEY, algorithm='HS256')

        return jsonify({'token': token})
    else:
        return jsonify({'error': 'Invalid credentials'}), 401


@auth_bp.route('/protected', methods=['GET'])
def protected():
    auth_header = request.headers.get('Authorization')

    if not auth_header:
        return jsonify({'error': 'Authorization header missing'}), 401

    token = auth_header.split(" ")[1] if " " in auth_header else auth_header

    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        user_id = decoded.get('user_id')

        conn = get_db_connection()
        user = conn.execute('SELECT id, name, email FROM users WHERE id = ?', (user_id,)).fetchone()
        conn.close()

        if not user:
            return jsonify({'error': 'User not found'}), 404

        return jsonify({'id': user['id'], 'name': user['name'], 'email': user['email']})
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401


@auth_bp.route('/api/items', methods=['POST'])
def create_item():
    data = request.json

    required_fields = ['type', 'name', 'status', 'price', 'purchase_date']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({'error': f'{field} is required'}), 400

    try:
        price = float(data['price'])
        if price < 0:
            return jsonify({'error': 'Price must be a positive number'}), 400
    except ValueError:
        return jsonify({'error': 'Invalid price format'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    # Insert item without item_id for now
    cursor.execute('''
        INSERT INTO items (
            type, name, image, status, price,
            purchase_date, description, fixed_asset
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        data['type'],
        data['name'],
        data.get('image', ''),
        data['status'],
        price,
        data['purchase_date'],
        data.get('description', ''),
        int(data.get('fixed_asset', False))
    ))
    conn.commit()

    # Get the auto-generated ID, pad it
    new_id = cursor.lastrowid
    padded_id = f"{new_id:03}"  # ➜ '001', '002', etc.

    # Update row with generated item_id
    cursor.execute('UPDATE items SET item_id = ? WHERE id = ?', (padded_id, new_id))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Item added', 'item_id': padded_id}), 201
