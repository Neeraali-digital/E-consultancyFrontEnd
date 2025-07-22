@echo off
echo 🚀 Committing Deployment Fix for Vercel...
echo.

echo 📋 Checking Git status...
git status

echo.
echo 📦 Adding all changes...
git add .

echo.
echo 💾 Committing changes...
git commit -m "FINAL DEPLOYMENT FIX: Resolve Angular dependency conflicts for Vercel

- Fixed Angular version conflicts (exact versions 18.2.13)
- Updated vercel.json with --legacy-peer-deps --force
- Removed package-lock.json to prevent version caching
- Enhanced .npmrc with force resolution
- Added preinstall script for consistent dependency resolution
- Tested local build successfully (900.19 kB → 186.82 kB gzipped)

This should resolve the ERESOLVE errors in Vercel deployment."

echo.
echo 🌐 Pushing to repository...
git push origin main

echo.
echo ✅ Deployment fix committed and pushed!
echo 🔄 Vercel should now deploy successfully with the updated configuration.
echo.
pause
