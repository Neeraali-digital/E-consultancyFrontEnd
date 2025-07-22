@echo off
REM 🚀 Wayzon Consultancy - Quick Deployment Script (Windows)
REM This script prepares and deploys the application to production

echo 🚀 Starting Wayzon Consultancy Deployment Process...
echo ==================================================

REM Check if we're in the right directory
if not exist "package.json" (
    echo [ERROR] package.json not found. Please run this script from the E-consultancyFrontend directory.
    pause
    exit /b 1
)

REM Check if Node.js and npm are installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo [INFO] Node.js version:
node --version
echo [INFO] npm version:
npm --version

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo [INFO] Installing dependencies...
    npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
    echo [SUCCESS] Dependencies installed successfully
) else (
    echo [INFO] Dependencies already installed
)

REM Run production build
echo [INFO] Building application for production...
npm run build:prod

if errorlevel 1 (
    echo [ERROR] Production build failed
    pause
    exit /b 1
)

echo [SUCCESS] Production build completed successfully

REM Check if dist directory exists
if not exist "dist\E-consultancyFrontend" (
    echo [ERROR] Build output directory not found
    pause
    exit /b 1
)

echo [SUCCESS] Build completed! Files are ready in: dist\E-consultancyFrontend

echo.
echo 🚀 Deployment Options:
echo ======================
echo 1. Deploy to Vercel (Recommended)
echo 2. Prepare for manual deployment
echo 3. Exit
echo.

set /p choice="Choose deployment option (1-3): "

if "%choice%"=="1" (
    echo [INFO] Deploying to Vercel...
    vercel --version >nul 2>&1
    if errorlevel 1 (
        echo [WARNING] Vercel CLI not installed. Installing...
        npm install -g vercel
        echo [INFO] Please run 'vercel login' first, then run this script again
        pause
        exit /b 0
    )
    vercel --prod
    if errorlevel 1 (
        echo [ERROR] Vercel deployment failed
        pause
        exit /b 1
    )
    echo [SUCCESS] Successfully deployed to Vercel!
) else if "%choice%"=="2" (
    echo [INFO] Preparing for manual deployment...
    echo [SUCCESS] Build files are ready in: dist\E-consultancyFrontend
    echo [INFO] Upload the contents of this directory to your hosting provider
    echo [WARNING] Make sure your server is configured for SPA routing
) else if "%choice%"=="3" (
    echo [INFO] Deployment cancelled
    exit /b 0
) else (
    echo [ERROR] Invalid option selected
    pause
    exit /b 1
)

echo.
echo [SUCCESS] 🎉 Deployment process completed!
echo [INFO] Application: Wayzon Educational Consultancy
echo [INFO] Version: 1.0.1
echo [INFO] Build Date: %date% %time%
echo.
echo [INFO] 📋 Post-deployment checklist:
echo   - Verify homepage loads correctly
echo   - Test navigation and dropdowns
echo   - Check responsive design on mobile/tablet
echo   - Verify Call Now and Apply Now buttons work
echo   - Test admin dashboard access
echo   - Confirm search functionality
echo.
echo [SUCCESS] Happy deploying! 🚀
pause
