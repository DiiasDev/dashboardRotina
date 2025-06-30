from flask import Flask # type: ignore
from flask_cors import CORS # type: ignore
from routes import setup_routes
from db import test_connection # type: ignore

app = Flask(__name__)
CORS(app)

setup_routes(app)

@app.route('/status')
def status():
    connected = test_connection()
    color = "#27ae60" if connected else "#e74c3c"
    status_text = "Servidor e banco conectados!" if connected else "Servidor ativo, mas sem conexão com o banco!"
    html = f"""
    <html>
    <head>
        <title>Status do Servidor</title>
        <style>
            body {{
                background: #f4f4f4;
                font-family: Arial, sans-serif;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
            }}
            .circle {{
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: {color};
                margin-bottom: 20px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }}
            .status-text {{
                font-size: 1.3rem;
                color: #222;
                font-weight: bold;
            }}
        </style>
    </head>
    <body>
        <div class="circle"></div>
        <div class="status-text">{status_text}</div>
    </body>
    </html>
    """
    return html

if __name__ == '__main__':
    app.run(debug=True, port=5001)  
    print("🚀 Iniciando servidor...")
    print("📊 Testando conexão com banco...")
    
    if test_connection():
        print("✅ Banco conectado!")
    else:
        print("❌ Erro na conexão com banco!")
        print("⚠️  Verifique as configurações em database.py")
    
    print("🌐 Servidor rodando em: http://localhost:5001")
    app.run(debug=True, port=5000)