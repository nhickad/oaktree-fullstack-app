import sqlite3

def get_db_connection():
    conn = sqlite3.connect('database.db', check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db_connection()
    conn.execute('PRAGMA journal_mode=WAL;') 
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            item_id TEXT UNIQUE, 
            type TEXT NOT NULL,
            name TEXT NOT NULL,
            image TEXT,
            status TEXT NOT NULL,
            price REAL NOT NULL CHECK (price >= 0),
            purchase_date TEXT NOT NULL,
            description TEXT,
            fixed_asset INTEGER DEFAULT 0
        )
    ''')

    conn.commit()
    conn.close()
