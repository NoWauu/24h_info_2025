#!/bin/bash

# Check Python 3.12+ is available
if ! command -v python3.12 &> /dev/null
then
    echo "Python 3.12 is required but not found. Please install Python 3.12+."
    exit 1
fi

# Create venv folder .venv if it doesn't exist
if [ ! -d ".venv" ]; then
    python3.12 -m venv .venv
fi

# Activate venv
source .venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install dependencies if requirements.txt exists
if [ -f requirements.txt ]; then
    pip install -r requirements.txt
fi

echo "Setup complete. Virtual environment is activated."
echo "Run 'deactivate' to exit the environment."
