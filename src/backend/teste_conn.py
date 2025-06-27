import mysql.connector # type: ignore

try:
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='Gabgrv123',
        database='dashboard'  # Que você criou no DBeaver
    )
    
    cursor = conn.cursor()
    cursor.execute("SHOW TABLES")
    tabelas = cursor.fetchall()
    
    print("✅ Conectado! Tabelas encontradas:")
    for tabela in tabelas:
        print(f"   📋 {tabela[0]}")
        
    conn.close()
    
except Exception as e:
    print(f"❌ Erro: {e}")