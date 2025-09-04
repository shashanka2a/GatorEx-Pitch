#!/bin/bash

# GatorEx Pitch Deck PDF Generator
# This script builds the project, starts the server, generates the PDF, and cleans up

echo "🎯 GatorEx Pitch Deck PDF Generator"
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the build errors first."
    exit 1
fi

# Start the server in the background
echo "🚀 Starting the server..."
npm run start &
SERVER_PID=$!

# Wait for server to start
echo "⏳ Waiting for server to start..."
sleep 5

# Check if server is running
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ Server failed to start. Please check for port conflicts."
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

echo "✅ Server is running!"

# Generate PDF
echo "📄 Generating PDF..."
npm run generate-pdf

PDF_EXIT_CODE=$?

# Stop the server
echo "🛑 Stopping the server..."
kill $SERVER_PID 2>/dev/null

# Check if PDF generation was successful
if [ $PDF_EXIT_CODE -eq 0 ]; then
    echo "🎉 PDF generation complete!"
    echo "📄 Output: GatorEx-Pitch-Deck.pdf"
    
    # Open PDF if on macOS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "📖 Opening PDF..."
        open GatorEx-Pitch-Deck.pdf
    fi
else
    echo "❌ PDF generation failed."
    exit 1
fi