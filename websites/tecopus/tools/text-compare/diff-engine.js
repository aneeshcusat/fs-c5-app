// Advanced Diff Engine
// Implements line, word, and character-level diffs with advanced features

class DiffEngine {
    constructor() {
        this.options = {
            ignoreWhitespace: false,
            whitespaceMode: 'all',
            ignoreCase: false,
            ignoreBlankLines: false,
            ignoreLineEndings: false,
            normalizeLineEndings: false,
            lineEndingMode: 'lf',
            detectMovedBlocks: false,
            granularity: 'line',
            encoding: 'utf-8'
        };
    }

    setOptions(options) {
        this.options = { ...this.options, ...options };
    }

    // Main diff function
    diff(textA, textB) {
        // Normalize inputs
        let normalizedA = this.normalizeText(textA);
        let normalizedB = this.normalizeText(textB);

        // Apply transforms
        normalizedA = this.applyTransforms(normalizedA);
        normalizedB = this.applyTransforms(normalizedB);

        // Split into lines
        const linesA = this.splitLines(normalizedA);
        const linesB = this.splitLines(normalizedB);

        // Compute line-level diff
        const lineDiff = this.computeLineDiff(linesA, linesB);

        // Detect moved blocks if enabled
        if (this.options.detectMovedBlocks) {
            this.detectMovedBlocks(lineDiff);
        }

        // Apply granularity (word/char) if needed
        if (this.options.granularity === 'word' || this.options.granularity === 'char') {
            return this.applyGranularity(lineDiff, linesA, linesB);
        }

        return lineDiff;
    }

    normalizeText(text) {
        let normalized = text;

        // Normalize line endings
        if (this.options.normalizeLineEndings) {
            normalized = normalized.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
            if (this.options.lineEndingMode === 'crlf') {
                normalized = normalized.replace(/\n/g, '\r\n');
            }
        } else if (this.options.ignoreLineEndings) {
            normalized = normalized.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        }

        // Ignore blank lines
        if (this.options.ignoreBlankLines) {
            normalized = normalized.split('\n')
                .filter(line => line.trim().length > 0)
                .join('\n');
        }

        // Ignore whitespace
        if (this.options.ignoreWhitespace) {
            if (this.options.whitespaceMode === 'all') {
                normalized = normalized.replace(/\s+/g, ' ').trim();
            } else if (this.options.whitespaceMode === 'leading-trailing') {
                normalized = normalized.split('\n')
                    .map(line => line.trim())
                    .join('\n');
            }
        }

        // Ignore case
        if (this.options.ignoreCase) {
            normalized = normalized.toLowerCase();
        }

        return normalized;
    }

    applyTransforms(text) {
        // Apply transform profiles
        const profile = this.options.transformProfile || 'none';
        
        switch (profile) {
            case 'json':
                try {
                    const parsed = JSON.parse(text);
                    return JSON.stringify(parsed, null, 2);
                } catch (e) {
                    return text;
                }
            case 'yaml':
                // Basic YAML normalization (would need a YAML parser for full support)
                return text;
            case 'xml':
                // Basic XML normalization
                return text.replace(/>\s+</g, '><').trim();
            case 'trim':
                return text.split('\n').map(line => line.trimEnd()).join('\n');
            default:
                return text;
        }
    }

    splitLines(text) {
        return text.split('\n');
    }

    // Myers diff algorithm for line-level diff
    computeLineDiff(linesA, linesB) {
        const n = linesA.length;
        const m = linesB.length;
        const max = n + m;
        const v = new Array(2 * max + 1);
        v[1] = 0;

        const trace = [];
        
        for (let d = 0; d <= max; d++) {
            for (let k = -d; k <= d; k += 2) {
                let x;
                if (k === -d || (k !== d && v[k - 1 + max] < v[k + 1 + max])) {
                    x = v[k + 1 + max];
                } else {
                    x = v[k - 1 + max] + 1;
                }
                
                let y = x - k;
                
                while (x < n && y < m && this.linesEqual(linesA[x], linesB[y])) {
                    x++;
                    y++;
                }
                
                v[k + max] = x;
                
                if (x >= n && y >= m) {
                    // Found a path
                    trace.push([...v]);
                    return this.buildDiffFromTrace(linesA, linesB, trace);
                }
            }
            trace.push([...v]);
        }

        // Fallback to simple diff if Myers fails
        return this.simpleLineDiff(linesA, linesB);
    }

