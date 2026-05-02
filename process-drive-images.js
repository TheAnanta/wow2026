const fs = require('fs');
const path = require('path');
const axios = require('axios');

// 1. Configuration
const OUTPUT_DIR = path.join(__dirname, 'public', 'images');
const TEAM_STUBS_PATH = path.join(__dirname, 'src', 'services', 'teamStubs.ts');

// Ensure directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 2. Helper to format names (Manas Malla -> manas_malla)
const slugify = (name) => {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special chars
        .replace(/[\s_-]+/g, '_') // Replace spaces/hyphens with underscore
        .replace(/^-+|-+$/g, '');
};

// 3. Helper to extract Drive ID
const getFileId = (url) => {
    const match = url.match(/(?:id=|\/d\/|folders\/)([\w-]+)/);
    return match ? match[1] : null;
};

// 4. Main Processing Function
async function processTeam() {
    console.log('📖 Reading teamStubs.ts...');
    let content = fs.readFileSync(TEAM_STUBS_PATH, 'utf-8');

    // Find the mockTeam array
    const startMarker = 'const mockTeam: TeamMember[] = [';
    const endMarker = '];';
    const startIndex = content.indexOf(startMarker);
    const endIndex = content.lastIndexOf(endMarker);

    if (startIndex === -1 || endIndex === -1) {
        console.error('❌ Could not find mockTeam array in teamStubs.ts');
        return;
    }

    const teamArrayStr = content.substring(startIndex + startMarker.length, endIndex);
    
    // We need to parse individual members. Since it's TS, we'll use a more surgical approach.
    // We'll iterate through all avatar: '...' or avatar: "..." patterns.
    
    const avatarRegex = /avatar:\s*['"](https:\/\/drive\.google\.com\/[^'"]+)['"]/g;
    let match;
    const matches = [];

    while ((match = avatarRegex.exec(teamArrayStr)) !== null) {
        matches.push({
            fullMatch: match[0],
            url: match[1],
            index: match.index + startIndex + startMarker.length
        });
    }

    console.log(`🔍 Found ${matches.length} Drive avatars to process.`);

    // For each match, we need to find the name of the member it belongs to.
    // We'll search backwards from the avatar index for "name: '...'"
    
    for (let i = 0; i < matches.length; i++) {
        const m = matches[i];
        const searchRange = content.substring(0, m.index);
        const nameMatch = searchRange.match(/name:\s*['"]([^'"]+)['"]/g);
        
        if (!nameMatch) {
            console.warn(`⚠️ Could not find name for avatar at index ${m.index}`);
            continue;
        }

        const nameLine = nameMatch[nameMatch.length - 1];
        const name = nameLine.match(/['"]([^'"]+)['"]/)[1];
        
        const fileId = getFileId(m.url);
        if (!fileId) {
            console.warn(`⚠️ Invalid Drive ID for ${name}`);
            continue;
        }

        const fileName = `${slugify(name)}.jpg`;
        const localPath = path.join(OUTPUT_DIR, fileName);
        const publicPath = `/images/${fileName}`;

        try {
            console.log(`Downloading image for: ${name}...`);

            const response = await axios({
                url: `https://lh3.googleusercontent.com/d/${fileId}`,
                method: 'GET',
                responseType: 'stream',
                headers: {
                    'User-Agent': 'Mozilla/5.0'
                }
            });

            const writer = fs.createWriteStream(localPath);
            response.data.pipe(writer);

            await new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });

            console.log(`✅ Saved ${name}'s image to ${publicPath}`);

            // Replace the URL in the content string
            // Note: We need to be careful with indices if we replace as we go.
            // But since we are replacing with paths that might have different lengths,
            // we should probably do it in reverse order or use a placeholder approach.
        } catch (error) {
            console.error(`❌ Failed to download ${name}'s image: ${error.message}`);
        }
    }

    // Second pass to replace the content (more robust)
    let finalContent = content;
    
    // Refresh matches to get fresh indices or just use a global replace for the specific URLs
    for (const m of matches) {
        const searchRange = finalContent.substring(0, finalContent.indexOf(m.url));
        const nameMatch = searchRange.match(/name:\s*['"]([^'"]+)['"]/g);
        if (!nameMatch) continue;
        const name = nameMatch[nameMatch.length - 1].match(/['"]([^'"]+)['"]/)[1];
        const fileName = `${slugify(name)}.jpg`;
        const localPath = path.join(OUTPUT_DIR, fileName);
        
        if (fs.existsSync(localPath)) {
            const publicPath = `/images/${fileName}`;
            finalContent = finalContent.replace(m.url, publicPath);
        }
    }

    fs.writeFileSync(TEAM_STUBS_PATH, finalContent);
    console.log('\n🚀 Done! teamStubs.ts updated with local image paths.');
}

processTeam();