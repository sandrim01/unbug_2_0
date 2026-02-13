import multiprocessing
import uvicorn
import sys
import os
import time
import socket
import subprocess
from api.main import app

# Redireciona stdout/stderr para evitar erro em modo --noconsole
if getattr(sys, 'frozen', False) and sys.stdout is None:
    sys.stdout = open(os.devnull, 'w')
if getattr(sys, 'frozen', False) and sys.stderr is None:
    sys.stderr = open(os.devnull, 'w')

def run_backend():
    # Desativa logging de cores que causa erro sem TTY (executável)
    log_config = uvicorn.config.LOGGING_CONFIG
    log_config["formatters"]["default"]["use_colors"] = False
    log_config["formatters"]["access"]["use_colors"] = False
    
    uvicorn.run(
        app, 
        host="127.0.0.1", 
        port=8000, 
        log_level="error",
        log_config=log_config
    )

def is_port_open(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('127.0.0.1', port)) == 0

def get_edge_path():
    # Lista de caminhos comuns do Edge no Windows
    paths = [
        os.path.join(os.environ.get("ProgramFiles(x86)", "C:\\Program Files (x86)"), "Microsoft\\Edge\\Application\\msedge.exe"),
        os.path.join(os.environ.get("ProgramFiles", "C:\\Program Files"), "Microsoft\\Edge\\Application\\msedge.exe"),
        os.path.join(os.environ.get("LocalAppData", ""), "Microsoft\\Edge\\Application\\msedge.exe")
    ]
    for path in paths:
        if os.path.exists(path):
            return path
    return "msedge.exe" # Tenta pelo PATH se não achar o arquivo

if __name__ == '__main__':
    multiprocessing.freeze_support()
    
    # Inicia o backend
    backend_process = multiprocessing.Process(target=run_backend, daemon=True)
    backend_process.start()
    
    # Aguarda o backend subir
    print("Iniciando Unbug ERP 2.0...")
    for _ in range(15):
        if is_port_open(8000):
            break
        time.sleep(1)

    # URL Final
    url = "http://127.0.0.1:8000"
    if not getattr(sys, 'frozen', False) and is_port_open(3000):
        url = "http://localhost:3000"

    # Lança o Edge em modo Aplicativo (sem barra de endereços, sem abas)
    edge_path = get_edge_path()
    app_mode_cmd = [
        edge_path,
        f"--app={url}",
        "--window-size=1280,800",
        "--window-name=Unbug ERP 2.0",
        "--no-first-run"
    ]
    
    try:
        print(f"Abrindo interface em {url}...")
        # Lança o navegador e aguarda ele fechar
        subprocess.run(app_mode_cmd, check=True)
    except Exception as e:
        print(f"Erro ao abrir o navegador: {e}")
    finally:
        # Quando o navegador fechar, encerra o backend
        print("Finalizando sistema...")
        backend_process.terminate()
        sys.exit(0)
