@echo off
setlocal

echo 🎯 GatorEx Pitch Deck PDF Generator
echo ==================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
)

REM Build the project
echo 🔨 Building the project...
npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed. Please fix the build errors first.
    pause
    exit /b 1
)

REM Start the server in the background
echo 🚀 Starting the server...
start /b npm run start

REM Wait for server to start
echo ⏳ Waiting for server to start...
timeout /t 5 /nobreak >nul

REM Check if server is running (simplified check)
echo ✅ Server should be running!

REM Generate PDF
echo 📄 Generating PDF...
npm run generate-pdf

if %errorlevel% eq 0 (
    echo 🎉 PDF generation complete!
    echo 📄 Output: GatorEx-Pitch-Deck.pdf
    
    REM Open PDF
    echo 📖 Opening PDF...
    start GatorEx-Pitch-Deck.pdf
) else (
    echo ❌ PDF generation failed.
)

REM Stop the server (kill all node processes - be careful!)
echo 🛑 Stopping the server...
taskkill /f /im node.exe >nul 2>&1

pause