# GatorEx Pitch Deck PDF Generator

This script automatically captures HD screenshots of each slide in the GatorEx pitch deck and converts them into a professional PDF presentation.

## Features

- 📸 **HD Screenshots**: Captures each slide at 1920x1080 resolution with 2x device scale factor
- 📄 **PDF Generation**: Combines all screenshots into a single PDF file
- 🎯 **Automated Navigation**: Automatically navigates through all slides
- 🧹 **Cleanup**: Optionally removes screenshot files after PDF creation
- ⚡ **Fast & Reliable**: Uses Puppeteer for consistent screenshot capture

## Prerequisites

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   The server should be running at `http://localhost:3000`

## Usage

### Basic Usage
```bash
npm run generate-pdf
```
or
```bash
npm run pdf
```

### Keep Screenshots
If you want to keep the individual screenshot files:
```bash
npm run generate-pdf -- --keep-screenshots
```

### Help
```bash
node scripts/generate-pdf.js --help
```

## Output

- **PDF File**: `GatorEx-Pitch-Deck.pdf` (in project root)
- **Screenshots**: `screenshots/slide-01.png`, `slide-02.png`, etc. (temporary, deleted by default)

## Configuration

You can modify the script configuration in `scripts/generate-pdf.js`:

```javascript
const CONFIG = {
  baseUrl: 'http://localhost:3000',     // Server URL
  outputDir: './screenshots',           // Screenshot directory
  pdfOutput: './GatorEx-Pitch-Deck.pdf', // PDF output path
  viewport: {
    width: 1920,                        // Screenshot width
    height: 1080,                       // Screenshot height
    deviceScaleFactor: 2                // HD quality multiplier
  },
  slideCount: 12,                       // Total number of slides
  delay: 2000                          // Wait time for animations (ms)
};
```

## Troubleshooting

### Server Not Running
```
❌ Server is not running. Please start the development server with:
   npm run dev
```
**Solution**: Make sure your Next.js development server is running on port 3000.

### Screenshot Capture Issues
- Increase the `delay` value in CONFIG if animations aren't completing
- Check that all slides are accessible via keyboard navigation
- Ensure no modal dialogs or overlays are blocking the content

### PDF Generation Issues
- Make sure you have write permissions in the project directory
- Check available disk space for large PDF files
- Verify that all screenshot files were created successfully

## Technical Details

### Dependencies
- **puppeteer**: Headless Chrome automation for screenshots
- **pdfkit**: PDF generation and manipulation

### Process Flow
1. Launch headless Chrome browser
2. Navigate to the pitch deck
3. For each slide:
   - Navigate using keyboard arrows
   - Wait for animations to complete
   - Capture HD screenshot
4. Create PDF document
5. Add each screenshot as a full-page image
6. Save PDF and cleanup temporary files

### Screenshot Quality
- Resolution: 1920x1080 (Full HD)
- Device Scale Factor: 2x (for crisp text and graphics)
- Format: PNG (lossless quality)
- PDF: Full-page images with no margins

## Customization

### Adding Slide Titles
To add slide titles to the PDF, modify the `createPDF` function:

```javascript
// Add title overlay
doc.fontSize(24)
   .fillColor('white')
   .text('Slide Title', 50, 50);
```

### Different Output Formats
The script can be modified to output individual images or different PDF layouts by adjusting the PDFKit configuration.

### Batch Processing
For multiple presentations, you can modify the script to accept different URLs or slide counts as command-line arguments.

## License

This script is part of the GatorEx project and follows the same license terms.