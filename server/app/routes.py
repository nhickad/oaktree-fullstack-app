from flask import Blueprint, request, jsonify
from db import get_db_connection
from passlib.hash import bcrypt
import jwt, datetime
import sqlite3

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

#POST /api/items: Accepts a JSON payload to create a new item.
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

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

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

        new_id = cursor.lastrowid
        padded_id = f"{new_id:03}"

        cursor.execute('UPDATE items SET item_id = ? WHERE id = ?', (padded_id, new_id))
        conn.commit()
        conn.close()  # ✅ Always close it

        return jsonify({'message': 'Item added', 'item_id': padded_id}), 201

    except sqlite3.OperationalError as e:
        return jsonify({'error': 'Database is locked. Please try again.'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

#GET /api/items: Returns a list of items in JSON format.
@auth_bp.route('/api/items', methods=['GET'])
def get_items():
    conn = get_db_connection()
    items = conn.execute('SELECT * FROM items').fetchall()
    conn.close()

    result = [dict(item) for item in items]
    return jsonify(result)

#GET /api/items/<id>: Returns the details of a specific item by ID.
@auth_bp.route('/api/items/<item_id>', methods=['GET'])
def get_item(item_id):
    conn = get_db_connection()
    item = conn.execute('SELECT * FROM items WHERE item_id = ?', (item_id,)).fetchone()
    conn.close()

    if not item:
        return jsonify({'error': 'Item not found'}), 404

    return jsonify(dict(item))

# PUT /api/items/<id>: Updates an existing item by ID.
@auth_bp.route('/api/items/<item_id>', methods=['PUT'])
def update_item(item_id):
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

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute('SELECT * FROM items WHERE item_id = ?', (item_id,))
        existing = cursor.fetchone()

        if not existing:
            conn.close()
            return jsonify({'error': 'Item not found'}), 404

        cursor.execute('''
            UPDATE items
            SET type = ?, name = ?, image = ?, status = ?, price = ?,
                purchase_date = ?, description = ?, fixed_asset = ?
            WHERE item_id = ?
        ''', (
            data['type'],
            data['name'],
            data.get('image', ''),
            data['status'],
            price,
            data['purchase_date'],
            data.get('description', ''),
            int(data.get('fixed_asset', False)),
            item_id
        ))

        conn.commit()
        conn.close()
        return jsonify({'message': 'Item updated successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# DELETE /api/items/<id>: Deletes an item by ID.
@auth_bp.route('/api/items/<item_id>', methods=['DELETE'])
def delete_item(item_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('SELECT * FROM items WHERE item_id = ?', (item_id,))
        item = cursor.fetchone()
        
        if not item:
            conn.close()
            return jsonify({'error': 'Item not found'}), 404

        cursor.execute('DELETE FROM items WHERE item_id = ?', (item_id,))
        conn.commit()
        conn.close()

        return jsonify({'message': f'Item {item_id} deleted successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
