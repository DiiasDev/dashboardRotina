from flask import request, jsonify, make_response  # type: ignore
from db import get_db_connection  # type: ignore
from mysql.connector import Error  # type: ignore


def setup_routes(app):
    @app.after_request
    def add_cors_headers(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET,POST,DELETE,OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
        return response

    @app.route('/')
    def home():
        return "Backend Funcionando! 🚀"

    @app.route('/teste-db')
    def test_db():
        from db import test_connection
        if test_connection():
            return "conexão com o banco OK!"
        return "Erro na conexão com o banco!"

    # TASKS 
    @app.route('/tasks', methods=['GET'])
    def get_tasks():
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Erro na conexão'}), 500

        try:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM tasks")  
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
                INSERT INTO tasks (id, titulo, categoria, descricao, concluido, data_criacao, data_conclusao)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """

            values = (task_id, titulo, categoria, descricao,
                      concluido, data_criacao, data_conclusao)

            cursor.execute(query, values)
            conn.commit()

            return jsonify({
                'id': task_id,
                'titulo': titulo,
                'categoria': data['categoria'],
                'descricao': descricao,
                'concluido': concluido,
                'data_criacao': data_criacao,
                'data_conclusao': data_conclusao,
                'message': 'Task criada com sucesso!'
            }), 201

        except Error as e:
            conn.rollback()
            return jsonify({"error": f"Erro no banco de dados: {e}"}), 500
        finally:
            if cursor:
                cursor.close()
            if conn:
                conn.close()

    

    @app.route('/tasks/<int:task_id>', methods=['OPTIONS'])
    def options_task(task_id):
        response = make_response()
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'DELETE,OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
        return response

    @app.route('/tasks/<int:task_id>', methods=['DELETE'])
    def delete_task(task_id):
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Erro na conexão'}), 500

        try:
            cursor = conn.cursor()
            # Certifique-se de que o id está sendo passado como inteiro e que existe no banco
            cursor.execute("SELECT id FROM tasks WHERE id = %s", (task_id,))
            result = cursor.fetchone()
            if not result:
                return jsonify({'error': 'Tarefa não encontrada'}), 404

            cursor.execute("DELETE FROM tasks WHERE id = %s", (task_id,))
            conn.commit()

            return jsonify({'message': 'Tarefa deletada com sucesso!'}), 200

        except Error as e:
            conn.rollback()
            return jsonify({"error": f"Erro no banco de dados: {str(e)}"}), 500
        finally:
            if cursor:
                cursor.close()
            if conn:
                conn.close()

    @app.route('/tasks/<int:task_id>/concluir', methods=['POST'])
    def concluir_task(task_id):
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Erro na conexão'}), 500

        try:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM tasks WHERE id = %s", (task_id,))
            task = cursor.fetchone()
            if not task:
                return jsonify({'error': 'Tarefa não encontrada'}), 404

            from datetime import datetime
            data_conclusao = datetime.now().isoformat()

            cursor.execute("""
                UPDATE tasks 
                SET concluido = TRUE, data_conclusao = %s 
                WHERE id = %s
            """, (data_conclusao, task_id))
            conn.commit()

            # Retorne a task atualizada
            cursor.execute("SELECT * FROM tasks WHERE id = %s", (task_id,))
            updated_task = cursor.fetchone()

            return jsonify(updated_task), 200

        except Error as e:
            conn.rollback()
            return jsonify({"error": f"Erro no banco de dados: {str(e)}"}), 500
        finally:
            if cursor:
                cursor.close()
            if conn:
                conn.close()

    #LEMBRETES

    @app.route('/lembretes', methods=['GET'])
    def get_lembretes():
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Erro na conexão'}), 500
        try:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM lembretes")
            lembretes = cursor.fetchall()
            return jsonify(lembretes)
        except Error as e:
            return jsonify({'error': str(e)}), 500
        

    @app.route('/lembretes', methods=['POST'])
    def create_lembretes():
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Erro na conexão'}), 500

        try:
            data = request.get_json()

            import random
            lembrete_id = random.randint(10000000, 99999999)

            titulo = data['titulo']
            date_iso = data['date']
            horario = data['horario']
            concluido = data.get('concluido', False)

            prioridade = data['prioridade']
            if isinstance(prioridade, list):
                import json
                prioridade = json.dumps(prioridade)

            # Converter date_iso (ex: '2024-06-10T09:30:00.000Z') para 'YYYY-MM-DD'
            from datetime import datetime
            try:
                date_obj = datetime.fromisoformat(date_iso.replace('Z', '+00:00'))
                date_mysql = date_obj.date().isoformat()  # 'YYYY-MM-DD'
            except Exception as e:
                return jsonify({'error': f'Formato de data inválido: {str(e)}'}), 400

            data_criacao = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            data_conclusao = data_criacao if concluido else None

            cursor = conn.cursor()

            query = """
                INSERT INTO lembretes (id, titulo, date, horario, concluido, prioridade, data_criacao, data_conclusao)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """

            values = (
                lembrete_id,
                titulo,
                date_mysql,
                horario,
                concluido,
                prioridade,
                data_criacao,
                data_conclusao
            )

            cursor.execute(query, values)
            conn.commit()

            return jsonify({
                'id': lembrete_id,
                'titulo': titulo,
                'date': date_mysql,
                'horario': horario,
                'concluido': concluido,
                'prioridade': prioridade,
                'data_criacao': data_criacao,
                'data_conclusao': data_conclusao,
            })

        except Error as e:
            conn.rollback()
            return jsonify({"error": f"Erro no banco de dados: {str(e)}"}), 500
        finally:
            if cursor:
                cursor.close()
            if conn:
                conn.close()

    @app.route('/lembretes/<int:lembrete_id>', methods=['DELETE'])
    def delete_lembrete(lembrete_id):
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Erro na conexão'}), 500

        try:
            cursor = conn.cursor()
            # Verificar se o lembrete existe
            cursor.execute("SELECT id FROM lembretes WHERE id = %s", (lembrete_id,))
            result = cursor.fetchone()
            if not result:
                return jsonify({'error': 'Lembrete não encontrado'}), 404

            cursor.execute("DELETE FROM lembretes WHERE id = %s", (lembrete_id,))
            conn.commit()

            return jsonify({'message': 'Lembrete deletado com sucesso!'}), 200

        except Error as e:
            conn.rollback()
            return jsonify({"error": f"Erro no banco de dados: {str(e)}"}), 500
        finally:
            if cursor:
                cursor.close()
            if conn:
                conn.close()

    @app.route('/lembretes/<int:lembrete_id>/concluir', methods=['POST'])
    def concluir_lembrete(lembrete_id):
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Erro na conexão'}), 500

        try:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM lembretes WHERE id = %s", (lembrete_id,))
            lembrete = cursor.fetchone()
            if not lembrete:
                return jsonify({'error': 'Lembrete não encontrado'}), 404

            from datetime import datetime
            data_conclusao = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

            cursor.execute("""
                UPDATE lembretes 
                SET concluido = TRUE, data_conclusao = %s 
                WHERE id = %s
            """, (data_conclusao, lembrete_id))
            conn.commit()

            # Retornar o lembrete atualizado
            cursor.execute("SELECT * FROM lembretes WHERE id = %s", (lembrete_id,))
            updated_lembrete = cursor.fetchone()

            return jsonify(updated_lembrete), 200

        except Error as e:
            conn.rollback()
            return jsonify({"error": f"Erro no banco de dados: {str(e)}"}), 500
        finally:
            if cursor:
                cursor.close()
            if conn:
                conn.close()

    @app.route('/lembretes/<int:lembrete_id>', methods=['OPTIONS'])
    def options_lembrete(lembrete_id):
        response = make_response()
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'DELETE,POST,PUT,PATCH,OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
        return response

