const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const frontofficeDir = path.join(rootDir, 'educacross-frontoffice');
const outputFile = path.join(
    rootDir,
    'packages',
    'vuexy_theme',
    'public',
    'vuexy',
    'css',
    'educacross-production.css'
);
const tempFile = path.join(rootDir, '.tmp-educacross-production.css');

const fallbackCoreFile = path.join(
    rootDir,
    'packages',
    'vuexy_theme',
    'public',
    'vuexy',
    'css',
    'core.css'
);
const fallbackBrandFile = path.join(
    rootDir,
    'packages',
    'vuexy_theme',
    'public',
    'vuexy',
    'css',
    'educacross-brand.css'
);
const distCssDir = path.join(frontofficeDir, 'dist', 'assets', 'css');

function runCommand(command, args, cwd) {
    const result = spawnSync(command, args, {
        cwd,
        stdio: 'inherit',
        shell: process.platform === 'win32',
    });

    return result.status === 0;
}

function ensureOutputDir() {
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
}

function generateFallbackCss() {
    const coreCss = fs.existsSync(fallbackCoreFile)
        ? fs.readFileSync(fallbackCoreFile, 'utf8')
        : '';
    const brandCss = fs.existsSync(fallbackBrandFile)
        ? fs.readFileSync(fallbackBrandFile, 'utf8')
        : '';

    if (!coreCss && !brandCss) {
        throw new Error('Fallback CSS indisponível (core.css e educacross-brand.css não encontrados).');
    }

    const header = [
        '/*',
        ' * Fallback gerado por scripts/extract-production-css.js',
        ' * Sass de produção não compilou neste ambiente.',
        ' */',
        '',
    ].join('\n');

    fs.writeFileSync(outputFile, `${header}${coreCss}\n\n${brandCss}`);
}

function copyCssFromDist() {
    if (!fs.existsSync(distCssDir)) {
        return false;
    }

    const cssFiles = fs
        .readdirSync(distCssDir)
        .filter((fileName) => fileName.endsWith('.css'))
        .map((fileName) => {
            const fullPath = path.join(distCssDir, fileName);
            return {
                fileName,
                fullPath,
                size: fs.statSync(fullPath).size,
            };
        })
        .sort((a, b) => b.size - a.size);

    if (!cssFiles.length) {
        return false;
    }

    const mainCss = cssFiles[0];
    fs.copyFileSync(mainCss.fullPath, outputFile);
    console.log(
        `[extract-production-css] CSS de produção exportado de dist/assets/css: ${mainCss.fileName} (${mainCss.size} bytes)`
    );
    return true;
}

function main() {
    ensureOutputDir();

    const hasFrontoffice = fs.existsSync(frontofficeDir);
    if (!hasFrontoffice) {
        console.warn('[extract-production-css] educacross-frontoffice não encontrado. Usando fallback.');
        generateFallbackCss();
        return;
    }

    console.log('[extract-production-css] Gerando _whitelabel-colors.scss...');
    const whitelabelOk = runCommand('node', ['scripts/generate-whitelabel-colors.js'], frontofficeDir);

    if (!whitelabelOk) {
        console.warn('[extract-production-css] Falha ao gerar whitelabel. Usando fallback.');
        generateFallbackCss();
        return;
    }

    console.log('[extract-production-css] Compilando SCSS de produção...');
    const sassOk = runCommand(
        'npx',
        [
            'sass',
            'src/assets/scss/main.scss',
            tempFile,
            '--load-path=node_modules',
            '--load-path=src/assets',
            '--no-source-map',
        ],
        frontofficeDir
    );

    if (!sassOk || !fs.existsSync(tempFile)) {
        console.warn('[extract-production-css] Falha na compilação Sass. Tentando CSS de build do frontoffice...');

        if (copyCssFromDist()) {
            return;
        }

        console.log('[extract-production-css] Executando build do frontoffice para obter CSS real...');
        const buildOk = runCommand('npm', ['run', 'build'], frontofficeDir);

        if (buildOk && copyCssFromDist()) {
            return;
        }

        console.warn('[extract-production-css] Build não disponível. Usando fallback.');
        generateFallbackCss();
        return;
    }

    const compiledCss = fs.readFileSync(tempFile, 'utf8');
    fs.writeFileSync(outputFile, compiledCss);
    fs.rmSync(tempFile, { force: true });

    console.log(`[extract-production-css] CSS de produção gerado com sucesso: ${outputFile}`);
}

main();