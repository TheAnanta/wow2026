const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

const TARGET_DIRS = ['src'];
const PUBLIC_IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

// Ensure public/images exists
if (!fs.existsSync(PUBLIC_IMAGES_DIR)) {
    fs.mkdirSync(PUBLIC_IMAGES_DIR, { recursive: true });
}

const IMAGE_REGEX = /https?:\/\/[^\s"'()]+?\.(?:png|jpg|jpeg|webp|svg|gif|avif)(?:\?[^\s"'()]*)?/gi;

async function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                const fileStream = fs.createWriteStream(dest);
                res.pipe(fileStream);
                fileStream.on('finish', () => {
                    fileStream.close();
                    resolve();
                });
            } else {
                reject(new Error(`Failed to download: ${res.statusCode} for ${url}`));
            }
        }).on('error', reject);
    });
}

function getFilename(url) {
    // Special handling for web.archive.org and complex URLs
    let cleanUrl = url.split('?')[0];
    if (cleanUrl.includes('im_/')) {
        cleanUrl = cleanUrl.split('im_/')[1];
    }
    
    const parts = cleanUrl.split('/');
    let filename = parts[parts.length - 1];
    
    // If filename looks generic or empty, use a hash of the URL
    if (!filename || filename.length < 3 || !filename.includes('.')) {
        const hash = crypto.createHash('md5').update(url).digest('hex').substring(0, 8);
        filename = `img_${hash}.webp`;
    }
    
    return filename;
}

async function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const matches = content.match(IMAGE_REGEX);
    
    if (!matches) return;

    const uniqueUrls = [...new Set(matches)];
    console.log(`Processing ${filePath}: found ${uniqueUrls.length} unique external images`);

    for (const url of uniqueUrls) {
        // Skip already local images
        if (url.startsWith('/images/')) continue;
        
        try {
            const filename = getFilename(url);
            const destPath = path.join(PUBLIC_IMAGES_DIR, filename);
            
            if (!fs.existsSync(destPath)) {
                console.log(`  Downloading ${url} -> ${filename}`);
                await downloadImage(url, destPath);
            }
            
            const localPath = `/images/${filename}`;
            // Use regex with escape to replace all occurrences
            const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            content = content.replace(new RegExp(escapedUrl, 'g'), localPath);
        } catch (error) {
            console.error(`  Error processing ${url}: ${error.message}`);
        }
    }

    fs.writeFileSync(filePath, content);
}

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach( f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

async function run() {
    console.log('Starting image migration...');
    
    for (const target of TARGET_DIRS) {
        const fullTarget = path.join(process.cwd(), target);
        if (!fs.existsSync(fullTarget)) continue;
        
        walkDir(fullTarget, (filePath) => {
            if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.js') || filePath.endsWith('.jsx') || filePath.endsWith('.json') || filePath.endsWith('.css')) {
                processFile(filePath).catch(err => console.error(`Error in ${filePath}:`, err));
            }
        });
    }
}

run().then(() => {
    // Also process public/data if it exists
    const dataDir = path.join(process.cwd(), 'src', 'data');
    if (fs.existsSync(dataDir)) {
        walkDir(dataDir, (filePath) => {
            if (filePath.endsWith('.json')) {
                processFile(filePath).catch(err => console.error(`Error in ${filePath}:`, err));
            }
        });
    }
});
