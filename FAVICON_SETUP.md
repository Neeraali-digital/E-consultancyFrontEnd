# 🎯 Wayzon Favicon Setup Guide

## Quick Setup Instructions

### Step 1: Prepare Your Image
1. Place your favicon image in `src/assets/` folder
2. Recommended: Square image, minimum 512x512px
3. PNG format preferred for best quality

### Step 2: Generate Favicon Files
1. Visit [Favicon.io](https://favicon.io/favicon-generator/) or [RealFaviconGenerator](https://realfavicongenerator.net/)
2. Upload your image
3. Download the generated favicon package
4. Extract the following files to `src/assets/icons/`:

#### Required Files:
- `favicon.ico` (16x16, 32x32, 48x48)
- `favicon-16x16.png`
- `favicon-32x32.png` 
- `favicon-48x48.png`
- `favicon-192x192.png`
- `favicon-512x512.png`
- `apple-touch-icon.png` (180x180)
- `mstile-150x150.png`

### Step 3: Verify Setup
1. Run `npm run favicon` to check if your image is ready
2. Build the project: `npm run build`
3. Test in browser - you should see your new favicon!

## Current Configuration

The app is already configured to use favicons from `src/assets/icons/` folder.

### HTML Configuration (already done):
```html
<link rel="icon" type="image/x-icon" href="assets/icons/favicon.ico">
<link rel="icon" type="image/png" sizes="16x16" href="assets/icons/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="assets/icons/favicon-32x32.png">
<!-- ... and more sizes -->
```

### PWA Manifest (already configured):
- `src/assets/site.webmanifest` - for PWA support
- `src/assets/browserconfig.xml` - for Windows tiles

## Troubleshooting

### Favicon not showing?
1. Clear browser cache (Ctrl+F5)
2. Check browser developer tools for 404 errors
3. Verify files exist in `src/assets/icons/`
4. Rebuild the project

### Need different sizes?
Update the HTML in `src/index.html` and add your custom sizes.

## Brand Guidelines

**Wayzon Educational Consultancy**
- Primary Color: #3B82F6 (Blue)
- Theme: Educational, Professional, Trustworthy
- Established: 2003
- Motto: "Trusted Educational Consultancy Since 2003"

Make sure your favicon reflects the Wayzon brand identity!
