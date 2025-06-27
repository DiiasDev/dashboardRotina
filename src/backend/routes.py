from flask import request, jsonify  # type: ignore
from db import get_db_connection  # type: ignore
from mysql.connector import Error  # type: ignore


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

    @app.route('/tasks', methods=['POST'])
    def create_tasks():
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Erro na conexão'}), 500

        try:

            data = request.get_json()

            import random
            task_id = random.randint(10000000, 99999999)

            categoria = data['categoria']
            if isinstance(categoria, list):
                import json
                categoria = json.dumps(categoria)

            titulo = data['titulo']
            descricao = data['descricao']
            concluido = data.get('concluido', False)

            from datetime import datetime
            data_criacao = datetime.now().isoformat()
            data_conclusao = data_criacao if concluido else None

            cursor = conn.cursor()

            query = """
                INSERT INTO tasks (id, titulo, categoria, descricao, concluido, dataCreacao, dataConclusao)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """

            values = (task_id, titulo, categoria, descricao,
                      concluido, data_criacao, data_conclusao)

            cursor.execute(query, values)
            conn.commit()

            return jsonify({
                'id': task_id,
                'titulo': titulo,
                'categoria': data['categoria'],  # Retorna o array original
                'descricao': descricao,
                'concluido': concluido,
                'dataCreacao': data_criacao,
                'dataConclusao': data_conclusao,
                'message': 'Task criada com sucesso!'
            }), 201

        except Error as e:
            conn.rollback()
            return jsonify({"error": f"Erro no banco de dados: {str(e)}"}), 500
        finally:
            if cursor:
                cursor.close()
            if conn:
                conn.close()
