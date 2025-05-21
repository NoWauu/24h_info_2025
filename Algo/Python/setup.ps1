# Check Python 3.12+ availability
$pythonVersion = & python --version 2>&1
if (-not $pythonVersion -or $pythonVersion -notmatch "Python 3\.1[0-9]") {
    Write-Error "Python 3.10+ is required but was not found."
    exit 1
}

# Create venv folder .venv if it doesn't exist
if (-not (Test-Path ".venv")) {
    python -m venv .venv
}

# Activate virtual environment
$activate = ".venv\Scripts\Activate.ps1"
if (Test-Path $activate) {
    & $activate
} else {
    Write-Error "Activation script not found."
    exit 1
}

# Upgrade pip
.venv\Scripts\python.exe -m pip install --upgrade pip

# Install dependencies if requirements.txt exists
if (Test-Path "requirements.txt") {
    pip install -r requirements.txt
}

Write-Host "Setup complete. Virtual environment is activated."
Write-Host "Run 'deactivate' to exit the environment."
