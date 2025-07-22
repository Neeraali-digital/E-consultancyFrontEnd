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

// Simple build approach for deployment
console.log('🚀 Building Angular application for deployment...');

// Ensure dependencies are installed with legacy peer deps
console.log('📦 Installing dependencies...');
try {
  execSync('npm install --legacy-peer-deps --force', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully!');
} catch (error) {
  console.log('⚠️ Dependency installation failed, continuing with build...');
}

// Use a simple build command that works with the current setup
try {
  execSync('npx ng build --configuration production --output-path=dist/E-consultancyFrontend', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.log('⚠️ Build failed, trying alternative approach...');

  // Fallback: try without configuration
  try {
    execSync('npx ng build --output-path=dist/E-consultancyFrontend', { stdio: 'inherit' });
    console.log('✅ Fallback build completed!');
  } catch (fallbackError) {
    console.error('❌ Both build attempts failed');
    process.exit(1);
  }
}

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
