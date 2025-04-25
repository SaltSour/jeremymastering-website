/**
 * Image optimization script for development
 * This script optimizes images in the public directory to reduce size
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { execSync } = require('child_process');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// Check if sharp is installed
try {
  require.resolve('sharp');
} catch (e) {
  console.error('Sharp is not installed. Please run "npm install sharp" first.');
  process.exit(1);
}

const sharp = require('sharp');

// Directories to process
const directories = [
  path.join(__dirname, '../public/projects'),
  path.join(__dirname, '../public/images'),
];

// Image extensions to process
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

// Maximum dimensions
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;

// Quality settings
const JPEG_QUALITY = 80;
const PNG_QUALITY = 80;
const WEBP_QUALITY = 75;

// Process a single image file
async function processImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!IMAGE_EXTENSIONS.includes(ext)) return;
  
  console.log(`Processing: ${filePath}`);
  
  try {
    // Get image info
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Skip if already optimized
    if (metadata.width <= MAX_WIDTH && metadata.height <= MAX_HEIGHT) {
      console.log(`  Already optimized: ${path.basename(filePath)}`);
      return;
    }
    
    // Resize only if needed
    let pipeline = image.resize({
      width: Math.min(metadata.width, MAX_WIDTH),
      height: Math.min(metadata.height, MAX_HEIGHT),
      fit: 'inside',
      withoutEnlargement: true
    });
    
    // Set format-specific options
    if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg({ quality: JPEG_QUALITY });
    } else if (ext === '.png') {
      pipeline = pipeline.png({ quality: PNG_QUALITY });
    } else if (ext === '.webp') {
      pipeline = pipeline.webp({ quality: WEBP_QUALITY });
    }
    
    // Save optimized image
    await pipeline.toBuffer().then(data => {
      fs.writeFileSync(filePath, data);
      console.log(`  Optimized: ${path.basename(filePath)}`);
    });
  } catch (err) {
    console.error(`  Error processing ${filePath}:`, err.message);
  }
}

// Process all images in a directory
async function processDirectory(directoryPath) {
  try {
    const files = await readdir(directoryPath);
    
    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const fileStat = await stat(filePath);
      
      if (fileStat.isDirectory()) {
        await processDirectory(filePath);
      } else if (fileStat.isFile()) {
        await processImage(filePath);
      }
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(`Directory does not exist: ${directoryPath}`);
    } else {
      console.error(`Error reading directory ${directoryPath}:`, err.message);
    }
  }
}

// Main function
async function main() {
  console.log('Starting image optimization...');
  
  for (const dir of directories) {
    console.log(`\nProcessing directory: ${dir}`);
    await processDirectory(dir);
  }
  
  console.log('\nImage optimization complete!');
}

// Run the optimization
main().catch(err => {
  console.error('Optimization failed:', err);
  process.exit(1);
});