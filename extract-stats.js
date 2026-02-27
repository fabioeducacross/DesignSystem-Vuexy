const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('playwright-report/index.html', 'utf8');

// Find the base64 zip data
const startTag = '<script id="playwrightReportBase64" type="application/zip">data:application/zip;base64,';
const endTag = '</script>';
const startIdx = html.indexOf(startTag);
if (startIdx < 0) {
    console.error('base64 zip nao encontrado no HTML');
    process.exit(1);
}
const dataStart = startIdx + startTag.length;
const dataEnd = html.indexOf(endTag, dataStart);
const base64Data = html.substring(dataStart, dataEnd);

console.log('Base64 data length:', base64Data.length);

// Decode to buffer
const buf = Buffer.from(base64Data, 'base64');
console.log('Buffer size:', buf.length, 'bytes');

// Parse ZIP manually - look for JSON content
// ZIP files start with PK (0x50 0x4B)
if (buf[0] === 0x50 && buf[1] === 0x4B) {
    console.log('Valid ZIP detected');

    try {
        const AdmZip = require('adm-zip');
        const zip = new AdmZip(buf);
        const entries = zip.getEntries();
        console.log('ZIP entries:', entries.map(e => e.entryName));

        // Find the JSON entry
        const jsonEntry = entries.find(e => e.entryName.endsWith('.json') || e.entryName === 'report.json');
        if (jsonEntry) {
            const json = JSON.parse(jsonEntry.getData().toString('utf8'));
            const s = json.stats;
            console.log('\n=== GATE 2 RESULTS ===');
            console.log('Total:', s.total);
            console.log('Passed:', s.expected);
            console.log('Failed:', s.unexpected);
            console.log('Flaky:', s.flaky);
            console.log('Skipped:', s.skipped);
            console.log('OK:', s.ok);
        } else {
            // Try all entries
            entries.forEach(e => {
                console.log('Entry:', e.entryName, 'size:', e.header.size);
                const content = e.getData().toString('utf8');
                const m = content.match(/"expected":(\d+),"unexpected":(\d+),"flaky":(\d+),"skipped":(\d+),"total":(\d+)/);
                if (m) {
                    console.log('\n=== STATS ===');
                    console.log('Passed:', m[1], 'Failed:', m[2], 'Flaky:', m[3], 'Skipped:', m[4], 'Total:', m[5]);
                }
            });
        }
    } catch (e) {
        // adm-zip not available, try unzip
        console.log('AdmZip error:', e.message);

        // Extract first local file entry manually
        // ZIP local file header starts at offset after PK\x03\x04
        let offset = 0;
        while (offset < buf.length - 4) {
            if (buf[offset] === 0x50 && buf[offset + 1] === 0x4B && buf[offset + 2] === 0x03 && buf[offset + 3] === 0x04) {
                const compMethod = buf.readUInt16LE(offset + 8);
                const compSize = buf.readUInt32LE(offset + 18);
                const uncompSize = buf.readUInt32LE(offset + 22);
                const fnLen = buf.readUInt16LE(offset + 26);
                const extraLen = buf.readUInt16LE(offset + 28);
                const fname = buf.toString('utf8', offset + 30, offset + 30 + fnLen);
                const dataOffset = offset + 30 + fnLen + extraLen;

                console.log('Entry:', fname, 'method:', compMethod, 'compSize:', compSize, 'uncompSize:', uncompSize);

                if (compMethod === 8) { // deflate
                    try {
                        const compressed = buf.slice(dataOffset, dataOffset + compSize);
                        const decompressed = require('zlib').inflateRawSync(compressed);
                        const content = decompressed.toString('utf8');
                        let json;
                        try { json = JSON.parse(content); } catch (pe) { json = null; }

                        if (json && json.stats) {
                            const s = json.stats;
                            console.log('\n=== RESULTS from', fname, '===');
                            console.log('Total:', s.total, '| Passed:', s.expected, '| Failed:', s.unexpected, '| Flaky:', s.flaky, '| Skipped:', s.skipped, '| OK:', s.ok);
                        } else {
                            // Search for stats pattern in raw content
                            const ms = content.match(/"total":(\d+),"expected":(\d+),"unexpected":(\d+),"flaky":(\d+),"skipped":(\d+),"ok":(true|false)/);
                            if (ms) {
                                console.log('\n=== RESULTS from', fname, '(raw) ===');
                                console.log('Total:', ms[1], '| Passed:', ms[2], '| Failed:', ms[3], '| Flaky:', ms[4], '| Skipped:', ms[5], '| OK:', ms[6]);
                            }
                        }
                    } catch (ze) {
                        console.log('Decompress error:', ze.message);
                    }
                } else if (compMethod === 0) { // stored
                    const content = buf.toString('utf8', dataOffset, dataOffset + compSize);
                    const m = content.match(/"total":(\d+)/);
                    if (m) console.log('Total from stored:', m[1]);
                }

                offset = dataOffset + compSize;
            } else {
                offset++;
            }
        }
    }
}
