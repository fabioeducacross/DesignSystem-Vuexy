/**
 * Script para atualizar todos os baselines usando os -actual.png do test-results
 * Copia todos os *-actual.png para a pasta de snapshots como baselines
 */
const fs = require('fs');
const path = require('path');

const trDir = path.join(process.cwd(), 'test-results');
const snapDir = path.join(process.cwd(), 'tests', 'educacross-pixel-perfect.spec.js-snapshots');

if (!fs.existsSync(trDir)) {
    console.error('test-results dir not found');
    process.exit(1);
}

if (!fs.existsSync(snapDir)) {
    console.error('snapshots dir not found');
    process.exit(1);
}

let updated = 0;
let created = 0;
let skipped = 0;

function processDir(dirPath) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            processDir(filePath);
            return;
        }

        if (!file.endsWith('-actual.png')) return;

        // Converter nome: {something}-actual.png -> {something}-chromium-win32.png
        const baseName = file.replace(/-actual\.png$/, '');
        const snapName = `${baseName}-chromium-win32.png`;
        const snapPath = path.join(snapDir, snapName);

        if (fs.existsSync(snapPath)) {
            // Verificar se é mais recente
            const snapMtime = fs.statSync(snapPath).mtime;
            const actualMtime = stat.mtime;

            if (actualMtime > snapMtime) {
                fs.copyFileSync(filePath, snapPath);
                updated++;
                console.log(`Updated: ${snapName}`);
            } else {
                skipped++;
            }
        } else {
            fs.copyFileSync(filePath, snapPath);
            created++;
            console.log(`Created: ${snapName}`);
        }
    });
}

processDir(trDir);

console.log(`\n=== Summary ===`);
console.log(`Updated: ${updated}`);
console.log(`Created: ${created}`);
console.log(`Skipped (already up to date): ${skipped}`);
console.log(`Total snapshots in dir: ${fs.readdirSync(snapDir).filter(f => f.endsWith('.png')).length}`);
