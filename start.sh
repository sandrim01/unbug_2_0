#!/bin/bash
# Install frontend dependencies and build
cd web
npm install
npm run build
cd ..

# Run backend with Uvicorn
# The backend is configured to serve the static files from web/out
export PYTHONPATH=$PYTHONPATH:$(pwd)
python -m uvicorn api.main:app --host 0.0.0.0 --port ${PORT:-8000}
