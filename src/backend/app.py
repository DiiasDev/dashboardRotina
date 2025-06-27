from flask import Flask # type: ignore
from flask_cors import CORS # type: ignore
from routes import setup_routes
from db import test_connection # type: ignore

app = Flask(__name__)
CORS(app)

setup_routes(app)

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # ou 3001, 8000, etc.
    print("🚀 Iniciando servidor...")
    print("📊 Testando conexão com banco...")
    
    # Testa conexão na inicialização
    if test_connection():
        print("✅ Banco conectado!")
    else:
        print("❌ Erro na conexão com banco!")
        print("⚠️  Verifique as configurações em database.py")
    
    print("🌐 Servidor rodando em: http://localhost:5001")
    app.run(debug=True, port=5000)