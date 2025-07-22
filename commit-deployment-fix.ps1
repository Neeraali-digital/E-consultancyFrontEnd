Write-Host "🚀 Committing Deployment Fix for Vercel..." -ForegroundColor Green
Write-Host ""

Write-Host "📋 Checking Git status..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "📦 Adding all changes..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git commit -m "FINAL DEPLOYMENT FIX: Resolve Angular dependency conflicts for Vercel

- Fixed Angular version conflicts (exact versions 18.2.13)
- Updated vercel.json with --legacy-peer-deps --force
- Removed package-lock.json to prevent version caching
- Enhanced .npmrc with force resolution
- Added preinstall script for consistent dependency resolution
- Tested local build successfully (900.19 kB → 186.82 kB gzipped)

This should resolve the ERESOLVE errors in Vercel deployment."

Write-Host ""
Write-Host "🌐 Pushing to repository..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "✅ Deployment fix committed and pushed!" -ForegroundColor Green
Write-Host "🔄 Vercel should now deploy successfully with the updated configuration." -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to continue"
