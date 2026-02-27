const fs = require('fs');
const zlib = require('zlib');

const html = fs.readFileSync('playwright-report/index.html', 'utf8');
const startTag = '<script id="playwrightReportBase64" type="application/zip">data:application/zip;base64,';
const endTag = '</script>';
const startIdx = html.indexOf(startTag);
const dataStart = startIdx + startTag.length;
const dataEnd = html.indexOf(endTag, dataStart);
const base64Data = html.substring(dataStart, dataEnd);
const buf = Buffer.from(base64Data, 'base64');

// Parse all ZIP local file headers
const entries = [];
let pos = 0;
while (pos < buf.length - 30) {
    // Look for local file header signature
    const sig = buf.readUInt32LE(pos);
    if (sig === 0x04034B50) { // PK\x03\x04
        const compMethod = buf.readUInt16LE(pos + 8);
        const compSize = buf.readUInt32LE(pos + 18);
        const uncompSize = buf.readUInt32LE(pos + 22);
        const fnLen = buf.readUInt16LE(pos + 26);
        const extraLen = buf.readUInt16LE(pos + 28);
        const fname = buf.toString('utf8', pos + 30, pos + 30 + fnLen);
        const dataOffset = pos + 30 + fnLen + extraLen;
        entries.push({ fname, compMethod, compSize, uncompSize, dataOffset });
        pos = dataOffset + compSize;
    } else {
        pos++;
    }
}

console.log('Found', entries.length, 'ZIP entries');
entries.forEach(e => console.log(' -', e.fname, '(' + e.uncompSize + ' bytes uncompressed)'));

// Decompress each entry and look for stats
entries.forEach(e => {
    if (e.compMethod !== 8) return;
    try {
        const compressed = buf.slice(e.dataOffset, e.dataOffset + e.compSize);
        const decompressed = zlib.inflateRawSync(compressed);
        const content = decompressed.toString('utf8');

        // Try to parse as JSON
        let json;
        try { json = JSON.parse(content); } catch (x) { }

        if (json) {
            // Look for stats in various structures
            const findStats = (obj, path) => {
                if (obj && typeof obj === 'object') {
                    if (obj.stats && typeof obj.stats.total === 'number') {
                        const s = obj.stats;
                        console.log('\n[', e.fname, '] Stats at', path);
                        console.log('  Total:', s.total, '| Passed:', s.expected, '| Failed:', s.unexpected, '| Flaky:', s.flaky, '| Skipped:', s.skipped, '| OK:', s.ok);
                    }
                    Object.keys(obj).slice(0, 20).forEach(k => {
                        if (typeof obj[k] === 'object') findStats(obj[k], path + '.' + k);
                    });
                }
            };
            findStats(json, 'root');

            // Also look for suites stats
            if (json.suites) {
                console.log('\n[', e.fname, '] found suites, count:', json.suites.length);
            }
        } else {
            // Search raw
            const ms = content.match(/"total":(\d+),"expected":(\d+),"unexpected":(\d+)/);
            if (ms) {
                console.log('\n[', e.fname, '] Raw match: Total:', ms[1], 'Passed:', ms[2], 'Failed:', ms[3]);
            }
        }
    } catch (err) {
        console.log('[', e.fname, '] Error:', err.message);
    }
});