    linesEqual(lineA, lineB) {
        if (this.options.ignoreCase) {
            return lineA.toLowerCase() === lineB.toLowerCase();
        }
        return lineA === lineB;
    }

    buildDiffFromTrace(linesA, linesB, trace) {
        // Simplified trace reconstruction
        // For production, use full Myers algorithm implementation
        return this.simpleLineDiff(linesA, linesB);
    }

    simpleLineDiff(linesA, linesB) {
        const diff = [];
        const n = linesA.length;
        const m = linesB.length;
        let i = 0, j = 0;

        while (i < n || j < m) {
            if (i >= n) {
                diff.push({ type: 'added', line: linesB[j], lineA: null, lineB: j, index: diff.length });
                j++;
            } else if (j >= m) {
                diff.push({ type: 'removed', line: linesA[i], lineA: i, lineB: null, index: diff.length });
                i++;
            } else if (this.linesEqual(linesA[i], linesB[j])) {
                diff.push({ type: 'unchanged', line: linesA[i], lineA: i, lineB: j, index: diff.length });
                i++;
                j++;
            } else {
                // Check if line exists later
                const foundInB = linesB.indexOf(linesA[i], j);
                const foundInA = linesA.indexOf(linesB[j], i);

                if (foundInB !== -1 && foundInB < j + 10) {
                    // Line A exists later in B
                    while (j < foundInB) {
                        diff.push({ type: 'added', line: linesB[j], lineA: null, lineB: j, index: diff.length });
                        j++;
                    }
                } else if (foundInA !== -1 && foundInA < i + 10) {
                    // Line B exists later in A
                    while (i < foundInA) {
                        diff.push({ type: 'removed', line: linesA[i], lineA: i, lineB: null, index: diff.length });
                        i++;
                    }
                } else {
                    // Modified line
                    diff.push({ type: 'modified', line: linesA[i], lineNew: linesB[j], lineA: i, lineB: j, index: diff.length });
                    i++;
                    j++;
                }
            }
        }

        return diff;
    }

    // Word-level diff
    applyGranularity(lineDiff, linesA, linesB) {
        return lineDiff.map(item => {
            if (item.type === 'unchanged') {
                return item;
            }

            if (item.type === 'modified') {
                const oldLine = item.line || '';
                const newLine = item.lineNew || '';
                
                if (this.options.granularity === 'word') {
                    return {
                        ...item,
                        words: this.computeWordDiff(oldLine, newLine)
                    };
                } else if (this.options.granularity === 'char') {
                    return {
                        ...item,
                        chars: this.computeCharDiff(oldLine, newLine)
                    };
                }
            }

            return item;
        });
    }

    computeWordDiff(textA, textB) {
        const wordsA = this.tokenizeWords(textA);
        const wordsB = this.tokenizeWords(textB);
        const diff = [];
        
        let i = 0, j = 0;
        while (i < wordsA.length || j < wordsB.length) {
            if (i >= wordsA.length) {
                diff.push({ type: 'added', word: wordsB[j] });
                j++;
            } else if (j >= wordsB.length) {
                diff.push({ type: 'removed', word: wordsA[i] });
                i++;
            } else if (wordsA[i] === wordsB[j]) {
                diff.push({ type: 'unchanged', word: wordsA[i] });
                i++;
                j++;
            } else {
                // Check if word exists later
                const foundInB = wordsB.indexOf(wordsA[i], j);
                const foundInA = wordsA.indexOf(wordsB[j], i);
                
                if (foundInB !== -1 && foundInB < j + 5) {
                    while (j < foundInB) {
                        diff.push({ type: 'added', word: wordsB[j] });
                        j++;
                    }
                } else if (foundInA !== -1 && foundInA < i + 5) {
                    while (i < foundInA) {
                        diff.push({ type: 'removed', word: wordsA[i] });
                        i++;
                    }
                } else {
                    diff.push({ type: 'removed', word: wordsA[i] });
                    diff.push({ type: 'added', word: wordsB[j] });
                    i++;
                    j++;
                }
            }
        }
        
        return diff;
    }

