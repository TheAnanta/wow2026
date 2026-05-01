const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Added your requested widths
  const viewports = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Laptop', width: 1024, height: 768 },
    { name: 'Desktop-Mid', width: 1440, height: 900 },
    { name: 'Desktop-Wide', width: 1920, height: 1080 }
  ];

  // Get URLs from command line arguments
  const relativeUrls = process.argv.slice(2); 
  const baseUrl = process.env.TARGET_URL || 'http://localhost:3000';

  // If no specific pages changed (e.g., global CSS change), default to home
  const urlsToTest = relativeUrls.length > 0 ? relativeUrls : ['/'];

  for (const url of urlsToTest) {
    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      
      // Navigate to the specific page
      await page.goto(`${baseUrl}${url}`, { waitUntil: 'networkidle' });
      
      // Clean the URL name for the filename (e.g., /about/team -> about-team)
      const safeUrl = url.replace(/\//g, '-').replace(/^-|-$/g, '') || 'home';
      
      await page.screenshot({ 
          path: `./screenshots/${safeUrl}-${vp.width}.png`, 
          fullPage: true 
      });
      console.log(`Captured ${safeUrl} at ${vp.width}px`);
    }
  }

  await browser.close();
})();