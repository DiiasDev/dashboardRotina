from flask import Flask # type: ignore
from flask_cors import CORS # type: ignore
from backend.routes import setup_routes
from db import test_connection # type: ignore

app = Flask(__name__)
CORS(app)

setup_routes(app)

if __name__ == '__main__':
    print("🚀 Iniciando servidor...")
    print("📊 Testando conexão com banco...")
    
    # Testa conexão na inicialização
    if test_connection():
        print("✅ Banco conectado!")
    else:
        print("❌ Erro na conexão com banco!")
        print("⚠️  Verifique as configurações em database.py")
    
    print("🌐 Servidor rodando em: http://localhost:5000")
    app.run(debug=True, port=5000)