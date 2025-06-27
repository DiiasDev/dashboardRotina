from flask import request, jsonify # type: ignore
from db import get_db_connection # type: ignore
from mysql.connector import Error # type: ignore

def setup_routes(app):
    @app.route('/')
    def home():
        return "Backend Funcionando! 🚀"
    
    # Rota para testar conexão com o banco 
    @app.route('/teste-db')
    def test_db():
        from db import test_connection
        if test_connection():
            return "conexão com o banco OK!"
        return "Erro na conexão com o banco!"
    
    @app.route('/tasks', methods=['GET'])
    def get_tasks():
        conn = get_db_connection() 
        if not conn:
            return jsonify({'error': 'Erro na conexão'}), 500 
        
        try:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM tasks")  # ← ERRO AQUI: era "execut"
            tasks = cursor.fetchall()
            return jsonify(tasks)
        except Error as e:
            return jsonify({'error': str(e)}), 500
        finally:
            cursor.close()
            conn.close()