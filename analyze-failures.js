const fs = require('fs');
const path = require('path');
const trDir = path.join(process.cwd(), 'test-results');
const dirs = fs.readdirSync(trDir);
const pfDirs = dirs.filter(d => d.startsWith('educacross-pixel-perfect') && !d.includes('retry'));

// Agrupar por prefixo da suíte
const byPrefix = { A: [], P: [], R: [], V: [], other: [] };
pfDirs.forEach(d => {
    const parts = d.split('-');
    // Format: educacross-pixel-perfect-{SUITE}-{hash}-...
    const suite = parts[3]; // A, P, R, or V
    if (byPrefix[suite]) byPrefix[suite].push(d);
    else byPrefix.other.push(d);
});

console.log('=== Falhas por Suíte ===');
console.log('Prefixo A (Anti-placeholder):', byPrefix.A.length);
console.log('Prefixo P (Pixel Perfect):', byPrefix.P.length);
console.log('Prefixo R (Renderizacao):', byPrefix.R.length);
console.log('Prefixo V (Vuexy generic):', byPrefix.V.length);
console.log('Prefixo other:', byPrefix.other.length);
console.log('Total:', pfDirs.length);

// Verificar tipos de falha por prefixo
console.log('\n=== Tipo de Falha por Suíte ===');
for (const [prefix, dlist] of Object.entries(byPrefix)) {
    if (dlist.length === 0) continue;
    let withPng = 0, withoutPng = 0;
    dlist.forEach(d => {
        const files = fs.readdirSync(path.join(trDir, d));
        if (files.some(f => f.endsWith('-actual.png'))) withPng++;
        else withoutPng++;
    });
    console.log(`${prefix}: screenshot diff=${withPng}, timeout=${withoutPng}`);
}

// Listar componentes com timeout na suíte P (Pixel Perfect)
console.log('\n=== Timeouts na suite P ===');
const pTimeouts = byPrefix.P.filter(d => {
    const files = fs.readdirSync(path.join(trDir, d));
    return !files.some(f => f.endsWith('-actual.png'));
});
pTimeouts.forEach(d => console.log(' -', d));

// Listar components com screenshot diff na suite P
console.log('\n=== Screenshot Diffs na suite P ===');
const pDiffs = byPrefix.P.filter(d => {
    const files = fs.readdirSync(path.join(trDir, d));
    return files.some(f => f.endsWith('-actual.png'));
});
pDiffs.slice(0, 20).forEach(d => console.log(' -', d));
if (pDiffs.length > 20) console.log(' ... e mais', pDiffs.length - 20);
