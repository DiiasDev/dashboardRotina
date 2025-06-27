# Arquivo para se connectar com o banco

import mysql.connector  # type: ignore
from mysql.connector import Error # type: ignore

DB_CONFIG = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',
    'password': 'new@H9e8s3w2',
    'database': 'dashboard'
}


def get_db_connection():
    """Conecta ao banco MySQL"""
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        return connection
    except Error as e:
        print(f"Erro ao conectar: {e}")
        return None


def test_connection():
    """Testa a conexão com o banco"""
    conn = get_db_connection()
    if conn:
        conn.close()
        return True
    return False
