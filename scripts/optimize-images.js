import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const imagesDir = path.join(process.cwd(), 'images');

async function processDirectory(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            await processDirectory(fullPath);
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                await optimizeImage(fullPath);
            }
        }
    }
}

async function optimizeImage(filePath) {
    const parsedPath = path.parse(filePath);
    const webpPath = path.join(parsedPath.dir, `${parsedPath.name}.webp`);

    try {
        console.log(`Optimizing: ${filePath} -> ${webpPath}`);

        let targetWidth = 1920;

        // If image is inside a folder named 'staff', make it much smaller
        // EXCEPT for the group photos used in the carousel
        const isStaffFolder = filePath.includes(path.sep + 'staff' + path.sep) || filePath.includes('/staff/');
        const isCarouselImage = parsedPath.name.includes('foto grupal') || parsedPath.name.includes('Directiva');

        if (isStaffFolder && !isCarouselImage) {
            targetWidth = 500;
        }

        await sharp(filePath)
            .resize({ width: targetWidth, withoutEnlargement: true }) // Don't enlarge smaller images
            .webp({ quality: 80 }) // Good balance of quality and size
            .toFile(webpPath);

        // Optional: Delete the original file after successful conversion
        // await fs.unlink(filePath);
        console.log(`✅ Success: ${webpPath} (Width: ${targetWidth}px)`);
    } catch (error) {
        console.error(`❌ Error optimizing ${filePath}:`, error);
    }
}

async function main() {
    console.log('Starting image optimization...');
    await processDirectory(imagesDir);
    console.log('Optimization complete!');
}

main().catch(console.error);
