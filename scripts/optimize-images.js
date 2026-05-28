/**
 * Image Optimizer for Pixel Production
 * ------------------------------------
 * Resizes JPEGs to max 2000px wide & compresses to 85% quality.
 * Originals are backed up to src/images-originals/ on first run.
 *
 * Usage:  node scripts/optimize-images.js
 */

import { existsSync, mkdirSync, cpSync } from 'fs';
import { readdir, stat } from 'fs/promises';
import { join, relative, extname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const IMAGES_DIR = join(ROOT, 'src', 'images');
const BACKUP_DIR = join(ROOT, 'src', 'images-originals');

const MAX_WIDTH = 2000;
const QUALITY = 85;

// ── helpers ──────────────────────────────────────────────

async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...(await walk(full)));
        } else if (/\.jpe?g$/i.test(entry.name)) {
            files.push(full);
        }
    }
    return files;
}

function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
}

// ── main ─────────────────────────────────────────────────

async function main() {
    console.log('\n🖼️  Pixel Production — Image Optimizer');
    console.log('─'.repeat(45));

    // 1. Back up originals (one-time only)
    if (!existsSync(BACKUP_DIR)) {
        console.log('\n📦 Backing up originals to src/images-originals/ ...');
        cpSync(IMAGES_DIR, BACKUP_DIR, { recursive: true });
        console.log('   ✅ Backup created. Your originals are safe.\n');
    } else {
        console.log('\n📦 Backup already exists — skipping.\n');
    }

    // 2. Find all JPEGs
    const files = await walk(IMAGES_DIR);
    console.log(`Found ${files.length} JPEG files to optimize.\n`);

    let totalBefore = 0;
    let totalAfter = 0;
    let skipped = 0;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const rel = relative(IMAGES_DIR, file);

        const before = (await stat(file)).size;
        totalBefore += before;

        try {
            const metadata = await sharp(file).metadata();

            // Skip if already small enough
            if (metadata.width <= MAX_WIDTH && before < 500_000) {
                totalAfter += before;
                skipped++;
                continue;
            }

            const buffer = await sharp(file)
                .resize({
                    width: MAX_WIDTH,
                    withoutEnlargement: true,    // don't upscale small images
                })
                .jpeg({
                    quality: QUALITY,
                    mozjpeg: true,               // best compression at same quality
                })
                .toBuffer();

            // Only overwrite if the result is actually smaller
            if (buffer.length < before) {
                await sharp(buffer).toFile(file);
                totalAfter += buffer.length;
                const pct = ((1 - buffer.length / before) * 100).toFixed(0);
                console.log(`  ✅ ${rel}  ${formatBytes(before)} → ${formatBytes(buffer.length)}  (−${pct}%)`);
            } else {
                totalAfter += before;
                skipped++;
            }
        } catch (err) {
            console.log(`  ⚠️  ${rel}  — skipped (${err.message})`);
            totalAfter += before;
            skipped++;
        }
    }

    console.log('\n' + '─'.repeat(45));
    console.log(`📊 Results:`);
    console.log(`   Files processed: ${files.length - skipped}`);
    console.log(`   Files skipped:   ${skipped}`);
    console.log(`   Before:  ${formatBytes(totalBefore)}`);
    console.log(`   After:   ${formatBytes(totalAfter)}`);
    console.log(`   Saved:   ${formatBytes(totalBefore - totalAfter)} (${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%)`);
    console.log('');
}

main().catch(console.error);
