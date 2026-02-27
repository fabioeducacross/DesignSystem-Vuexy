/**
 * Analisa o relatório Playwright e extrai estatísticas
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const reportDir = path.join(__dirname, 'playwright-report');
const dataDir = path.join(reportDir, 'data');

// Procurar arquivo report.json nos dados
function findReportData() {
    if (!fs.existsSync(dataDir)) {
        console.log('Data dir not found');
        return;
    }

    const files = fs.readdirSync(dataDir);

    // Tentar cada arquivo JSON ou ZIP
    for (const file of files) {
        const filePath = path.join(dataDir, file);
        const stat = fs.statSync(filePath);

        if (file.endsWith('.json')) {
            try {
                const content = fs.readFileSync(filePath, 'utf8');
                const json = JSON.parse(content);
                if (json.stats || json.suites || json.config) {
                    console.log(`\nFound report data in: ${file}`);
                    console.log('Keys:', Object.keys(json));
                    if (json.stats) {
                        console.log('Stats:', JSON.stringify(json.stats, null, 2));
                    }
                }
            } catch (e) {
                // não é JSON válido
            }
        }
    }
}

// Analisar test-results para contar falhas atuais
function analyzeTestResults() {
    const testResultsDir = path.join(__dirname, 'test-results');
    if (!fs.existsSync(testResultsDir)) {
        console.log('test-results dir not found');
        return;
    }

    const dirs = fs.readdirSync(testResultsDir);
    const pixelPerfectDirs = dirs.filter(d => d.startsWith('educacross-pixel-perfect'));
    const withRetry = pixelPerfectDirs.filter(d => d.includes('retry'));
    const withoutRetry = pixelPerfectDirs.filter(d => !d.includes('retry'));

    console.log('\n=== test-results Analysis ===');
    console.log('Total pixel-perfect dirs:', pixelPerfectDirs.length);
    console.log('With retry suffix:', withRetry.length);
    console.log('Without retry (unique failures):', withoutRetry.length);

    // Categorizar por tipo
    let withPng = 0;
    let withoutPng = 0;
    const timeoutDirs = [];
    const diffDirs = [];

    for (const dir of withoutRetry) {
        const dirPath = path.join(testResultsDir, dir);
        const files = fs.readdirSync(dirPath);
        const hasPng = files.some(f => f.endsWith('-actual.png'));

        if (hasPng) {
            withPng++;
            diffDirs.push(dir);
        } else {
            withoutPng++;
            timeoutDirs.push(dir);
        }
    }

    console.log('With screenshot diff (PNG):', withPng);
    console.log('Timeout/render error (no PNG):', withoutPng);

    if (timeoutDirs.length > 0) {
        console.log('\nTimeout failures:');
        timeoutDirs.forEach(d => console.log(' -', d));
    }

    // Timestamp mais recente
    const mostRecent = withoutRetry.map(d => ({
        name: d,
        time: fs.statSync(path.join(testResultsDir, d)).mtime
    })).sort((a, b) => b.time - a.time).slice(0, 5);

    console.log('\nMost recent failures:');
    mostRecent.forEach(d => console.log(' -', d.name, '|', d.time.toISOString()));
}

findReportData();
analyzeTestResults();
