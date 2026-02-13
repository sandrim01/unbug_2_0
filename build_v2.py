import PyInstaller.__main__
import os
import shutil

# Cleanup previous builds
if os.path.exists("build"):
    shutil.rmtree("build")
if os.path.exists("dist"):
    shutil.rmtree("dist")

PyInstaller.__main__.run([
    'desktop_app.py',
    '--name=UnbugERP_2.0',
    '--windowed',
    '--onefile',
    '--add-data=web/out;web/out', # Next.js static files
    '--add-data=api;api', # Backend code
    '--hidden-import=uvicorn.logging',
    '--hidden-import=uvicorn.loops',
    '--hidden-import=uvicorn.loops.auto',
    '--hidden-import=uvicorn.protocols',
    '--hidden-import=uvicorn.protocols.http',
    '--hidden-import=uvicorn.protocols.http.auto',
    '--hidden-import=uvicorn.protocols.websockets',
    '--hidden-import=uvicorn.protocols.websockets.auto',
    '--hidden-import=uvicorn.lifespan',
    '--hidden-import=uvicorn.lifespan.on',
    '--hidden-import=engineio.async_drivers.threading',
    '--hidden-import=sqlalchemy',
    '--hidden-import=psycopg2',
    '--hidden-import=bcrypt',
    '--hidden-import=jose',
    '--hidden-import=pydantic_settings',
    '--hidden-import=clr',
])

print("Build 2.0 concluído com sucesso!")
