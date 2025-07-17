// Cache busting script for deployment
const fs = require('fs');
const path = require('path');

// Update build timestamp
const timestamp = new Date().toISOString();
const buildInfo = {
  buildTime: timestamp,
  version: require('./package.json').version,
  hash: Math.random().toString(36).substring(7)
};

// Create build info file
fs.writeFileSync(
  path.join(__dirname, 'src', 'assets', 'build-info.json'),
  JSON.stringify(buildInfo, null, 2)
);

console.log('Cache busting info generated:', buildInfo);
