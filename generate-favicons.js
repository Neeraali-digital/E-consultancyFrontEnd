const fs = require('fs');
const path = require('path');

// Favicon generation script for Wayzon Educational Consultancy
console.log('🎯 Wayzon Favicon Generator');
console.log('=====================================');

const sourceImagePath = 'src/assets/wayzon-logo.png'; // Update this to your image path
const outputDir = 'src/assets/icons';

// Check if source image exists
if (!fs.existsSync(sourceImagePath)) {
  console.log('❌ Source image not found at:', sourceImagePath);
  console.log('📝 Please place your favicon image at:', sourceImagePath);
  console.log('');
  console.log('🔧 Manual Steps:');
  console.log('1. Place your favicon image in src/assets/ folder');
  console.log('2. Rename it to "wayzon-logo.png" (or update the script)');
  console.log('3. Use an online favicon generator like:');
  console.log('   - https://favicon.io/favicon-generator/');
  console.log('   - https://realfavicongenerator.net/');
  console.log('4. Generate the following sizes:');
  console.log('   - favicon.ico (16x16, 32x32, 48x48)');
  console.log('   - favicon-16x16.png');
  console.log('   - favicon-32x32.png');
  console.log('   - favicon-48x48.png');
  console.log('   - favicon-192x192.png');
  console.log('   - favicon-512x512.png');
  console.log('   - apple-touch-icon.png (180x180)');
  console.log('   - mstile-150x150.png');
  console.log('5. Place all generated files in src/assets/icons/');
  console.log('');
  console.log('✅ The HTML is already configured to use these files!');
  process.exit(1);
}

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('✅ Source image found!');
console.log('📁 Output directory ready:', outputDir);
console.log('');
console.log('🔧 Next Steps:');
console.log('1. Use an online favicon generator with your image');
console.log('2. Download the generated favicon package');
console.log('3. Extract files to src/assets/icons/');
console.log('4. Your app will automatically use the new favicons!');
console.log('');
console.log('🌟 Recommended favicon generator:');
console.log('   https://favicon.io/favicon-generator/');
console.log('   https://realfavicongenerator.net/');
