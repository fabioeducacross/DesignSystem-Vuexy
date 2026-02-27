/**
 * Reporter customizado que salva apenas as estatísticas finais em JSON
 */
class StatsReporter {
    constructor() {
        this.stats = {
            passed: 0,
            failed: 0,
            timedOut: 0,
            skipped: 0,
            flaky: 0,
            total: 0,
            duration: 0,
            failures: []
        };
        this.startTime = Date.now();
    }

    onTestEnd(test, result) {
        this.stats.total++;
        if (result.status === 'passed') this.stats.passed++;
        else if (result.status === 'failed' || result.status === 'unexpected') {
            this.stats.failed++;
            this.stats.failures.push({
                title: test.title,
                file: test.location.file,
                status: result.status,
                error: result.error ? result.error.message.slice(0, 200) : 'unknown'
            });
        } else if (result.status === 'timedOut') this.stats.timedOut++;
        else if (result.status === 'skipped') this.stats.skipped++;
    }

    onEnd(result) {
        this.stats.duration = (Date.now() - this.startTime) / 1000;
        this.stats.exitCode = result.status;

        const fs = require('fs');
        fs.writeFileSync('gate2-stats.json', JSON.stringify(this.stats, null, 2));

        console.log('\n=== GATE 2 STATS ===');
        console.log('Total:', this.stats.total);
        console.log('Passed:', this.stats.passed);
        console.log('Failed:', this.stats.failed);
        console.log('TimedOut:', this.stats.timedOut);
        console.log('Skipped:', this.stats.skipped);
        console.log('Flaky:', this.stats.flaky);
        console.log('Duration:', this.stats.duration.toFixed(0) + 's');
        console.log('Status:', this.stats.exitCode);
        console.log('Stats saved to gate2-stats.json');
    }
}

module.exports = StatsReporter;
