const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Run the Angular build
console.log('🚀 Building Angular application...');
execSync('npm run build:prod', { stdio: 'inherit' });

// Create a simple server.js file for Vercel
console.log('📝 Creating server configuration...');
const vercelServerJs = `
// Simple Express server for Vercel
const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'dist/E-consultancyFrontend')));

// Handle SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/E-consultancyFrontend/index.html'));
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});
`;

// Write the server.js file
fs.writeFileSync(path.join(__dirname, 'server.js'), vercelServerJs);

console.log('✅ Build completed successfully!');
