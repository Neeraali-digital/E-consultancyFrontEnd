#!/usr/bin/env node

// Deployment fix script for Vercel
// This script handles Angular dependency conflicts during deployment

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing deployment dependencies...');

// Create a temporary package.json with fixed versions
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Ensure all Angular packages use the same version
const angularVersion = '18.2.13';
const angularPackages = [
  '@angular/animations',
  '@angular/cdk',
  '@angular/common',
  '@angular/compiler',
  '@angular/core',
  '@angular/forms',
  '@angular/material',
  '@angular/platform-browser',
  '@angular/platform-server',
  '@angular/router',
  '@angular/ssr'
];

console.log('📦 Normalizing Angular package versions...');
angularPackages.forEach(pkg => {
  if (packageJson.dependencies[pkg]) {
    packageJson.dependencies[pkg] = `^${angularVersion}`;
  }
});

// Write the fixed package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('✅ Package.json normalized');

// Install with legacy peer deps
console.log('📥 Installing dependencies with legacy peer deps...');
try {
  execSync('npm install --legacy-peer-deps --force', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully');
} catch (error) {
  console.error('❌ Dependency installation failed:', error.message);
  process.exit(1);
}

// Build the application
console.log('🏗️ Building application...');
try {
  execSync('npm run build:prod', { stdio: 'inherit' });
  console.log('✅ Build completed successfully');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

console.log('🎉 Deployment preparation complete!');
