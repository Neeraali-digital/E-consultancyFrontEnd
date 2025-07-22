// Force favicon update - run this in browser console if favicon doesn't show
(function() {
  // Remove existing favicon links
  const existingLinks = document.querySelectorAll('link[rel*="icon"]');
  existingLinks.forEach(link => link.remove());
  
  // Add new favicon with cache busting
  const timestamp = new Date().getTime();
  
  // SVG favicon (modern browsers)
  const svgLink = document.createElement('link');
  svgLink.rel = 'icon';
  svgLink.type = 'image/svg+xml';
  svgLink.href = `assets/favicon.svg?v=${timestamp}`;
  document.head.appendChild(svgLink);
  
  // ICO favicon (fallback)
  const icoLink = document.createElement('link');
  icoLink.rel = 'shortcut icon';
  icoLink.type = 'image/x-icon';
  icoLink.href = `favicon.ico?v=${timestamp}`;
  document.head.appendChild(icoLink);
  
  console.log('✅ Favicon updated with cache busting!');
  console.log('🔄 If still not showing, try Ctrl+F5 to hard refresh');
})();
