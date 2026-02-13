import sys
import os
import time
import socket
import multiprocessing
from PyQt6.QtWidgets import QApplication, QMainWindow, QVBoxLayout, QWidget
from PyQt6.QtWebEngineWidgets import QWebEngineView
from PyQt6.QtCore import QUrl, QTimer, Qt
import uvicorn
from api.main import app

# Redireciona stdout/stderr para evitar erro em modo --noconsole
if getattr(sys, 'frozen', False):
    if sys.stdout is None: sys.stdout = open(os.devnull, 'w')
    if sys.stderr is None: sys.stderr = open(os.devnull, 'w')

def run_backend():
    # Desativa cores para evitar erro sem TTY
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

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Unbug ERP 2.0")
        self.resize(1280, 800)
        self.setMinimumSize(1000, 700)
        
        # Estilo escuro nativo para a borda da janela
        self.setStyleSheet("QMainWindow { background-color: #020617; }")
        
        # Central Widget
        self.central_widget = QWidget()
        self.setCentralWidget(self.central_widget)
        self.layout = QVBoxLayout(self.central_widget)
        self.layout.setContentsMargins(0, 0, 0, 0)
        
        # Web View (Motor Nativo Chromium via PyQt6)
        self.browser = QWebEngineView()
        self.layout.addWidget(self.browser)
        
        # Cor de fundo do navegador antes de carregar
        self.browser.page().setBackgroundColor(Qt.GlobalColor.transparent)

    def load_app(self):
        url = "http://127.0.0.1:8000"
        if not getattr(sys, 'frozen', False) and is_port_open(3000):
            url = "http://localhost:3000"
        self.browser.setUrl(QUrl(url))

if __name__ == "__main__":
    multiprocessing.freeze_support()
    
    # Inicia Backend
    backend_process = multiprocessing.Process(target=run_backend, daemon=True)
    backend_process.start()
    
    # Inicia App Qt
    qt_app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    
    # Timer para verificar se o backend subiu
    def check_backend():
        if is_port_open(8000):
            window.load_app()
            timer.stop()
            
    timer = QTimer()
    timer.timeout.connect(check_backend)
    timer.start(500)
    
    exit_code = qt_app.exec()
    
    # Cleanup
    backend_process.terminate()
    sys.exit(exit_code)
