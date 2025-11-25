#!/bin/sh
python -c "from db import init_db; init_db()"
uvicorn main:app --host 0.0.0.0 --port 8000