    computeCharDiff(textA, textB) {
        const charsA = textA.split('');
        const charsB = textB.split('');
        const diff = [];
        
        let i = 0, j = 0;
        while (i < charsA.length || j < charsB.length) {
            if (i >= charsA.length) {
                diff.push({ type: 'added', char: charsB[j] });
                j++;
            } else if (j >= charsB.length) {
                diff.push({ type: 'removed', char: charsA[i] });
                i++;
            } else if (charsA[i] === charsB[j]) {
                diff.push({ type: 'unchanged', char: charsA[i] });
                i++;
                j++;
            } else {
                diff.push({ type: 'removed', char: charsA[i] });
                diff.push({ type: 'added', char: charsB[j] });
                i++;
                j++;
            }
        }
        
        return diff;
    }

    tokenizeWords(text) {
        // Split by whitespace but preserve it
        const tokens = [];
        let current = '';
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (/\s/.test(char)) {
                if (current) {
                    tokens.push(current);
                    current = '';
                }
                tokens.push(char);
            } else {
                current += char;
            }
        }
        if (current) tokens.push(current);
        return tokens;
    }

    // Detect moved blocks
    detectMovedBlocks(diff) {
        const removed = diff.filter(d => d.type === 'removed');
        const added = diff.filter(d => d.type === 'added');

        removed.forEach(rem => {
            const match = added.find(add => 
                add.line === rem.line && 
                add.index > rem.index &&
                Math.abs(add.index - rem.index) < 50
            );
            
            if (match) {
                rem.type = 'moved';
                match.type = 'moved';
                rem.movedTo = match.index;
                match.movedFrom = rem.index;
            }
        });
    }

    // 3-way merge
    threeWayMerge(base, ours, theirs) {
        const baseLines = this.splitLines(base);
        const oursLines = this.splitLines(ours);
        const theirsLines = this.splitLines(theirs);

        const diffOurs = this.computeLineDiff(baseLines, oursLines);
        const diffTheirs = this.computeLineDiff(baseLines, theirsLines);

        // Simple 3-way merge
        const merged = [];
        const conflicts = [];

        // This is a simplified implementation
        // Full 3-way merge would need proper conflict detection
        for (let i = 0; i < Math.max(oursLines.length, theirsLines.length); i++) {
            const oursLine = oursLines[i];
            const theirsLine = theirsLines[i];

            if (oursLine === theirsLine) {
                merged.push({ type: 'unchanged', line: oursLine || theirsLine });
            } else if (!oursLine) {
                merged.push({ type: 'added', line: theirsLine, source: 'theirs' });
            } else if (!theirsLine) {
                merged.push({ type: 'added', line: oursLine, source: 'ours' });
            } else {
                conflicts.push({
                    type: 'conflict',
                    ours: oursLine,
                    theirs: theirsLine,
                    index: i
                });
                merged.push({
                    type: 'conflict',
                    ours: oursLine,
                    theirs: theirsLine
                });
            }
        }

        return { merged, conflicts };
    }

    // Structure-aware JSON diff
    jsonDiff(jsonA, jsonB) {
        try {
            const objA = JSON.parse(jsonA);
            const objB = JSON.parse(jsonB);
            return this.compareObjects(objA, objB);
        } catch (e) {
            return null; // Not valid JSON, fall back to text diff
        }
    }

    compareObjects(objA, objB, path = '') {
        const diff = [];
        
        if (objA === objB) {
            return [];
        }

        if (typeof objA !== typeof objB) {
            diff.push({ type: 'changed', path, old: objA, new: objB });
            return diff;
        }

        if (typeof objA !== 'object' || objA === null || objB === null) {
            if (objA !== objB) {
                diff.push({ type: 'changed', path, old: objA, new: objB });
            }
            return diff;
        }

        // Handle arrays
        if (Array.isArray(objA) && Array.isArray(objB)) {
            const maxLen = Math.max(objA.length, objB.length);
            for (let i = 0; i < maxLen; i++) {
                const newPath = `${path}[${i}]`;
                if (i >= objA.length) {
                    diff.push({ type: 'added', path: newPath, value: objB[i] });
                } else if (i >= objB.length) {
                    diff.push({ type: 'removed', path: newPath, value: objA[i] });
                } else {
                    diff.push(...this.compareObjects(objA[i], objB[i], newPath));
                }
            }
            return diff;
        }

        const keysA = Object.keys(objA).sort();
        const keysB = Object.keys(objB).sort();
        const allKeys = new Set([...keysA, ...keysB]);

        for (const key of allKeys) {
            const newPath = path ? `${path}.${key}` : key;
            
            if (!(key in objA)) {
                diff.push({ type: 'added', path: newPath, value: objB[key] });
            } else if (!(key in objB)) {
                diff.push({ type: 'removed', path: newPath, value: objA[key] });
            } else {
                diff.push(...this.compareObjects(objA[key], objB[key], newPath));
            }
        }

        return diff;
    }

    // CSV diff with primary key matching
    csvDiff(csvA, csvB, primaryKeyColumn = 0) {
        try {
            const rowsA = this.parseCSV(csvA);
            const rowsB = this.parseCSV(csvB);
            
            if (rowsA.length === 0 || rowsB.length === 0) {
                return null;
            }

            const headersA = rowsA[0];
            const headersB = rowsB[0];
            const dataA = rowsA.slice(1);
            const dataB = rowsB.slice(1);

            // Match rows by primary key
            const mapA = new Map();
            dataA.forEach((row, index) => {
                const key = row[primaryKeyColumn];
                if (key) mapA.set(key, { row, index });
            });

            const mapB = new Map();
            dataB.forEach((row, index) => {
                const key = row[primaryKeyColumn];
                if (key) mapB.set(key, { row, index });
            });

            const diff = [];
            const allKeys = new Set([...mapA.keys(), ...mapB.keys()]);

            allKeys.forEach(key => {
                const itemA = mapA.get(key);
                const itemB = mapB.get(key);

                if (!itemA) {
                    diff.push({ type: 'added', key, row: itemB.row });
                } else if (!itemB) {
                    diff.push({ type: 'removed', key, row: itemA.row });
                } else {
                    // Compare cells
                    const cellDiffs = [];
                    const maxCols = Math.max(itemA.row.length, itemB.row.length);
                    for (let i = 0; i < maxCols; i++) {
                        const cellA = itemA.row[i];
                        const cellB = itemB.row[i];
                        if (cellA !== cellB) {
                            cellDiffs.push({ col: i, old: cellA, new: cellB });
                        }
                    }
                    if (cellDiffs.length > 0) {
                        diff.push({ type: 'modified', key, row: itemA.row, rowNew: itemB.row, cellDiffs });
                    }
                }
            });

            return { headers: headersA, diff };
        } catch (e) {
            return null;
        }
    }

    parseCSV(csv) {
        const lines = csv.split('\n').filter(line => line.trim());
        return lines.map(line => {
            const cells = [];
            let current = '';
            let inQuotes = false;
            
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                if (char === '"') {
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    cells.push(current.trim());
                    current = '';
                } else {
                    current += char;
                }
            }
            cells.push(current.trim());
            return cells;
        });
    }

    // Detect file type and apply appropriate diff
    detectFileType(text) {
        // Try JSON
        try {
            JSON.parse(text);
            return 'json';
        } catch (e) {}

        // Try CSV (simple heuristic)
        const lines = text.split('\n');
        if (lines.length > 1 && lines[0].includes(',')) {
            return 'csv';
        }

        // Try YAML (simple heuristic)
        if (text.includes(':') && (text.includes('-') || text.includes('|'))) {
            return 'yaml';
        }

        // Try XML
        if (text.trim().startsWith('<') && text.includes('>')) {
            return 'xml';
        }

        return 'text';
    }
}

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DiffEngine;
}
