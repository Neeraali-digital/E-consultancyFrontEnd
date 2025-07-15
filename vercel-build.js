const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Run the Angular build
console.log('🚀 Building Angular application...');
execSync('ng build --configuration production', { stdio: 'inherit' });

// Copy files from browser directory to root for Vercel
console.log('📁 Copying files for Vercel...');
const browserDir = path.join(__dirname, 'dist/E-consultancyFrontend/browser');
const rootDir = path.join(__dirname, 'dist/E-consultancyFrontend');

if (fs.existsSync(browserDir)) {
  // Copy all files from browser to root
  const files = fs.readdirSync(browserDir);
  files.forEach(file => {
    const srcPath = path.join(browserDir, file);
    const destPath = path.join(rootDir, file);

    if (fs.statSync(srcPath).isDirectory()) {
      // Copy directory recursively
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      execSync(`cp -r "${srcPath}/*" "${destPath}/"`, { stdio: 'inherit' });
    } else {
      // Copy file
      fs.copyFileSync(srcPath, destPath);
    }
  });

  console.log('✅ Files copied successfully!');
} else {
  console.log('⚠️ Browser directory not found, using default build output');
}

console.log('✅ Build completed successfully!');
