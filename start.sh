#!/bin/bash
# O build do frontend já foi feito pelo nixpacks
# Roda o backend
export PYTHONPATH=$PYTHONPATH:$(pwd)
python -m uvicorn api.main:app --host 0.0.0.0 --port ${PORT:-8000}
