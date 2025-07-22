#!/bin/bash

# 🚀 Wayzon Consultancy - Quick Deployment Script
# This script prepares and deploys the application to production

echo "🚀 Starting Wayzon Consultancy Deployment Process..."
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the E-consultancyFrontend directory."
    exit 1
fi

# Check if Node.js and npm are installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "Node.js version: $(node --version)"
print_status "npm version: $(npm --version)"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    print_status "Installing dependencies..."
    npm install
    if [ $? -eq 0 ]; then
        print_success "Dependencies installed successfully"
    else
        print_error "Failed to install dependencies"
        exit 1
    fi
else
    print_status "Dependencies already installed"
fi

# Run production build
print_status "Building application for production..."
npm run build:prod

if [ $? -eq 0 ]; then
    print_success "Production build completed successfully"
else
    print_error "Production build failed"
    exit 1
fi

# Check if dist directory exists
if [ ! -d "dist/E-consultancyFrontend" ]; then
    print_error "Build output directory not found"
    exit 1
fi

print_success "Build output size:"
du -sh dist/E-consultancyFrontend

# Deployment options
echo ""
echo "🚀 Deployment Options:"
echo "======================"
echo "1. Deploy to Vercel (Recommended)"
echo "2. Prepare for manual deployment"
echo "3. Exit"
echo ""

read -p "Choose deployment option (1-3): " choice

case $choice in
    1)
        print_status "Deploying to Vercel..."
        if command -v vercel &> /dev/null; then
            vercel --prod
            if [ $? -eq 0 ]; then
                print_success "Successfully deployed to Vercel!"
            else
                print_error "Vercel deployment failed"
                exit 1
            fi
        else
            print_warning "Vercel CLI not installed. Installing..."
            npm install -g vercel
            print_status "Please run 'vercel login' first, then run this script again"
        fi
        ;;
    2)
        print_status "Preparing for manual deployment..."
        print_success "Build files are ready in: dist/E-consultancyFrontend"
        print_status "Upload the contents of this directory to your hosting provider"
        print_warning "Make sure your server is configured for SPA routing"
        ;;
    3)
        print_status "Deployment cancelled"
        exit 0
        ;;
    *)
        print_error "Invalid option selected"
        exit 1
        ;;
esac

echo ""
print_success "🎉 Deployment process completed!"
print_status "Application: Wayzon Educational Consultancy"
print_status "Version: 1.0.1"
print_status "Build Date: $(date)"
echo ""
print_status "📋 Post-deployment checklist:"
echo "  - Verify homepage loads correctly"
echo "  - Test navigation and dropdowns"
echo "  - Check responsive design on mobile/tablet"
echo "  - Verify Call Now and Apply Now buttons work"
echo "  - Test admin dashboard access"
echo "  - Confirm search functionality"
echo ""
print_success "Happy deploying! 🚀"
