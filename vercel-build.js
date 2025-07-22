const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Cross-platform recursive copy function
function copyFolderRecursiveSync(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  if (fs.lstatSync(source).isDirectory()) {
    const files = fs.readdirSync(source);
    files.forEach(file => {
      const curSource = path.join(source, file);
      const curTarget = path.join(target, file);

      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, curTarget);
      } else {
        fs.copyFileSync(curSource, curTarget);
      }
    });
  }
}

// Ensure dependencies are installed with legacy peer deps
console.log('📦 Installing dependencies with legacy peer deps...');
try {
  execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully!');
} catch (error) {
  console.log('⚠️ Dependency installation had warnings, continuing...');
}

// Run cache busting
console.log('🔄 Running cache busting...');
try {
  execSync('node cache-bust.js', { stdio: 'inherit' });
} catch (error) {
  console.log('⚠️ Cache busting failed, continuing without it...');
}

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
      // Copy directory recursively (cross-platform)
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }

      // Use fs methods instead of cp for cross-platform compatibility
      copyFolderRecursiveSync(srcPath, destPath);
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
