from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from api.config import settings
from api.database import engine, Base, get_db
from api.models import User, Employee
from api.routes import auth, clients, tickets, service_orders, inventory, finance, projects
import uvicorn
import os
import sys

app = FastAPI(
    title="Unbug ERP API",
    description="Modern Management System for Unbug Solutions TI",
    version="2.0.0"
)

# CORS configuration for Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(clients.router)
app.include_router(tickets.router)
app.include_router(service_orders.router)
app.include_router(inventory.router)
app.include_router(finance.router)
app.include_router(projects.router)

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

# Serve Next.js static files
# When packaged with PyInstaller, the files will be in sys._MEIPASS
if getattr(sys, 'frozen', False):
    static_dir = os.path.join(sys._MEIPASS, "web/out")
else:
    static_dir = os.path.join(os.getcwd(), "web/out")

if os.path.exists(static_dir):
    app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")
else:
    @app.get("/")
    async def root():
        return {"message": "Welcome to Unbug ERP API (Static files not found)", "status": "online"}

if __name__ == "__main__":
    uvicorn.run("api.main:app", host="0.0.0.0", port=8000, reload=False)
