// Advanced Text Diff Tool - Main Application

document.addEventListener('DOMContentLoaded', function() {
    const diffEngine = new DiffEngine();
    let currentDiff = [];
    let changeIndices = [];
    let currentChangeIndex = -1;

    // DOM Elements
    const textA = document.getElementById('textA');
    const textB = document.getElementById('textB');
    const textBase = document.getElementById('textBase');
    const compareBtn = document.getElementById('compareBtn');
    const swapBtn = document.getElementById('swapBtn');
    const clearBtn = document.getElementById('clearBtn');
    const sampleBtn = document.getElementById('sampleBtn');
    const diffView = document.getElementById('diffView');
    const diffStatsDetailed = document.getElementById('diffStatsDetailed');
    const viewMode = document.getElementById('viewMode');
    const diffGranularity = document.getElementById('diffGranularity');
    const exportBtn = document.getElementById('exportBtn');
    const shareBtn = document.getElementById('shareBtn');
    const exportModal = document.getElementById('exportModal');
    const closeExportModal = document.getElementById('closeExportModal');
    const privacyBanner = document.getElementById('privacyBanner');
    const closePrivacyBanner = document.getElementById('closePrivacyBanner');

    // File upload elements
    const fileA = document.getElementById('fileA');
    const fileB = document.getElementById('fileB');
    const fileBase = document.getElementById('fileBase');
    const uploadA = document.getElementById('uploadA');
    const uploadB = document.getElementById('uploadB');
    const uploadBase = document.getElementById('uploadBase');
    const clearA = document.getElementById('clearA');
    const clearB = document.getElementById('clearB');
    const clearBase = document.getElementById('clearBase');

    // Drop zones
    const dropZoneA = document.getElementById('dropZoneA');
    const dropZoneB = document.getElementById('dropZoneB');
    const dropZoneBase = document.getElementById('dropZoneBase');
    const dropOverlayA = document.getElementById('dropOverlayA');
    const dropOverlayB = document.getElementById('dropOverlayB');
    const dropOverlayBase = document.getElementById('dropOverlayBase');

    // Options
    const ignoreWhitespace = document.getElementById('ignoreWhitespace');
    const whitespaceMode = document.getElementById('whitespaceMode');
    const ignoreCase = document.getElementById('ignoreCase');
    const ignoreBlankLines = document.getElementById('ignoreBlankLines');
    const ignoreLineEndings = document.getElementById('ignoreLineEndings');
    const normalizeLineEndings = document.getElementById('normalizeLineEndings');
    const lineEndingMode = document.getElementById('lineEndingMode');
    const detectMovedBlocks = document.getElementById('detectMovedBlocks');
    const encoding = document.getElementById('encoding');
    const transformProfile = document.getElementById('transformProfile');
    const clientSideOnly = document.getElementById('clientSideOnly');
    const showLineNumbers = document.getElementById('showLineNumbers');
    const showMinimap = document.getElementById('showMinimap');
    const toggleOptions = document.getElementById('toggleOptions');
    const optionsContent = document.getElementById('optionsContent');

    // 3-way merge
    const mergeOption = document.getElementById('mergeOption');
    const enable3Way = document.getElementById('enable3Way');
    const disable3Way = document.getElementById('disable3Way');
    let threeWayEnabled = false;

    // Navigation
    const prevChange = document.getElementById('prevChange');
    const nextChange = document.getElementById('nextChange');
    const searchDiff = document.getElementById('searchDiff');
    const changesList = document.getElementById('changesList');
    const changesSidebar = document.getElementById('changesSidebar');

    // File info displays
    const fileInfoA = document.getElementById('fileInfoA');
    const fileInfoB = document.getElementById('fileInfoB');

    // Initialize
    init();

    function init() {
        // Load saved drafts
        loadDrafts();

        // Setup event listeners
        setupEventListeners();

        // Setup file uploads
        setupFileUploads();

        // Setup drag and drop
        setupDragAndDrop();

    // Auto-compare on input
        [textA, textB, textBase].forEach(textarea => {
        textarea.addEventListener('input', Utils.debounce(performCompare, 500));
    });

        // Auto-compare on option changes
        [
            ignoreWhitespace, whitespaceMode, ignoreCase, ignoreBlankLines,
            ignoreLineEndings, normalizeLineEndings, lineEndingMode,
            detectMovedBlocks, viewMode, diffGranularity, encoding,
            transformProfile, showLineNumbers, showMinimap
        ].forEach(element => {
            if (element) {
                element.addEventListener('change', performCompare);
            }
        });

        // Enable/disable dependent options
        ignoreWhitespace.addEventListener('change', function() {
            whitespaceMode.disabled = !this.checked;
        });

        normalizeLineEndings.addEventListener('change', function() {
            lineEndingMode.disabled = !this.checked;
        });

        // Privacy banner
        if (localStorage.getItem('privacyBannerDismissed') !== 'true') {
            privacyBanner.style.display = 'flex';
        }

        closePrivacyBanner.addEventListener('click', function() {
            privacyBanner.style.display = 'none';
            localStorage.setItem('privacyBannerDismissed', 'true');
        });

        // Options panel toggle
        toggleOptions.addEventListener('click', function() {
            const isExpanded = optionsContent.style.display !== 'none';
            optionsContent.style.display = isExpanded ? 'none' : 'block';
            this.textContent = isExpanded ? '▼' : '▲';
        });

        // 3-way merge toggle
        enable3Way.addEventListener('click', function() {
            threeWayEnabled = true;
            mergeOption.style.display = 'block';
            enable3Way.style.display = 'none';
            disable3Way.style.display = 'inline-block';
            performCompare();
        });

        disable3Way.addEventListener('click', function() {
            threeWayEnabled = false;
            mergeOption.style.display = 'none';
            enable3Way.style.display = 'inline-block';
            disable3Way.style.display = 'none';
            textBase.value = '';
            performCompare();
        });

        // Minimap toggle
        showMinimap.addEventListener('change', function() {
            const minimapContainer = document.getElementById('minimapContainer');
            minimapContainer.style.display = this.checked ? 'block' : 'none';
            if (this.checked && currentDiff.length > 0) {
                updateMinimap();
            }
        });

        // Initial compare
        performCompare();
    }

    function setupEventListeners() {
        compareBtn.addEventListener('click', performCompare);
        
        swapBtn.addEventListener('click', function() {
            const temp = textA.value;
            textA.value = textB.value;
            textB.value = temp;
            performCompare();
        });

        clearBtn.addEventListener('click', function() {
            textA.value = '';
            textB.value = '';
            textBase.value = '';
            diffView.innerHTML = '';
            diffStatsDetailed.style.display = 'none';
            fileInfoA.textContent = '';
            fileInfoB.textContent = '';
            currentDiff = [];
            changeIndices = [];
        });

        sampleBtn.addEventListener('click', function() {
            loadSampleData();
        });

        exportBtn.addEventListener('click', function() {
            exportModal.style.display = 'flex';
        });

        closeExportModal.addEventListener('click', function() {
            exportModal.style.display = 'none';
        });

        shareBtn.addEventListener('click', function() {
            shareComparison();
        });

        // Export options
        document.getElementById('exportUnified').addEventListener('click', exportUnifiedDiff);
        document.getElementById('exportHTML').addEventListener('click', exportHTML);
        document.getElementById('exportJSON').addEventListener('click', exportJSON);
        document.getElementById('exportPDF').addEventListener('click', exportPDF);

        // Navigation
        prevChange.addEventListener('click', function() {
            navigateChanges(-1);
        });

        nextChange.addEventListener('click', function() {
            navigateChanges(1);
        });

        searchDiff.addEventListener('input', function() {
            searchInDiff(this.value);
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                performCompare();
            }
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'S') {
                e.preventDefault();
                swapBtn.click();
            }
        });
    }

    function setupFileUploads() {
        uploadA.addEventListener('click', () => fileA.click());
        uploadB.addEventListener('click', () => fileB.click());
        uploadBase.addEventListener('click', () => fileBase.click());

        clearA.addEventListener('click', function() {
            textA.value = '';
            fileA.value = '';
            fileInfoA.textContent = '';
            performCompare();
        });

        clearB.addEventListener('click', function() {
            textB.value = '';
            fileB.value = '';
            fileInfoB.textContent = '';
            performCompare();
        });

        clearBase.addEventListener('click', function() {
            textBase.value = '';
            fileBase.value = '';
            performCompare();
        });

        fileA.addEventListener('change', function(e) {
            handleFileUpload(e.target.files[0], textA, fileInfoA);
        });

        fileB.addEventListener('change', function(e) {
            handleFileUpload(e.target.files[0], textB, fileInfoB);
        });

        fileBase.addEventListener('change', function(e) {
            handleFileUpload(e.target.files[0], textBase, null);
        });
    }

    function setupDragAndDrop() {
        [dropZoneA, dropZoneB, dropZoneBase].forEach((zone, index) => {
            const overlay = index === 0 ? dropOverlayA : index === 1 ? dropOverlayB : dropOverlayBase;
            const textarea = index === 0 ? textA : index === 1 ? textB : textBase;
            const fileInfo = index === 0 ? fileInfoA : index === 1 ? fileInfoB : null;

            zone.addEventListener('dragover', function(e) {
                e.preventDefault();
                zone.classList.add('drag-over');
            });

            zone.addEventListener('dragleave', function(e) {
                e.preventDefault();
                zone.classList.remove('drag-over');
            });

            zone.addEventListener('drop', function(e) {
                e.preventDefault();
                zone.classList.remove('drag-over');
                
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    handleFileUpload(files[0], textarea, fileInfo);
                }
            });
        });
    }

    async function handleFileUpload(file, textarea, fileInfo) {
        if (!file) return;

        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            showStatus('File too large. Maximum size is 10MB.', 'error');
            return;
        }

        try {
            const text = await readFile(file);
            textarea.value = text;
            
            if (fileInfo) {
                fileInfo.textContent = `${file.name} (${formatFileSize(file.size)})`;
            }

            showStatus(`Loaded ${file.name}`, 'success');
            performCompare();
        } catch (error) {
            showStatus(`Error reading file: ${error.message}`, 'error');
        }
    }

    function readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                resolve(e.target.result);
            };
            reader.onerror = function() {
                reject(new Error('Failed to read file'));
            };
            
            const encodingValue = encoding.value === 'auto' ? 'utf-8' : encoding.value;
            reader.readAsText(file, encodingValue);
        });
    }

    function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }

    function performCompare() {
        const textAValue = textA ? textA.value : '';
        const textBValue = textB ? textB.value : '';

        if (!diffView) {
            console.error('Diff view element not found');
            return;
        }

        if (!textAValue && !textBValue) {
            diffView.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 2rem;">Enter text in both panes to compare</div>';
            diffStatsDetailed.style.display = 'none';
            return;
        }

        // Update diff engine options
        diffEngine.setOptions({
            ignoreWhitespace: ignoreWhitespace.checked,
            whitespaceMode: whitespaceMode.value,
            ignoreCase: ignoreCase.checked,
            ignoreBlankLines: ignoreBlankLines.checked,
            ignoreLineEndings: ignoreLineEndings.checked,
            normalizeLineEndings: normalizeLineEndings.checked,
            lineEndingMode: lineEndingMode.value,
            detectMovedBlocks: detectMovedBlocks.checked,
            granularity: diffGranularity.value,
            encoding: encoding.value,
            transformProfile: transformProfile.value
        });

        // Detect file types and use structure-aware diffs if applicable
        const fileTypeA = diffEngine.detectFileType(textAValue);
        const fileTypeB = diffEngine.detectFileType(textBValue);
        
        // Perform diff
        if (threeWayEnabled && textBase.value) {
            const mergeResult = diffEngine.threeWayMerge(textBase.value, textAValue, textBValue);
            currentDiff = mergeResult.merged;
        } else if (fileTypeA === 'json' && fileTypeB === 'json' && transformProfile.value === 'json') {
            // Use JSON-aware diff
            const jsonDiff = diffEngine.jsonDiff(textAValue, textBValue);
            if (jsonDiff) {
                currentDiff = jsonDiff.map(item => ({
                    type: item.type === 'added' ? 'added' : item.type === 'removed' ? 'removed' : 'modified',
                    line: item.type === 'removed' || item.type === 'changed' ? JSON.stringify(item.old || item.value) : '',
                    lineNew: item.type === 'added' || item.type === 'changed' ? JSON.stringify(item.new || item.value) : '',
                    path: item.path
                }));
            } else {
                currentDiff = diffEngine.diff(textAValue, textBValue);
            }
        } else if (fileTypeA === 'csv' && fileTypeB === 'csv') {
            // Use CSV-aware diff
            const csvDiff = diffEngine.csvDiff(textAValue, textBValue);
            if (csvDiff) {
                currentDiff = csvDiff.diff.map(item => ({
                    type: item.type,
                    line: item.type === 'removed' || item.type === 'modified' ? item.row.join(',') : '',
                    lineNew: item.type === 'added' || item.type === 'modified' ? (item.rowNew || item.row).join(',') : '',
                    key: item.key,
                    cellDiffs: item.cellDiffs
                }));
            } else {
                currentDiff = diffEngine.diff(textAValue, textBValue);
            }
        } else {
            currentDiff = diffEngine.diff(textAValue, textBValue);
        }

        // Find change indices
        changeIndices = currentDiff
            .map((item, index) => item.type !== 'unchanged' ? index : -1)
            .filter(index => index !== -1);

        currentChangeIndex = changeIndices.length > 0 ? 0 : -1;

        // Display diff
        displayDiff();
        updateStats();
        updateChangesList();
        if (showMinimap.checked) {
            updateMinimap();
        }

        // Save drafts
        saveDrafts();
    }

    function displayDiff() {
        if (!diffView || !currentDiff || currentDiff.length === 0) {
            if (diffView) {
                diffView.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 2rem;">No differences found</div>';
            }
            return;
        }

        const view = viewMode ? viewMode.value : 'side-by-side';
        const showNumbers = showLineNumbers ? showLineNumbers.checked : false;
        const granularity = diffGranularity ? diffGranularity.value : 'line';

        try {
            if (view === 'side-by-side') {
                displaySideBySide(showNumbers, granularity);
            } else {
                displayUnified(showNumbers, granularity);
            }
        } catch (error) {
            console.error('Error displaying diff:', error);
            diffView.innerHTML = '<div style="text-align: center; color: var(--danger-color); padding: 2rem;">Error displaying diff. Please check console.</div>';
        }
    }

    function displaySideBySide(showNumbers, granularity) {
        const leftPane = [];
        const rightPane = [];
        let lineNumA = 1;
        let lineNumB = 1;

        currentDiff.forEach((item, index) => {
            const lineNumAStr = showNumbers ? `<span class="diff-line-number">${lineNumA}</span>` : '';
            const lineNumBStr = showNumbers ? `<span class="diff-line-number">${lineNumB}</span>` : '';

            if (item.type === 'unchanged') {
                const line = escapeHtml(item.line || '');
                leftPane.push(`<div class="diff-line unchanged" data-index="${index}">${lineNumAStr}${line}</div>`);
                rightPane.push(`<div class="diff-line unchanged" data-index="${index}">${lineNumBStr}${line}</div>`);
                lineNumA++;
                lineNumB++;
            } else if (item.type === 'removed') {
                const line = escapeHtml(item.line || '');
                leftPane.push(`<div class="diff-line removed" data-index="${index}">${lineNumAStr}${line}</div>`);
                rightPane.push(`<div class="diff-line unchanged" data-index="${index}">${lineNumBStr}&nbsp;</div>`);
                lineNumA++;
            } else if (item.type === 'added') {
                const line = escapeHtml(item.line || '');
                leftPane.push(`<div class="diff-line unchanged" data-index="${index}">${lineNumAStr}&nbsp;</div>`);
                rightPane.push(`<div class="diff-line added" data-index="${index}">${lineNumBStr}${line}</div>`);
                lineNumB++;
            } else if (item.type === 'modified') {
                const oldLine = escapeHtml(item.line || '');
                const newLine = escapeHtml(item.lineNew || '');
                
                if (granularity === 'word' && item.words) {
                    const oldWords = renderWords(item.words.filter(w => w.type === 'removed' || w.type === 'unchanged'));
                    const newWords = renderWords(item.words.filter(w => w.type === 'added' || w.type === 'unchanged'));
                    leftPane.push(`<div class="diff-line modified" data-index="${index}">${lineNumAStr}${oldWords}</div>`);
                    rightPane.push(`<div class="diff-line modified" data-index="${index}">${lineNumBStr}${newWords}</div>`);
                } else if (granularity === 'char' && item.chars) {
                    const oldChars = renderChars(item.chars.filter(c => c.type === 'removed' || c.type === 'unchanged'));
                    const newChars = renderChars(item.chars.filter(c => c.type === 'added' || c.type === 'unchanged'));
                    leftPane.push(`<div class="diff-line modified" data-index="${index}">${lineNumAStr}${oldChars}</div>`);
                    rightPane.push(`<div class="diff-line modified" data-index="${index}">${lineNumBStr}${newChars}</div>`);
                } else {
                    leftPane.push(`<div class="diff-line modified" data-index="${index}">${lineNumAStr}${oldLine}</div>`);
                    rightPane.push(`<div class="diff-line modified" data-index="${index}">${lineNumBStr}${newLine}</div>`);
                }
                lineNumA++;
                lineNumB++;
            } else if (item.type === 'moved') {
                const line = escapeHtml(item.line || '');
                leftPane.push(`<div class="diff-line moved" data-index="${index}">${lineNumAStr}${line}</div>`);
                rightPane.push(`<div class="diff-line moved" data-index="${index}">${lineNumBStr}${line}</div>`);
                lineNumA++;
                lineNumB++;
            }
        });

        diffView.className = 'diff-view side-by-side';
        diffView.innerHTML = `
            <div class="diff-pane left">${leftPane.join('')}</div>
            <div class="diff-pane right">${rightPane.join('')}</div>
        `;
    }

    function displayUnified(showNumbers, granularity) {
        const lines = [];
        let lineNum = 1;

        currentDiff.forEach((item, index) => {
            const lineNumStr = showNumbers ? `<span class="diff-line-number">${lineNum}</span>` : '';

            if (item.type === 'unchanged') {
                const line = escapeHtml(item.line || '');
                lines.push(`<div class="diff-line unchanged" data-index="${index}">${lineNumStr}${line}</div>`);
                lineNum++;
            } else if (item.type === 'removed') {
                const line = escapeHtml(item.line || '');
                lines.push(`<div class="diff-line removed" data-index="${index}">${lineNumStr}-${line}</div>`);
                lineNum++;
            } else if (item.type === 'added') {
                const line = escapeHtml(item.line || '');
                lines.push(`<div class="diff-line added" data-index="${index}">${lineNumStr}+${line}</div>`);
                lineNum++;
            } else if (item.type === 'modified') {
                const oldLine = escapeHtml(item.line || '');
                const newLine = escapeHtml(item.lineNew || '');
                
                if (granularity === 'word' && item.words) {
                    const oldWords = renderWords(item.words.filter(w => w.type === 'removed' || w.type === 'unchanged'));
                    const newWords = renderWords(item.words.filter(w => w.type === 'added' || w.type === 'unchanged'));
                    lines.push(`<div class="diff-line modified" data-index="${index}">${lineNumStr}-${oldWords}</div>`);
                    lines.push(`<div class="diff-line modified" data-index="${index}">${lineNumStr}+${newWords}</div>`);
                } else if (granularity === 'char' && item.chars) {
                    const oldChars = renderChars(item.chars.filter(c => c.type === 'removed' || c.type === 'unchanged'));
                    const newChars = renderChars(item.chars.filter(c => c.type === 'added' || c.type === 'unchanged'));
                    lines.push(`<div class="diff-line modified" data-index="${index}">${lineNumStr}-${oldChars}</div>`);
                    lines.push(`<div class="diff-line modified" data-index="${index}">${lineNumStr}+${newChars}</div>`);
                } else {
                    lines.push(`<div class="diff-line modified" data-index="${index}">${lineNumStr}-${oldLine}</div>`);
                    lines.push(`<div class="diff-line modified" data-index="${index}">${lineNumStr}+${newLine}</div>`);
                }
                lineNum++;
            } else if (item.type === 'moved') {
                const line = escapeHtml(item.line || '');
                lines.push(`<div class="diff-line moved" data-index="${index}">${lineNumStr}${line}</div>`);
                lineNum++;
            }
        });

        diffView.className = 'diff-view unified';
        diffView.innerHTML = lines.join('');
    }

    function renderWords(words) {
        return words.map(w => {
            const word = escapeHtml(w.word || '');
            if (w.type === 'added') {
                return `<span class="diff-word added">${word}</span>`;
            } else if (w.type === 'removed') {
                return `<span class="diff-word removed">${word}</span>`;
            } else if (w.type === 'changed') {
                return `<span class="diff-word changed">${word}</span>`;
            }
            return word;
        }).join('');
    }

    function renderChars(chars) {
        return chars.map(c => {
            const char = escapeHtml(c.char || '');
            if (c.type === 'added') {
                return `<span class="diff-char added">${char}</span>`;
            } else if (c.type === 'removed') {
                return `<span class="diff-char removed">${char}</span>`;
            }
            return char;
        }).join('');
    }

    function updateStats() {
        const added = currentDiff.filter(d => d.type === 'added').length;
        const removed = currentDiff.filter(d => d.type === 'removed').length;
        const modified = currentDiff.filter(d => d.type === 'modified').length;
        const unchanged = currentDiff.filter(d => d.type === 'unchanged').length;
        const moved = currentDiff.filter(d => d.type === 'moved').length;
        const total = currentDiff.length;

        document.getElementById('addedCount').textContent = added;
        document.getElementById('removedCount').textContent = removed;
        document.getElementById('modifiedCount').textContent = modified;
        document.getElementById('unchangedCount').textContent = unchanged;
        document.getElementById('movedBlocksCount').textContent = moved;

        const similarity = total > 0 ? ((unchanged / total) * 100).toFixed(1) : 100;
        document.getElementById('similarity').textContent = similarity + '%';

        // Update summary
        const summary = document.getElementById('diffStatsSummary');
        summary.innerHTML = `
            <span style="color: var(--success-color);">+${added}</span>
            <span style="color: var(--danger-color);">-${removed}</span>
            <span style="color: var(--warning-color);">~${modified}</span>
            <span style="color: var(--info-color);">↔${moved}</span>
        `;

        diffStatsDetailed.style.display = 'flex';
    }

    function updateChangesList() {
        changesList.innerHTML = changeIndices.map((index, i) => {
            const item = currentDiff[index];
            const type = item.type === 'added' ? '+' : item.type === 'removed' ? '-' : item.type === 'modified' ? '~' : '↔';
            const line = (item.line || item.lineNew || '').substring(0, 50);
            return `<div class="change-item" data-index="${index}" data-change-index="${i}">${type} ${escapeHtml(line)}</div>`;
        }).join('');

        // Add click handlers
        changesList.querySelectorAll('.change-item').forEach(item => {
            item.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                scrollToChange(index);
            });
        });
    }

    function updateMinimap() {
        const minimap = document.getElementById('minimap');
        minimap.innerHTML = currentDiff.map(item => {
            const type = item.type === 'added' ? 'added' : 
                        item.type === 'removed' ? 'removed' : 
                        item.type === 'modified' ? 'modified' : 'unchanged';
            return `<div class="minimap-line ${type}"></div>`;
        }).join('');
    }

    function navigateChanges(direction) {
        if (changeIndices.length === 0) return;

        currentChangeIndex += direction;
        if (currentChangeIndex < 0) currentChangeIndex = changeIndices.length - 1;
        if (currentChangeIndex >= changeIndices.length) currentChangeIndex = 0;

        const index = changeIndices[currentChangeIndex];
        scrollToChange(index);
    }

    function scrollToChange(index) {
        const element = diffView.querySelector(`[data-index="${index}"]`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.style.background = 'rgba(37, 99, 235, 0.3)';
            setTimeout(() => {
                element.style.background = '';
            }, 2000);
        }

        // Update active change in sidebar
        changesList.querySelectorAll('.change-item').forEach(item => {
            item.classList.remove('active');
            if (parseInt(item.dataset.index) === index) {
                item.classList.add('active');
            }
        });
    }

    function searchInDiff(query) {
        if (!query) {
            diffView.querySelectorAll('.diff-line').forEach(line => {
                line.style.background = '';
            });
            return;
        }

        diffView.querySelectorAll('.diff-line').forEach(line => {
            const text = line.textContent.toLowerCase();
            if (text.includes(query.toLowerCase())) {
                line.style.background = 'rgba(217, 119, 6, 0.3)';
            } else {
                line.style.background = '';
            }
        });
    }

    function loadSampleData() {
        textA.value = `function greet(name) {
    return "Hello, " + name + "!";
}

console.log(greet("World"));`;

        textB.value = `function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet("World"));
console.log(greet("Universe"));`;

        performCompare();
    }

    function saveDrafts() {
        if (clientSideOnly.checked) return;
        
        try {
            localStorage.setItem('diffDraftA', textA.value);
            localStorage.setItem('diffDraftB', textB.value);
        } catch (e) {
            // Ignore storage errors
        }
    }

    function loadDrafts() {
        if (clientSideOnly.checked) return;
        
        try {
            const draftA = localStorage.getItem('diffDraftA');
            const draftB = localStorage.getItem('diffDraftB');
            if (draftA) textA.value = draftA;
            if (draftB) textB.value = draftB;
        } catch (e) {
            // Ignore storage errors
        }
    }

    function exportUnifiedDiff() {
        const unified = currentDiff.map(item => {
            if (item.type === 'unchanged') {
                return ' ' + (item.line || '');
            } else if (item.type === 'removed') {
                return '-' + (item.line || '');
            } else if (item.type === 'added') {
                return '+' + (item.line || '');
            } else if (item.type === 'modified') {
                return '-' + (item.line || '') + '\n+' + (item.lineNew || '');
            }
            return '';
        }).join('\n');

        downloadFile(unified, 'diff.patch', 'text/plain');
        exportModal.style.display = 'none';
    }

    function exportHTML() {
        const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Diff Report</title>
    <style>
        body { font-family: monospace; padding: 2rem; }
        .diff-line { padding: 2px 4px; }
        .added { background: rgba(16, 185, 129, 0.15); }
        .removed { background: rgba(239, 68, 68, 0.15); }
        .modified { background: rgba(217, 119, 6, 0.15); }
    </style>
</head>
<body>
    <h1>Diff Report</h1>
    <div>${diffView.innerHTML}</div>
</body>
</html>`;

        downloadFile(html, 'diff-report.html', 'text/html');
        exportModal.style.display = 'none';
    }

    function exportJSON() {
        const json = JSON.stringify({
            diff: currentDiff,
            stats: {
                added: currentDiff.filter(d => d.type === 'added').length,
                removed: currentDiff.filter(d => d.type === 'removed').length,
                modified: currentDiff.filter(d => d.type === 'modified').length,
                unchanged: currentDiff.filter(d => d.type === 'unchanged').length
            },
            timestamp: new Date().toISOString()
        }, null, 2);

        downloadFile(json, 'diff.json', 'application/json');
        exportModal.style.display = 'none';
    }

    function exportPDF() {
        showStatus('PDF export requires a library. Please use HTML export and print to PDF.', 'info');
        exportModal.style.display = 'none';
    }

    function shareComparison() {
        const data = {
            textA: textA.value,
            textB: textB.value,
            options: {
                ignoreWhitespace: ignoreWhitespace.checked,
                ignoreCase: ignoreCase.checked,
                viewMode: viewMode.value
            }
        };

        const encoded = btoa(JSON.stringify(data));
        const url = `${window.location.origin}${window.location.pathname}?share=${encoded}`;
        
        Utils.copyToClipboard(url);
        showStatus('Share link copied to clipboard!', 'success');
    }

    function downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    function showStatus(message, type = 'info') {
        const statusMessage = document.getElementById('statusMessage');
        statusMessage.textContent = message;
        statusMessage.className = `status-message status-${type}`;
        statusMessage.style.display = 'block';
        
        setTimeout(() => {
            statusMessage.style.display = 'none';
        }, 3000);
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Load shared comparison
    const urlParams = new URLSearchParams(window.location.search);
    const shareParam = urlParams.get('share');
    if (shareParam) {
        try {
            const data = JSON.parse(atob(shareParam));
            textA.value = data.textA || '';
            textB.value = data.textB || '';
            if (data.options) {
                ignoreWhitespace.checked = data.options.ignoreWhitespace || false;
                ignoreCase.checked = data.options.ignoreCase || false;
                viewMode.value = data.options.viewMode || 'side-by-side';
            }
            performCompare();
        } catch (e) {
            showStatus('Invalid share link', 'error');
        }
    }
});
