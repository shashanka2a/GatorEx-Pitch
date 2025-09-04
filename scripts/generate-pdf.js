const puppeteer = require('puppeteer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  baseUrl: 'http://localhost:3000',
  outputDir: './screenshots',
  pdfOutput: './GatorEx-Pitch-Deck.pdf',
  viewport: {
    width: 1920,
    height: 1080,
    deviceScaleFactor: 2 // For HD quality
  },
  slideCount: 12, // Total number of slides (0-11) - all slides
  delay: 2000 // Wait time for animations to complete
};

async function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function takeScreenshots() {
  console.log('🚀 Starting screenshot capture...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport(CONFIG.viewport);
  
  // Ensure output directory exists
  await ensureDirectoryExists(CONFIG.outputDir);
  
  const screenshots = [];
  
  for (let slideIndex = 0; slideIndex < CONFIG.slideCount; slideIndex++) {
    console.log(`📸 Capturing slide ${slideIndex + 1}/${CONFIG.slideCount}...`);
    
    try {
      // Navigate to the specific slide
      await page.goto(`${CONFIG.baseUrl}`, { waitUntil: 'networkidle0' });
      
      // Wait for the page to load
      await page.waitForSelector('.h-screen', { timeout: 10000 });
      
      // Navigate to the specific slide using keyboard navigation
      for (let i = 0; i < slideIndex; i++) {
        await page.keyboard.press('ArrowRight');
        await new Promise(resolve => setTimeout(resolve, 500)); // Wait for slide transition
      }
      
      // Wait for animations to complete
      await new Promise(resolve => setTimeout(resolve, CONFIG.delay));
      
      // Take screenshot
      const filename = `slide-${String(slideIndex + 1).padStart(2, '0')}.png`;
      const filepath = path.join(CONFIG.outputDir, filename);
      
      await page.screenshot({
        path: filepath,
        fullPage: false,
        type: 'png'
      });
      
      screenshots.push({
        index: slideIndex,
        filename,
        filepath
      });
      
      console.log(`✅ Slide ${slideIndex + 1} captured: ${filename}`);
      
    } catch (error) {
      console.error(`❌ Error capturing slide ${slideIndex + 1}:`, error.message);
    }
  }
  
  await browser.close();
  console.log(`📸 Screenshot capture complete! ${screenshots.length} slides captured.`);
  
  return screenshots;
}

async function createPDF(screenshots) {
  console.log('📄 Creating PDF from screenshots...');
  
  const doc = new PDFDocument({
    size: [1920, 1080], // Match screenshot dimensions
    margins: { top: 0, bottom: 0, left: 0, right: 0 }
  });
  
  // Pipe the PDF to a file
  doc.pipe(fs.createWriteStream(CONFIG.pdfOutput));
  
  for (let i = 0; i < screenshots.length; i++) {
    const screenshot = screenshots[i];
    
    console.log(`📄 Adding slide ${screenshot.index + 1} to PDF...`);
    
    try {
      if (i > 0) {
        doc.addPage();
      }
      
      // Add the screenshot to the PDF
      doc.image(screenshot.filepath, 0, 0, {
        width: 1920,
        height: 1080
      });
      
    } catch (error) {
      console.error(`❌ Error adding slide ${screenshot.index + 1} to PDF:`, error.message);
    }
  }
  
  // Finalize the PDF
  doc.end();
  
  return new Promise((resolve, reject) => {
    doc.on('end', () => {
      console.log(`✅ PDF created successfully: ${CONFIG.pdfOutput}`);
      resolve();
    });
    
    doc.on('error', (error) => {
      console.error('❌ Error creating PDF:', error);
      reject(error);
    });
  });
}

async function cleanupScreenshots(screenshots) {
  console.log('🧹 Cleaning up screenshot files...');
  
  for (const screenshot of screenshots) {
    try {
      fs.unlinkSync(screenshot.filepath);
    } catch (error) {
      console.warn(`⚠️ Could not delete ${screenshot.filename}:`, error.message);
    }
  }
  
  // Remove screenshots directory if empty
  try {
    fs.rmdirSync(CONFIG.outputDir);
    console.log('🧹 Screenshots directory cleaned up.');
  } catch (error) {
    console.warn('⚠️ Screenshots directory not empty or could not be removed.');
  }
}

async function main() {
  console.log('🎯 GatorEx Pitch Deck PDF Generator');
  console.log('=====================================');
  
  try {
    // Check if server is running
    console.log(`🔍 Checking if server is running at ${CONFIG.baseUrl}...`);
    
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    try {
      await page.goto(CONFIG.baseUrl, { waitUntil: 'networkidle0', timeout: 10000 });
      console.log('✅ Server is running!');
    } catch (error) {
      console.error('❌ Server is not running. Please start the development server with:');
      console.error('   npm run dev');
      console.error('   or');
      console.error('   npm run start (if built)');
      process.exit(1);
    } finally {
      await browser.close();
    }
    
    // Take screenshots
    const screenshots = await takeScreenshots();
    
    if (screenshots.length === 0) {
      console.error('❌ No screenshots were captured. Exiting.');
      process.exit(1);
    }
    
    // Create PDF
    await createPDF(screenshots);
    
    // Clean up screenshots (optional - comment out if you want to keep them)
    await cleanupScreenshots(screenshots);
    
    console.log('🎉 PDF generation complete!');
    console.log(`📄 Output: ${CONFIG.pdfOutput}`);
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Handle command line arguments
if (process.argv.includes('--keep-screenshots')) {
  console.log('📸 Screenshots will be kept after PDF generation.');
  // Override cleanup function to do nothing
  cleanupScreenshots = async () => {
    console.log('📸 Keeping screenshots as requested.');
  };
}

if (process.argv.includes('--help')) {
  console.log('GatorEx Pitch Deck PDF Generator');
  console.log('');
  console.log('Usage: node scripts/generate-pdf.js [options]');
  console.log('');
  console.log('Options:');
  console.log('  --keep-screenshots    Keep screenshot files after PDF generation');
  console.log('  --help               Show this help message');
  console.log('');
  console.log('Make sure your development server is running on http://localhost:3000');
  process.exit(0);
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { main, takeScreenshots, createPDF };