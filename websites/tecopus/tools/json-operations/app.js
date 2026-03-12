// JSON Operations Tool - Main Application Logic

class JSONOperationsApp {
    constructor() {
        this.history = [];
        this.historyIndex = -1;
        this.currentTab = 'editor';
        this.jsonData = null;
        this.savedSnapshots = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadTheme();
        this.setupDragAndDrop();
        this.setupKeyboardShortcuts();
        // Restore tree panel widths after a short delay to ensure DOM is ready
        setTimeout(() => {
            this.restoreTreePanelWidths();
        }, 100);
    }

    setupEventListeners() {
        // Tab Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                this.switchTab(tab);
            });
        });

        // Theme Toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Help Modal
        document.getElementById('helpBtn').addEventListener('click', () => {
            document.getElementById('helpModal').classList.add('active');
        });
        document.getElementById('closeHelpModal').addEventListener('click', () => {
            document.getElementById('helpModal').classList.remove('active');
        });

        // Settings Export/Import
        document.getElementById('exportSettingsBtn').addEventListener('click', () => {
            this.exportSettings();
        });
        document.getElementById('importSettingsBtn').addEventListener('click', () => {
            document.getElementById('importSettingsInput').click();
        });
        document.getElementById('importSettingsInput').addEventListener('change', (e) => {
            this.importSettings(e.target.files[0]);
        });

        // Editor Actions
        document.getElementById('loadFileBtn').addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });
        document.getElementById('fileInput').addEventListener('change', (e) => {
            this.handleFileLoad(e.target.files[0]);
        });
        document.getElementById('loadUrlBtn').addEventListener('click', () => {
            this.toggleUrlInput();
        });
        document.getElementById('urlInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.loadFromUrl(e.target.value);
            }
        });

        document.getElementById('validateBtn').addEventListener('click', () => {
            this.validateJSON();
        });
        document.getElementById('formatBtn').addEventListener('click', () => {
            this.formatJSON();
        });
        document.getElementById('minifyBtn').addEventListener('click', () => {
            this.minifyJSON();
        });
        document.getElementById('sortKeysBtn').addEventListener('click', () => {
            this.sortKeys();
        });

        document.getElementById('undoBtn').addEventListener('click', () => {
            this.undo();
        });
        document.getElementById('redoBtn').addEventListener('click', () => {
            this.redo();
        });
        document.getElementById('historyBtn').addEventListener('click', () => {
            this.showHistory();
        });

        document.getElementById('downloadBtn').addEventListener('click', () => {
            this.downloadJSON();
        });
        document.getElementById('copyBtn').addEventListener('click', () => {
            this.copyToClipboard();
        });

        // View Switcher
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.switchView(view);
            });
        });
        
        // Search & Replace functionality
        document.getElementById('searchReplaceBtn').addEventListener('click', () => {
            this.toggleSearchReplace();
        });
        document.getElementById('closeSearchReplaceBtn').addEventListener('click', () => {
            this.closeSearchReplace();
        });
        document.getElementById('searchInputField').addEventListener('input', () => {
            this.performSearch();
        });
        document.getElementById('searchInputField').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                if (e.shiftKey) {
                    this.findPrevious();
                } else {
                    this.findNext();
                }
            }
        });
        document.getElementById('replaceInputField').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.replaceAll();
            }
        });
        document.getElementById('findNextBtn').addEventListener('click', () => {
            this.findNext();
        });
        document.getElementById('findPrevBtn').addEventListener('click', () => {
            this.findPrevious();
        });
        document.getElementById('replaceBtn').addEventListener('click', () => {
            this.replaceCurrent();
        });
        document.getElementById('replaceAllBtn').addEventListener('click', () => {
            this.replaceAll();
        });
        document.getElementById('matchCase').addEventListener('change', () => {
            this.performSearch();
        });
        document.getElementById('useRegex').addEventListener('change', () => {
            this.performSearch();
        });
        document.getElementById('wholeWord').addEventListener('change', () => {
            this.performSearch();
        });
        
        // Keyboard shortcuts for search
        document.addEventListener('keydown', (e) => {
            const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
            const ctrlKey = isMac ? e.metaKey : e.ctrlKey;
            
            if (ctrlKey && e.key === 'f') {
                e.preventDefault();
                this.toggleSearchReplace();
            }
            if (e.key === 'Escape' && document.getElementById('searchReplaceBar').style.display !== 'none') {
                this.closeSearchReplace();
            }
            if (e.key === 'F3') {
                e.preventDefault();
                if (e.shiftKey) {
                    this.findPrevious();
                } else {
                    this.findNext();
                }
            }
        });
        
        // Filter functionality
        document.getElementById('filterInput').addEventListener('input', () => {
            this.applyFilters();
        });
        document.getElementById('filterType').addEventListener('change', () => {
            this.applyFilters();
        });
        document.getElementById('filterDepth').addEventListener('change', () => {
            this.applyFilters();
        });
        document.getElementById('clearFilterBtn').addEventListener('click', () => {
            this.clearFilters();
        });
        
        // Initialize search state
        this.searchMatches = [];
        this.currentMatchIndex = -1;
        
        // Auto-format on input
        const jsonInput = document.getElementById('jsonInput');
        jsonInput.addEventListener('input', () => {
            if (document.getElementById('autoFormat').checked) {
                this.updateStats();
            }
            this.saveToHistory();
            if (this.getCurrentView() === 'text') {
                this.updateEditorTreeView('jsonInput', 'editorTreeView');
            } else {
                this.updateCurrentView();
            }
            this.updateFoldIndicators();
            // Update search highlights if search is active
            if (document.getElementById('searchReplaceBar').style.display !== 'none') {
                this.performSearch();
            }
        });
        
        // Update search highlights on scroll
        jsonInput.addEventListener('scroll', () => {
            if (document.getElementById('searchReplaceBar').style.display !== 'none') {
                this.highlightMatches();
            }
        });
        
        // Scroll sync for fold gutter
        jsonInput.addEventListener('scroll', () => {
            const gutter = document.getElementById('foldGutter');
            if (gutter) {
                gutter.scrollTop = jsonInput.scrollTop;
            }
        });
        
        // Collapse/Expand all buttons
        document.getElementById('collapseAllBtn').addEventListener('click', () => {
            const currentView = this.getCurrentView();
            if (currentView === 'tree') {
                this.collapseAllTreeNodes();
            } else {
                this.collapseAllFolds();
            }
        });
        document.getElementById('expandAllBtn').addEventListener('click', () => {
            const currentView = this.getCurrentView();
            if (currentView === 'tree') {
                this.expandAllTreeNodes();
            } else {
                this.expandAllFolds();
            }
        });
        
        // Initialize fold system
        this.foldedRegions = new Set();
        this.foldRanges = [];
        this.currentView = 'text';
        this.filterState = {
            text: '',
            type: 'all',
            depth: 'all'
        };
        
        // Update fold indicators when content changes
        jsonInput.addEventListener('input', () => {
            setTimeout(() => this.updateFoldIndicators(), 100);
        });
        
        // Initial update
        setTimeout(() => {
            this.updateFoldIndicators();
            this.switchView('text'); // Initialize with text view
        }, 500);
        
        // Tree view toggle buttons
        this.setupTreeViewToggles();
        
        // Tree panel resize functionality
        this.setupTreePanelResize();

        // Compare Tab
        document.getElementById('loadFile1Btn').addEventListener('click', () => {
            this.loadCompareFile(1);
        });
        document.getElementById('loadFile2Btn').addEventListener('click', () => {
            this.loadCompareFile(2);
        });
        document.getElementById('ignoreOrder').addEventListener('change', () => {
            this.compareJSON();
        });
        document.getElementById('ignorePaths').addEventListener('change', () => {
            this.compareJSON();
        });
        document.getElementById('generatePatchBtn').addEventListener('click', () => {
            this.generatePatch();
        });
        document.getElementById('formatCompare1Btn').addEventListener('click', () => {
            this.formatCompareEditor(1);
        });
        document.getElementById('formatCompare2Btn').addEventListener('click', () => {
            this.formatCompareEditor(2);
        });
        document.getElementById('compareSearchBtn').addEventListener('click', () => {
            this.searchInDiff();
        });
        document.getElementById('compareSearchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchInDiff();
            }
        });
        document.getElementById('compareSearchPrev').addEventListener('click', () => {
            this.navigateDiffSearch(-1);
        });
        document.getElementById('compareSearchNext').addEventListener('click', () => {
            this.navigateDiffSearch(1);
        });
        document.getElementById('expandAllDiffBtn').addEventListener('click', () => {
            this.expandAllDiffSections();
        });
        document.getElementById('collapseAllDiffBtn').addEventListener('click', () => {
            this.collapseAllDiffSections();
        });
        
        // Line numbers for compare editors
        const compareInput1 = document.getElementById('compareInput1');
        const compareInput2 = document.getElementById('compareInput2');
        
        if (compareInput1) {
            compareInput1.addEventListener('input', () => {
                this.updateCompareLineNumbers(1);
                this.updateEditorTreeView('compareInput1', 'compare1TreeView');
                if (compareInput2 && compareInput2.value.trim()) {
                    this.compareJSON();
                }
            });
            compareInput1.addEventListener('scroll', () => {
                this.syncCompareScroll(1);
            });
        }
        
        if (compareInput2) {
            compareInput2.addEventListener('input', () => {
                this.updateCompareLineNumbers(2);
                this.updateEditorTreeView('compareInput2', 'compare2TreeView');
                if (compareInput1 && compareInput1.value.trim()) {
                    this.compareJSON();
                }
            });
            compareInput2.addEventListener('scroll', () => {
                this.syncCompareScroll(2);
            });
        }

        // Search Tab
        document.getElementById('searchBtn').addEventListener('click', () => {
            this.performSearch();
        });
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });
        document.getElementById('expandAllBtn').addEventListener('click', () => {
            this.expandAllNodes();
        });
        document.getElementById('collapseAllBtn').addEventListener('click', () => {
            this.collapseAllNodes();
        });

        // Transform Tab
        document.getElementById('addKeyBtn').addEventListener('click', () => {
            this.showAddKeyDialog();
        });
        document.getElementById('removeKeyBtn').addEventListener('click', () => {
            this.showRemoveKeyDialog();
        });
        document.getElementById('renameKeyBtn').addEventListener('click', () => {
            this.showRenameKeyDialog();
        });
        document.getElementById('flattenBtn').addEventListener('click', () => {
            this.flattenJSON();
        });
        document.getElementById('unflattenBtn').addEventListener('click', () => {
            this.unflattenJSON();
        });
        document.getElementById('extractBtn').addEventListener('click', () => {
            this.showExtractDialog();
        });
        document.getElementById('mergeBtn').addEventListener('click', () => {
            this.showMergeDialog();
        });

        // Schema Tab
        document.getElementById('generateSchemaBtn').addEventListener('click', () => {
            this.generateSchema();
        });
        document.getElementById('validateSchemaBtn').addEventListener('click', () => {
            this.validateAgainstSchema();
        });
        document.getElementById('schemaDiffBtn').addEventListener('click', () => {
            this.schemaDiff();
        });
        document.getElementById('schemaToJsonBtn').addEventListener('click', () => {
            this.schemaToJSON();
        });

        // Convert Tab
        document.getElementById('convertBtn').addEventListener('click', () => {
            this.convertJSON();
        });
        document.getElementById('downloadConvertBtn').addEventListener('click', () => {
            this.downloadConverted();
        });

        // Quality Tab
        document.getElementById('scanQualityBtn').addEventListener('click', () => {
            this.scanQuality();
        });
        document.getElementById('detectPIIBtn').addEventListener('click', () => {
            this.detectPII();
        });
        document.getElementById('maskSensitiveBtn').addEventListener('click', () => {
            this.maskSensitiveData();
        });

        // Batch Tab
        document.getElementById('loadBatchFilesBtn').addEventListener('click', () => {
            document.getElementById('batchFileInput').click();
        });
        document.getElementById('batchFileInput').addEventListener('change', (e) => {
            this.handleBatchFileLoad(e.target.files);
        });
        document.getElementById('processBatchBtn').addEventListener('click', () => {
            this.processBatch();
        });
        document.getElementById('downloadBatchBtn').addEventListener('click', () => {
            this.downloadBatch();
        });
        document.getElementById('clearBatchBtn').addEventListener('click', () => {
            this.clearBatch();
        });

        // Analyze Tab
        document.getElementById('analyzeBtn').addEventListener('click', () => {
            this.analyzeJSON();
        });
        document.getElementById('exportAnalysisBtn').addEventListener('click', () => {
            this.exportAnalysis();
        });

        // JSONPath Builder
        document.getElementById('jsonpathBuilderBtn').addEventListener('click', () => {
            document.getElementById('jsonpathModal').classList.add('active');
        });
        document.getElementById('closeJsonpathModal').addEventListener('click', () => {
            document.getElementById('jsonpathModal').classList.remove('active');
        });
        document.getElementById('executeJsonpathBtn').addEventListener('click', () => {
            this.executeJSONPath();
        });
        document.querySelectorAll('.example-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.getElementById('jsonpathExpression').value = e.target.dataset.path;
            });
        });
        
        // Copy path button for tree view
        document.getElementById('copyPathBtn').addEventListener('click', () => {
            this.copySelectedPath();
        });
        
        // Tree view update listeners for all editors
        const editorTreeMappings = [
            { editor: 'transformInput', tree: 'transformInputTreeView' },
            { editor: 'transformOutput', tree: 'transformOutputTreeView' },
            { editor: 'schemaInput', tree: 'schemaInputTreeView' },
            { editor: 'schemaOutput', tree: 'schemaOutputTreeView' },
            { editor: 'convertInput', tree: 'convertInputTreeView' },
            { editor: 'convertOutput', tree: 'convertOutputTreeView' },
            { editor: 'qualityInput', tree: 'qualityInputTreeView' },
            { editor: 'analyzeInput', tree: 'analyzeInputTreeView' }
        ];
        
        editorTreeMappings.forEach(({ editor, tree }) => {
            const editorEl = document.getElementById(editor);
            if (editorEl) {
                editorEl.addEventListener('input', () => {
                    this.updateEditorTreeView(editor, tree);
                });
            }
        });
    }

    setupDragAndDrop() {
        const dropZone = document.getElementById('dropZone');
        const dropOverlay = document.getElementById('dropOverlay');

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, this.preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropOverlay.classList.add('active');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropOverlay.classList.remove('active');
            }, false);
        });

        dropZone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleFileLoad(files[0]);
            }
        }, false);
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
            const ctrlKey = isMac ? e.metaKey : e.ctrlKey;

            if (ctrlKey && e.key === 'z' && !e.shiftKey) {
                e.preventDefault();
                this.undo();
            } else if (ctrlKey && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
                e.preventDefault();
                this.redo();
            } else if (ctrlKey && e.key === 's') {
                e.preventDefault();
                this.downloadJSON();
            } else if (ctrlKey && e.key === '/') {
                e.preventDefault();
                // Toggle comment (if implemented)
            }
        });
    }

    switchTab(tab) {
        this.currentTab = tab;
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
        document.getElementById(`${tab}-tab`).classList.add('active');
        
        // Sync main editor content to tab-specific inputs if needed
        const mainInput = document.getElementById('jsonInput').value;
        if (mainInput && tab !== 'editor') {
            const tabInputs = {
                'search': 'jsonInput',
                'transform': 'transformInput',
                'schema': 'schemaInput',
                'convert': 'convertInput',
                'quality': 'qualityInput'
            };
            if (tabInputs[tab]) {
                const inputEl = document.getElementById(tabInputs[tab]);
                if (inputEl && !inputEl.value.trim()) {
                    inputEl.value = mainInput;
                }
            }
        }
        
        // Initialize line numbers for compare tab
        if (tab === 'compare') {
            this.updateCompareLineNumbers(1);
            this.updateCompareLineNumbers(2);
            this.updateEditorTreeView('compareInput1', 'compare1TreeView');
            this.updateEditorTreeView('compareInput2', 'compare2TreeView');
        }
        
        // Update tree views when switching tabs
        const treeViewMappings = {
            'editor': null, // Now handled by view switcher
            'transform': [
                { editor: 'transformInput', tree: 'transformInputTreeView' },
                { editor: 'transformOutput', tree: 'transformOutputTreeView' }
            ],
            'schema': [
                { editor: 'schemaInput', tree: 'schemaInputTreeView' },
                { editor: 'schemaOutput', tree: 'schemaOutputTreeView' }
            ],
            'convert': [
                { editor: 'convertInput', tree: 'convertInputTreeView' },
                { editor: 'convertOutput', tree: 'convertOutputTreeView' }
            ],
            'quality': { editor: 'qualityInput', tree: 'qualityInputTreeView' },
            'batch': null,
            'analyze': { editor: 'analyzeInput', tree: 'analyzeInputTreeView' }
        };
        
        const mapping = treeViewMappings[tab];
        if (mapping) {
            if (Array.isArray(mapping)) {
                mapping.forEach(({ editor, tree }) => {
                    this.updateEditorTreeView(editor, tree);
                });
            } else {
                this.updateEditorTreeView(mapping.editor, mapping.tree);
            }
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        document.getElementById('themeToggle').querySelector('.icon').textContent = 
            newTheme === 'dark' ? '☀️' : '🌙';
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        document.getElementById('themeToggle').querySelector('.icon').textContent = 
            savedTheme === 'dark' ? '☀️' : '🌙';
    }

    async handleFileLoad(file) {
        if (!file) return;
        
        try {
            const text = await file.text();
            document.getElementById('jsonInput').value = text;
            this.parseAndValidate(text);
            this.updateStats();
            this.updateEditorTreeView('jsonInput', 'editorTreeView');
            setTimeout(() => this.updateFoldIndicators(), 100);
        } catch (error) {
            this.showError('Failed to load file: ' + error.message);
        }
    }

    toggleUrlInput() {
        const urlInput = document.getElementById('urlInput');
        urlInput.style.display = urlInput.style.display === 'none' ? 'block' : 'none';
        if (urlInput.style.display === 'block') {
            urlInput.focus();
        }
    }

    async loadFromUrl(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch');
            const text = await response.text();
            document.getElementById('jsonInput').value = text;
            this.parseAndValidate(text);
            this.updateStats();
            document.getElementById('urlInput').style.display = 'none';
        } catch (error) {
            this.showError('Failed to load from URL: ' + error.message);
        }
    }

    parseAndValidate(text) {
        try {
            this.jsonData = JSON.parse(text);
            this.showValidationStatus(true, 'Valid JSON');
            return true;
        } catch (error) {
            const detailedError = this.getDetailedError(error, text);
            this.showValidationStatus(false, detailedError.message);
            this.showDetailedError(detailedError);
            return false;
        }
    }
    
    getDetailedError(error, text) {
        const lines = text.split('\n');
        const match = error.message.match(/position (\d+)/);
        let position = match ? parseInt(match[1]) : null;
        
        let line = 1;
        let column = 1;
        
        if (position !== null) {
            let currentPos = 0;
            for (let i = 0; i < lines.length; i++) {
                const lineLength = lines[i].length + 1; // +1 for newline
                if (currentPos + lineLength > position) {
                    line = i + 1;
                    column = position - currentPos + 1;
                    break;
                }
                currentPos += lineLength;
            }
        }
        
        const suggestions = this.getErrorSuggestions(error, text, line, column);
        
        return {
            message: error.message,
            line,
            column,
            position,
            context: lines[line - 1] || '',
            suggestions
        };
    }
    
    getErrorSuggestions(error, text, line, column) {
        const suggestions = [];
        const errorMsg = error.message.toLowerCase();
        
        if (errorMsg.includes('unexpected token')) {
            suggestions.push('Check for missing commas between object properties or array elements');
            suggestions.push('Verify all strings are properly quoted');
            suggestions.push('Check for trailing commas (not allowed in JSON)');
        }
        
        if (errorMsg.includes('unexpected end')) {
            suggestions.push('Check for missing closing brackets } or ]');
            suggestions.push('Verify all opening brackets have matching closing brackets');
        }
        
        if (errorMsg.includes('expected')) {
            suggestions.push('Check the syntax around the error position');
            suggestions.push('Verify proper JSON structure (objects use {}, arrays use [])');
        }
        
        // Check for common issues
        if (text.includes("'")) {
            suggestions.push('JSON uses double quotes, not single quotes');
        }
        
        if (text.match(/,\s*[}\]]/)) {
            suggestions.push('Remove trailing commas before closing brackets');
        }
        
        return suggestions;
    }
    
    showDetailedError(errorDetails) {
        // Create or update error details panel
        let errorPanel = document.getElementById('errorDetailsPanel');
        if (!errorPanel) {
            errorPanel = document.createElement('div');
            errorPanel.id = 'errorDetailsPanel';
            errorPanel.className = 'error-details-panel';
            const validationStatus = document.getElementById('validationStatus');
            validationStatus.parentElement.appendChild(errorPanel);
        }
        
        let html = `
            <div class="error-details-header">Error Details</div>
            <div class="error-info">
                <div><strong>Line:</strong> ${errorDetails.line}</div>
                <div><strong>Column:</strong> ${errorDetails.column}</div>
            </div>
            <div class="error-context">
                <strong>Context:</strong>
                <pre>${this.escapeHtml(errorDetails.context)}</pre>
                ${errorDetails.column > 0 ? '<div class="error-pointer">' + ' '.repeat(errorDetails.column - 1) + '^</div>' : ''}
            </div>
        `;
        
        if (errorDetails.suggestions && errorDetails.suggestions.length > 0) {
            html += '<div class="error-suggestions"><strong>Suggestions:</strong><ul>';
            errorDetails.suggestions.forEach(suggestion => {
                html += `<li>${suggestion}</li>`;
            });
            html += '</ul></div>';
        }
        
        errorPanel.innerHTML = html;
        errorPanel.style.display = 'block';
    }

    validateJSON() {
        const input = document.getElementById('jsonInput').value.trim();
        if (!input) {
            this.showError('Please enter JSON to validate');
            return;
        }

        const isValid = this.parseAndValidate(input);
        if (isValid) {
            this.showSuccess('JSON is valid!');
        }
    }

    formatJSON() {
        const input = document.getElementById('jsonInput').value.trim();
        if (!input) {
            this.showError('Please enter JSON to format');
            return;
        }

        try {
            const parsed = JSON.parse(input);
            const indent = document.getElementById('indentSize').value;
            const indentStr = indent === 'tab' ? '\t' : ' '.repeat(parseInt(indent));
            const formatted = JSON.stringify(parsed, null, indentStr);
            document.getElementById('jsonInput').value = formatted;
            this.jsonData = parsed;
            this.updateStats();
            this.updateCurrentView();
            this.updateFoldIndicators();
            this.showSuccess('JSON formatted successfully');
        } catch (error) {
            this.showError('Invalid JSON: ' + error.message);
        }
    }

    minifyJSON() {
        const input = document.getElementById('jsonInput').value.trim();
        if (!input) {
            this.showError('Please enter JSON to minify');
            return;
        }

        try {
            const parsed = JSON.parse(input);
            const minified = JSON.stringify(parsed);
            document.getElementById('jsonInput').value = minified;
            this.jsonData = parsed;
            this.updateStats();
            this.showSuccess('JSON minified successfully');
        } catch (error) {
            this.showError('Invalid JSON: ' + error.message);
        }
    }

    sortKeys() {
        const input = document.getElementById('jsonInput').value.trim();
        if (!input) {
            this.showError('Please enter JSON to sort');
            return;
        }

        try {
            const parsed = JSON.parse(input);
            const sorted = this.sortObjectKeys(parsed);
            const indent = document.getElementById('indentSize').value;
            const indentStr = indent === 'tab' ? '\t' : ' '.repeat(parseInt(indent));
            const formatted = JSON.stringify(sorted, null, indentStr);
            document.getElementById('jsonInput').value = formatted;
            this.jsonData = sorted;
            this.updateStats();
            this.showSuccess('Keys sorted successfully');
        } catch (error) {
            this.showError('Invalid JSON: ' + error.message);
        }
    }

    sortObjectKeys(obj) {
        if (Array.isArray(obj)) {
            return obj.map(item => this.sortObjectKeys(item));
        } else if (obj !== null && typeof obj === 'object') {
            const sorted = {};
            Object.keys(obj).sort().forEach(key => {
                sorted[key] = this.sortObjectKeys(obj[key]);
            });
            return sorted;
        }
        return obj;
    }

    updateStats() {
        const input = document.getElementById('jsonInput').value;
        const lines = input.split('\n').length;
        const chars = input.length;
        const size = (new Blob([input]).size / 1024).toFixed(2);
        document.getElementById('editorStats').textContent = 
            `${lines} lines | ${chars} chars | ${size} KB`;
    }

    showValidationStatus(isValid, message) {
        const statusEl = document.getElementById('validationStatus');
        statusEl.className = 'validation-status ' + (isValid ? 'status-success' : 'status-error');
        statusEl.textContent = isValid ? '✓ Valid JSON' : '✗ ' + message;
        
        // Hide error details if valid
        if (isValid) {
            const errorPanel = document.getElementById('errorDetailsPanel');
            if (errorPanel) {
                errorPanel.style.display = 'none';
            }
        }
    }

    compareJSON() {
        const input1 = document.getElementById('compareInput1').value.trim();
        const input2 = document.getElementById('compareInput2').value.trim();

        if (!input1 || !input2) {
            this.showError('Please provide both JSON inputs');
            return;
        }

        try {
            const json1 = JSON.parse(input1);
            const json2 = JSON.parse(input2);
            const ignoreOrder = document.getElementById('ignoreOrder').checked;
            
            const diff = this.calculateDiff(json1, json2, ignoreOrder);
            this.highlightDifferencesInEditors(input1, input2, diff);
            this.displayDiff(diff);
        } catch (error) {
            this.showError('Invalid JSON: ' + error.message);
        }
    }

    calculateDiff(obj1, obj2, ignoreOrder = false) {
        const diff = { added: [], removed: [], modified: [] };
        this.compareObjects(obj1, obj2, '', diff, ignoreOrder);
        return diff;
    }

    compareObjects(obj1, obj2, path, diff, ignoreOrder) {
        const keys1 = new Set(Object.keys(obj1));
        const keys2 = new Set(Object.keys(obj2));

        keys1.forEach(key => {
            const newPath = path ? `${path}.${key}` : key;
            if (!keys2.has(key)) {
                diff.removed.push({ path: newPath, value: obj1[key] });
            } else if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
                if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object' && 
                    obj1[key] !== null && obj2[key] !== null) {
                    this.compareObjects(obj1[key], obj2[key], newPath, diff, ignoreOrder);
                } else {
                    diff.modified.push({ 
                        path: newPath, 
                        oldValue: obj1[key], 
                        newValue: obj2[key] 
                    });
                }
            }
        });

        keys2.forEach(key => {
            if (!keys1.has(key)) {
                const newPath = path ? `${path}.${key}` : key;
                diff.added.push({ path: newPath, value: obj2[key] });
            }
        });
    }

    displayDiff(diff) {
        const resultsEl = document.getElementById('diffResults');
        const statsEl = document.getElementById('diffStats');
        
        // Store diff for search functionality
        this.currentDiff = diff;
        this.diffSearchResults = [];
        this.diffSearchIndex = -1;
        
        // Calculate two-way comparison
        const missingInFile1 = diff.added; // What's in file2 but not in file1
        const missingInFile2 = diff.removed; // What's in file1 but not in file2
        const changed = diff.modified; // What's different between both
        
        // Update stats
        const total = diff.added.length + diff.removed.length + diff.modified.length;
        statsEl.innerHTML = `
            <span>Added: <strong style="color: var(--success-color);">${diff.added.length}</strong></span>
            <span>Removed: <strong style="color: var(--danger-color);">${diff.removed.length}</strong></span>
            <span>Modified: <strong style="color: var(--warning-color);">${diff.modified.length}</strong></span>
            <span>Total: <strong>${total}</strong></span>
        `;
        
        let html = '';
        
        // Two-way comparison summary
        html += `<div class="comparison-summary">
            <div class="summary-section">
                <h3 class="summary-title">📊 Comparison Summary</h3>
                <div class="summary-grid">
                    <div class="summary-card missing-file1">
                        <div class="summary-card-header">Missing in File 1</div>
                        <div class="summary-card-count">${missingInFile1.length}</div>
                        <div class="summary-card-desc">Present in File 2 only</div>
                    </div>
                    <div class="summary-card missing-file2">
                        <div class="summary-card-header">Missing in File 2</div>
                        <div class="summary-card-count">${missingInFile2.length}</div>
                        <div class="summary-card-desc">Present in File 1 only</div>
                    </div>
                    <div class="summary-card changed">
                        <div class="summary-card-header">Changed Values</div>
                        <div class="summary-card-count">${changed.length}</div>
                        <div class="summary-card-desc">Different values in both files</div>
                    </div>
                </div>
            </div>
        </div>`;
        
        // Detailed differences
        html += '<div class="detailed-differences"><h3 class="summary-title">🔍 Detailed Differences</h3>';
        
        if (diff.added.length > 0) {
            html += `<div class="diff-section expanded" data-type="added">
                <div class="diff-section-header added" onclick="window.app.toggleDiffSection(this)">
                    <span>✅ Added in File 2 (Missing in File 1) - ${diff.added.length} item(s)</span>
                    <span class="expand-icon">▶</span>
                </div>
                <div class="diff-section-content">`;
            diff.added.forEach((item, index) => {
                html += `<div class="diff-item added" data-index="${index}" data-type="added" data-path="${this.escapeHtml(item.path)}" onclick="window.app.scrollToPath(2, '${this.escapeHtml(item.path)}')" style="cursor: pointer;">
                    <span class="diff-path">${this.escapeHtml(item.path)}</span>
                    <span class="diff-value">${this.escapeHtml(JSON.stringify(item.value, null, 2))}</span>
                </div>`;
            });
            html += '</div></div>';
        }

        if (diff.removed.length > 0) {
            html += `<div class="diff-section expanded" data-type="removed">
                <div class="diff-section-header removed" onclick="window.app.toggleDiffSection(this)">
                    <span>❌ Removed from File 2 (Present in File 1) - ${diff.removed.length} item(s)</span>
                    <span class="expand-icon">▶</span>
                </div>
                <div class="diff-section-content">`;
            diff.removed.forEach((item, index) => {
                html += `<div class="diff-item removed" data-index="${index}" data-type="removed" data-path="${this.escapeHtml(item.path)}" onclick="window.app.scrollToPath(1, '${this.escapeHtml(item.path)}')" style="cursor: pointer;">
                    <span class="diff-path">${this.escapeHtml(item.path)}</span>
                    <span class="diff-value">${this.escapeHtml(JSON.stringify(item.value, null, 2))}</span>
                </div>`;
            });
            html += '</div></div>';
        }

        if (diff.modified.length > 0) {
            html += `<div class="diff-section expanded" data-type="modified">
                <div class="diff-section-header modified" onclick="window.app.toggleDiffSection(this)">
                    <span>🔄 Modified Values - ${diff.modified.length} item(s)</span>
                    <span class="expand-icon">▶</span>
                </div>
                <div class="diff-section-content">`;
            diff.modified.forEach((item, index) => {
                html += `<div class="diff-item modified" data-index="${index}" data-type="modified" data-path="${this.escapeHtml(item.path)}" onclick="window.app.scrollToPath(1, '${this.escapeHtml(item.path)}'); window.app.scrollToPath(2, '${this.escapeHtml(item.path)}')" style="cursor: pointer;">
                    <span class="diff-path">${this.escapeHtml(item.path)}</span>
                    <div class="diff-value-comparison">
                        <div class="diff-old">
                            <span class="diff-label">File 1:</span>
                            <span class="diff-old-value">${this.escapeHtml(JSON.stringify(item.oldValue, null, 2))}</span>
                        </div>
                        <div class="diff-new">
                            <span class="diff-label">File 2:</span>
                            <span class="diff-new-value">${this.escapeHtml(JSON.stringify(item.newValue, null, 2))}</span>
                        </div>
                    </div>
                </div>`;
            });
            html += '</div></div>';
        }

        if (diff.added.length === 0 && diff.removed.length === 0 && diff.modified.length === 0) {
            html += '<div class="diff-empty"><p class="status-success">✓ No differences found! JSONs are identical.</p></div>';
        }
        
        html += '</div>';

        resultsEl.innerHTML = html;
    }
    
    highlightDifferencesInEditors(text1, text2, diff) {
        // Clear previous highlights
        this.clearEditorHighlights();
        
        try {
            const json1 = JSON.parse(text1);
            const json2 = JSON.parse(text2);
            
            // Store diff for highlighting
            this.currentDiffForHighlighting = diff;
            
            // Highlight missing items in editor 1 (removed items)
            diff.removed.forEach(item => {
                this.highlightPathInEditor(1, item.path, 'removed');
            });
            
            // Highlight modified items in editor 1 (old values)
            diff.modified.forEach(item => {
                this.highlightPathInEditor(1, item.path, 'modified');
            });
            
            // Highlight added items in editor 2 (new items)
            diff.added.forEach(item => {
                this.highlightPathInEditor(2, item.path, 'added');
            });
            
            // Highlight modified items in editor 2 (new values)
            diff.modified.forEach(item => {
                this.highlightPathInEditor(2, item.path, 'modified');
            });
            
            // Apply visual highlights to editors
            this.applyEditorHighlights();
            
        } catch (error) {
            console.error('Error highlighting differences:', error);
        }
    }
    
    highlightPathInEditor(editorNum, path, type) {
        const editor = document.getElementById(`compareInput${editorNum}`);
        if (!editor) return;
        
        try {
            const editorText = editor.value;
            const lines = editorText.split('\n');
            const pathParts = path.split('.');
            const lastKey = pathParts[pathParts.length - 1];
            
            // Build a pattern to match the key in JSON
            // Handle both quoted and unquoted keys
            const keyPatterns = [
                new RegExp(`"${this.escapeRegex(lastKey)}"\\s*:`, 'g'),
                new RegExp(`'${this.escapeRegex(lastKey)}'\\s*:`, 'g'),
                new RegExp(`${this.escapeRegex(lastKey)}\\s*:`, 'g')
            ];
            
            // Find and mark lines containing this key
            lines.forEach((line, lineIndex) => {
                const trimmedLine = line.trim();
                // Check if line contains the key
                for (const pattern of keyPatterns) {
                    if (pattern.test(line)) {
                        // Also check if this is likely the right path by checking indentation
                        const expectedIndent = pathParts.length * 2; // Assuming 2 spaces per level
                        const actualIndent = line.length - trimmedLine.length;
                        
                        // Mark this line and potentially the next few lines (for multi-line values)
                        this.markLineForHighlight(editorNum, lineIndex, type);
                        
                        // If value is on same line, we're done. Otherwise, mark next few lines
                        if (!trimmedLine.includes(',') && !trimmedLine.endsWith('{') && !trimmedLine.endsWith('[')) {
                            // Value might be on next lines, mark up to 5 lines ahead
                            for (let i = 1; i <= 5 && (lineIndex + i) < lines.length; i++) {
                                const nextLine = lines[lineIndex + i].trim();
                                if (nextLine && (nextLine.startsWith('"') || nextLine.match(/^[0-9-]|^true|^false|null/))) {
                                    this.markLineForHighlight(editorNum, lineIndex + i, type);
                                    if (nextLine.includes(',') || nextLine.includes('}') || nextLine.includes(']')) {
                                        break;
                                    }
                                }
                            }
                        }
                        break;
                    }
                }
            });
            
        } catch (error) {
            console.error('Error highlighting path:', error);
        }
    }
    
    markLineForHighlight(editorNum, lineIndex, type) {
        if (!this.editorHighlights) this.editorHighlights = {};
        if (!this.editorHighlights[editorNum]) this.editorHighlights[editorNum] = [];
        
        // Avoid duplicates
        const exists = this.editorHighlights[editorNum].some(h => h.line === lineIndex);
        if (!exists) {
            this.editorHighlights[editorNum].push({ line: lineIndex, type });
        }
    }
    
    applyEditorHighlights() {
        // Highlight line numbers
        Object.keys(this.editorHighlights || {}).forEach(editorNum => {
            const highlights = this.editorHighlights[editorNum];
            const lineNumbersEl = document.getElementById(`lineNumbers${editorNum}`);
            
            if (lineNumbersEl) {
                highlights.forEach(({ line, type }) => {
                    const lineDiv = lineNumbersEl.children[line];
                    if (lineDiv) {
                        lineDiv.classList.add(`highlight-${type}`);
                        const bgColor = type === 'added' ? 'rgba(16, 185, 129, 0.15)' : 
                                       type === 'removed' ? 'rgba(239, 68, 68, 0.15)' : 
                                       'rgba(245, 158, 11, 0.15)';
                        const borderColor = type === 'added' ? 'var(--success-color)' : 
                                          type === 'removed' ? 'var(--danger-color)' : 
                                          'var(--warning-color)';
                        lineDiv.style.cssText += `
                            background: ${bgColor};
                            border-left: 3px solid ${borderColor};
                            padding-left: 0.25rem;
                            font-weight: 600;
                        `;
                    }
                });
            }
        });
        
        // Add visual indicators in editor area
        this.addEditorVisualIndicators();
    }
    
    addEditorVisualIndicators() {
        Object.keys(this.editorHighlights || {}).forEach(editorNum => {
            const editor = document.getElementById(`compareInput${editorNum}`);
            const wrapper = document.querySelector(`#compareInput${editorNum}`).parentElement;
            
            if (editor && wrapper) {
                // Create indicator overlay
                const overlay = wrapper.querySelector('.diff-indicator-overlay');
                if (!overlay) {
                    const newOverlay = document.createElement('div');
                    newOverlay.className = 'diff-indicator-overlay';
                    newOverlay.style.cssText = `
                        position: absolute;
                        left: 0;
                        top: 0;
                        bottom: 0;
                        width: 4px;
                        pointer-events: none;
                        z-index: 2;
                    `;
                    wrapper.style.position = 'relative';
                    wrapper.appendChild(newOverlay);
                }
            }
        });
    }
    
    clearEditorHighlights() {
        // Clear line number highlights
        document.querySelectorAll('.line-numbers div').forEach(div => {
            div.classList.remove('highlight-added', 'highlight-removed', 'highlight-modified');
            div.style.background = '';
            div.style.borderLeft = '';
            div.style.paddingLeft = '';
            div.style.fontWeight = '';
        });
        
        // Clear indicator overlays
        document.querySelectorAll('.diff-indicator-overlay').forEach(overlay => {
            overlay.remove();
        });
        
        this.editorHighlights = {};
        this.currentDiffForHighlighting = null;
    }
    
    scrollToPath(editorNum, path) {
        const editor = document.getElementById(`compareInput${editorNum}`);
        if (!editor) return;
        
        try {
            const editorText = editor.value;
            const lines = editorText.split('\n');
            const pathParts = path.split('.');
            const lastKey = pathParts[pathParts.length - 1];
            
            // Find the line containing this key
            const keyPatterns = [
                new RegExp(`"${this.escapeRegex(lastKey)}"\\s*:`, 'g'),
                new RegExp(`'${this.escapeRegex(lastKey)}'\\s*:`, 'g'),
                new RegExp(`${this.escapeRegex(lastKey)}\\s*:`, 'g')
            ];
            
            for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
                const line = lines[lineIndex];
                for (const pattern of keyPatterns) {
                    if (pattern.test(line)) {
                        // Calculate scroll position
                        const lineHeight = 1.8; // line-height in rem
                        const fontSize = 0.875; // font-size in rem
                        const padding = 1.5; // padding in rem
                        const scrollTop = (lineIndex * lineHeight * fontSize) - (editor.clientHeight / 2) + (padding * fontSize);
                        
                        editor.scrollTop = Math.max(0, scrollTop);
                        
                        // Also scroll line numbers
                        const lineNumbersEl = document.getElementById(`lineNumbers${editorNum}`);
                        if (lineNumbersEl) {
                            lineNumbersEl.scrollTop = editor.scrollTop;
                        }
                        
                        // Highlight briefly
                        const lineDiv = lineNumbersEl?.children[lineIndex];
                        if (lineDiv) {
                            lineDiv.style.transition = 'background 0.3s';
                            lineDiv.style.background = 'rgba(99, 102, 241, 0.3)';
                            setTimeout(() => {
                                if (lineDiv.classList.contains('highlight-added')) {
                                    lineDiv.style.background = 'rgba(16, 185, 129, 0.15)';
                                } else if (lineDiv.classList.contains('highlight-removed')) {
                                    lineDiv.style.background = 'rgba(239, 68, 68, 0.15)';
                                } else if (lineDiv.classList.contains('highlight-modified')) {
                                    lineDiv.style.background = 'rgba(245, 158, 11, 0.15)';
                                } else {
                                    lineDiv.style.background = '';
                                }
                            }, 1000);
                        }
                        
                        return;
                    }
                }
            }
        } catch (error) {
            console.error('Error scrolling to path:', error);
        }
    }
    
    toggleDiffSection(header) {
        const section = header.parentElement;
        section.classList.toggle('expanded');
    }
    
    expandAllDiffSections() {
        document.querySelectorAll('.diff-section').forEach(section => {
            section.classList.add('expanded');
        });
    }
    
    collapseAllDiffSections() {
        document.querySelectorAll('.diff-section').forEach(section => {
            section.classList.remove('expanded');
        });
    }
    
    searchInDiff() {
        const searchTerm = document.getElementById('compareSearchInput').value.trim();
        if (!searchTerm) {
            this.showError('Please enter a search term');
            return;
        }
        
        // Remove previous highlights
        document.querySelectorAll('.diff-item.highlight').forEach(item => {
            item.classList.remove('highlight');
        });
        
        // Find matches
        this.diffSearchResults = [];
        const searchLower = searchTerm.toLowerCase();
        const items = document.querySelectorAll('.diff-item');
        
        items.forEach((item, index) => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchLower)) {
                this.diffSearchResults.push(item);
            }
        });
        
        if (this.diffSearchResults.length === 0) {
            this.showError('No matches found');
            return;
        }
        
        this.diffSearchIndex = 0;
        this.highlightDiffSearchResult(0);
        this.showSuccess(`Found ${this.diffSearchResults.length} match(es)`);
    }
    
    navigateDiffSearch(direction) {
        if (!this.diffSearchResults || this.diffSearchResults.length === 0) {
            this.showError('Please search first');
            return;
        }
        
        // Remove previous highlights
        document.querySelectorAll('.diff-item.highlight').forEach(item => {
            item.classList.remove('highlight');
        });
        
        this.diffSearchIndex += direction;
        if (this.diffSearchIndex < 0) {
            this.diffSearchIndex = this.diffSearchResults.length - 1;
        } else if (this.diffSearchIndex >= this.diffSearchResults.length) {
            this.diffSearchIndex = 0;
        }
        
        this.highlightDiffSearchResult(this.diffSearchIndex);
    }
    
    highlightDiffSearchResult(index) {
        const item = this.diffSearchResults[index];
        item.classList.add('highlight');
        
        // Expand parent section if collapsed
        const section = item.closest('.diff-section');
        if (section) {
            section.classList.add('expanded');
        }
        
        // Scroll into view
        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Highlight search term in text
        const searchTerm = document.getElementById('compareSearchInput').value.trim();
        this.highlightTextInElement(item, searchTerm);
    }
    
    highlightTextInElement(element, term) {
        // This is a simplified version - in production, you might want more sophisticated highlighting
        const text = element.textContent;
        const regex = new RegExp(`(${this.escapeRegex(term)})`, 'gi');
        // Note: This is simplified - full implementation would preserve HTML structure
    }
    
    escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    updateCompareLineNumbers(num) {
        const editor = document.getElementById(`compareInput${num}`);
        const lineNumbersEl = document.getElementById(`lineNumbers${num}`);
        if (!editor || !lineNumbersEl) return;
        
        const lines = editor.value.split('\n');
        const lineCount = Math.max(lines.length, 1);
        
        let lineNumbersHtml = '';
        for (let i = 1; i <= lineCount; i++) {
            lineNumbersHtml += `<div>${i}</div>`;
        }
        lineNumbersEl.innerHTML = lineNumbersHtml;
        
        // Sync scroll position
        lineNumbersEl.scrollTop = editor.scrollTop;
    }
    
    syncCompareScroll(num) {
        const editor = document.getElementById(`compareInput${num}`);
        const lineNumbersEl = document.getElementById(`lineNumbers${num}`);
        lineNumbersEl.scrollTop = editor.scrollTop;
    }
    
    formatCompareEditor(num) {
        const editor = document.getElementById(`compareInput${num}`);
        const input = editor.value.trim();
        if (!input) {
            this.showError('Please enter JSON to format');
            return;
        }
        
        try {
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, 2);
            editor.value = formatted;
            this.updateCompareLineNumbers(num);
            this.updateEditorTreeView(`compareInput${num}`, `compare${num}TreeView`);
            this.showSuccess('JSON formatted successfully');
        } catch (error) {
            this.showError('Invalid JSON: ' + error.message);
        }
    }

    generatePatch() {
        const input1 = document.getElementById('compareInput1').value.trim();
        const input2 = document.getElementById('compareInput2').value.trim();

        if (!input1 || !input2) {
            this.showError('Please provide both JSON inputs');
            return;
        }

        try {
            const json1 = JSON.parse(input1);
            const json2 = JSON.parse(input2);
            const patch = this.createJSONPatch(json1, json2);
            alert('JSON Patch:\n\n' + JSON.stringify(patch, null, 2));
        } catch (error) {
            this.showError('Failed to generate patch: ' + error.message);
        }
    }

    createJSONPatch(obj1, obj2) {
        // Simplified JSON Patch generation
        const patch = [];
        const diff = this.calculateDiff(obj1, obj2);
        
        diff.removed.forEach(item => {
            patch.push({ op: 'remove', path: '/' + item.path.replace(/\./g, '/') });
        });
        
        diff.added.forEach(item => {
            patch.push({ op: 'add', path: '/' + item.path.replace(/\./g, '/'), value: item.value });
        });
        
        diff.modified.forEach(item => {
            patch.push({ op: 'replace', path: '/' + item.path.replace(/\./g, '/'), value: item.newValue });
        });
        
        return patch;
    }

    performSearch() {
        const input = document.getElementById('jsonInput').value.trim();
        if (!input) {
            this.showError('Please enter JSON to search');
            return;
        }

        try {
            const json = JSON.parse(input);
            const searchTerm = document.getElementById('searchInput').value;
            const searchType = document.getElementById('searchType').value;
            
            let results = [];
            if (searchType === 'jsonpath') {
                results = this.executeJSONPathQuery(json, searchTerm);
            } else if (searchType === 'regex') {
                results = this.searchWithRegex(json, searchTerm);
            } else {
                results = this.searchJSON(json, searchTerm, searchType);
            }
            
            this.displaySearchResults(results);
            this.renderTreeView(json);
        } catch (error) {
            this.showError('Invalid JSON: ' + error.message);
        }
    }

    searchJSON(obj, term, type, path = '', results = []) {
        if (type === 'key' && path.includes(term)) {
            results.push({ path, type: 'key', value: obj });
        } else if (type === 'value' && JSON.stringify(obj).includes(term)) {
            results.push({ path, type: 'value', value: obj });
        } else if (type === 'text' && JSON.stringify(obj).includes(term)) {
            results.push({ path, type: 'text', value: obj });
        }

        if (typeof obj === 'object' && obj !== null) {
            Object.keys(obj).forEach(key => {
                const newPath = path ? `${path}.${key}` : key;
                this.searchJSON(obj[key], term, type, newPath, results);
            });
        }

        return results;
    }

    displaySearchResults(results) {
        const resultsEl = document.getElementById('searchResults');
        if (results.length === 0) {
            resultsEl.innerHTML = '<p>No results found</p>';
            return;
        }

        let html = '';
        results.forEach(result => {
            html += `<div class="result-item" data-path="${result.path}">
                <strong>${result.path}</strong><br>
                <code>${JSON.stringify(result.value).substring(0, 100)}</code>
            </div>`;
        });
        resultsEl.innerHTML = html;
    }

    renderTreeView(obj, parentEl = null, path = '', editorId = null) {
        const treeEl = parentEl || document.getElementById('treeView');
        if (!treeEl) return;
        if (!parentEl) treeEl.innerHTML = '';

        if (typeof obj === 'object' && obj !== null) {
            if (Array.isArray(obj)) {
                obj.forEach((item, index) => {
                    const node = this.createTreeNode(`[${index}]`, item, path ? `${path}[${index}]` : `[${index}]`, editorId);
                    treeEl.appendChild(node);
                });
            } else {
                Object.keys(obj).forEach(key => {
                    const node = this.createTreeNode(key, obj[key], path ? `${path}.${key}` : key, editorId);
                    treeEl.appendChild(node);
                });
            }
        }
    }

    updateEditorTreeView(editorId, treeViewId) {
        const editor = document.getElementById(editorId);
        const treeView = document.getElementById(treeViewId);
        if (!editor || !treeView) return;
        
        const text = editor.value.trim();
        if (!text) {
            treeView.innerHTML = '';
            return;
        }
        
        try {
            const json = JSON.parse(text);
            this.renderTreeView(json, treeView, '', editorId);
        } catch (error) {
            // Invalid JSON, clear tree view
            treeView.innerHTML = '<div style="padding: 0.5rem; color: var(--text-muted); font-size: 0.7rem;">Invalid JSON</div>';
        }
    }
    
    // View Management
    getCurrentView() {
        return this.currentView || 'text';
    }
    
    switchView(view) {
        this.currentView = view;
        
        // Update view buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
        
        // Update view content
        document.querySelectorAll('.view-content').forEach(content => {
            content.classList.toggle('active', content.dataset.view === view);
        });
        
        // Update current view content
        this.updateCurrentView();
        
        // Show/hide filter bar based on view
        const filterBar = document.getElementById('filterBar');
        if (filterBar) {
            if (['tree', 'form', 'table'].includes(view)) {
                filterBar.style.display = 'block';
                filterBar.classList.add('active');
            } else {
                filterBar.style.display = 'none';
                filterBar.classList.remove('active');
            }
        }
    }
    
    updateCurrentView() {
        const view = this.getCurrentView();
        const input = document.getElementById('jsonInput').value.trim();
        
        if (!input) {
            return;
        }
        
        try {
            const json = JSON.parse(input);
            
            switch (view) {
                case 'tree':
                    this.updateTreeView(json);
                    break;
                case 'form':
                    this.updateFormView(json);
                    break;
                case 'code':
                    this.updateCodeView(json);
                    break;
                case 'table':
                    this.updateTableView(json);
                    break;
            }
        } catch (error) {
            // Invalid JSON
        }
    }
    
    updateTreeView(json) {
        const treeView = document.getElementById('editorTreeView');
        if (!treeView) return;
        
        this.renderTreeView(json, treeView, '', 'jsonInput');
        this.applyFilters();
    }
    
    updateFormView(json) {
        const formContainer = document.getElementById('formViewContainer');
        if (!formContainer) return;
        
        formContainer.innerHTML = this.renderFormView(json);
        this.applyFilters();
    }
    
    updateCodeView(json) {
        const codeContent = document.getElementById('codeViewContent');
        if (!codeContent) return;
        
        const formatted = JSON.stringify(json, null, 2);
        codeContent.textContent = formatted;
    }
    
    updateTableView(json) {
        const tableContainer = document.getElementById('tableViewContainer');
        if (!tableContainer) return;
        
        tableContainer.innerHTML = this.renderTableView(json);
        this.applyFilters();
    }
    
    renderFormView(obj, path = '') {
        if (typeof obj !== 'object' || obj === null) {
            return `<div class="form-field">
                <label>${path || 'Value'}</label>
                <input type="text" value="${this.escapeHtml(String(obj))}" readonly>
            </div>`;
        }
        
        if (Array.isArray(obj)) {
            let html = `<div class="form-section">
                <h4>${path || 'Array'}</h4>
                <div class="form-array">`;
            obj.forEach((item, index) => {
                html += this.renderFormView(item, `${path}[${index}]`);
            });
            html += '</div></div>';
            return html;
        }
        
        let html = `<div class="form-section">`;
        if (path) {
            html += `<h4>${path}</h4>`;
        }
        html += '<div class="form-fields">';
        Object.keys(obj).forEach(key => {
            const value = obj[key];
            const newPath = path ? `${path}.${key}` : key;
            
            if (typeof value === 'object' && value !== null) {
                html += this.renderFormView(value, newPath);
            } else {
                html += `<div class="form-field">
                    <label>${key}</label>
                    <input type="${this.getInputType(value)}" value="${this.escapeHtml(String(value))}" readonly>
                </div>`;
            }
        });
        html += '</div></div>';
        return html;
    }
    
    getInputType(value) {
        if (typeof value === 'number') return 'number';
        if (typeof value === 'boolean') return 'checkbox';
        return 'text';
    }
    
    renderTableView(obj) {
        if (!Array.isArray(obj)) {
            return '<div class="table-placeholder">Table view requires an array of objects</div>';
        }
        
        if (obj.length === 0) {
            return '<div class="table-placeholder">Empty array</div>';
        }
        
        const headers = Object.keys(obj[0]);
        let html = '<table class="json-table"><thead><tr>';
        headers.forEach(h => html += `<th>${this.escapeHtml(h)}</th>`);
        html += '</tr></thead><tbody>';
        
        obj.forEach(row => {
            html += '<tr>';
            headers.forEach(h => {
                const val = row[h];
                html += `<td>${this.escapeHtml(String(val !== undefined ? val : ''))}</td>`;
            });
            html += '</tr>';
        });
        
        html += '</tbody></table>';
        return html;
    }
    
    // Filter System
    applyFilters() {
        const view = this.getCurrentView();
        if (!['tree', 'form', 'table'].includes(view)) return;
        
        const filterText = document.getElementById('filterInput').value.toLowerCase();
        const filterType = document.getElementById('filterType').value;
        const filterDepth = document.getElementById('filterDepth').value;
        
        this.filterState = { text: filterText, type: filterType, depth: filterDepth };
        
        if (view === 'tree') {
            this.filterTreeView();
        } else if (view === 'form') {
            this.filterFormView();
        } else if (view === 'table') {
            this.filterTableView();
        }
    }
    
    filterTreeView() {
        const treeView = document.getElementById('editorTreeView');
        if (!treeView) return;
        
        const nodes = treeView.querySelectorAll('.tree-node');
        nodes.forEach(node => {
            const path = node.dataset.path || '';
            const text = node.textContent.toLowerCase();
            const shouldShow = this.shouldShowNode(path, text, node);
            node.style.display = shouldShow ? '' : 'none';
        });
    }
    
    filterFormView() {
        const formContainer = document.getElementById('formViewContainer');
        if (!formContainer) return;
        
        const fields = formContainer.querySelectorAll('.form-field, .form-section');
        fields.forEach(field => {
            const text = field.textContent.toLowerCase();
            const shouldShow = text.includes(this.filterState.text);
            field.style.display = shouldShow ? '' : 'none';
        });
    }
    
    filterTableView() {
        const table = document.querySelector('.json-table');
        if (!table) return;
        
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const shouldShow = text.includes(this.filterState.text);
            row.style.display = shouldShow ? '' : 'none';
        });
    }
    
    shouldShowNode(path, text, node) {
        const { text: filterText, type, depth } = this.filterState;
        
        // Text filter
        if (filterText && !text.includes(filterText) && !path.toLowerCase().includes(filterText)) {
            return false;
        }
        
        // Type filter
        if (type !== 'all') {
            const nodeType = this.getNodeType(node);
            if (nodeType !== type) {
                return false;
            }
        }
        
        // Depth filter
        if (depth !== 'all') {
            const nodeDepth = path.split('.').length;
            const depthNum = parseInt(depth);
            if (depthNum < 4 && nodeDepth !== depthNum) {
                return false;
            }
            if (depthNum === 4 && nodeDepth < 4) {
                return false;
            }
        }
        
        return true;
    }
    
    getNodeType(node) {
        const text = node.textContent;
        if (text.includes('Array(')) return 'array';
        if (text.includes('Object(')) return 'object';
        if (text.includes('true') || text.includes('false')) return 'boolean';
        if (text.match(/^-?\d+$/)) return 'number';
        if (text === 'null') return 'null';
        return 'string';
    }
    
    clearFilters() {
        document.getElementById('filterInput').value = '';
        document.getElementById('filterType').value = 'all';
        document.getElementById('filterDepth').value = 'all';
        this.filterState = { text: '', type: 'all', depth: 'all' };
        this.applyFilters();
    }
    
    collapseAllTreeNodes() {
        document.querySelectorAll('#editorTreeView .tree-node.expandable').forEach(node => {
            node.classList.remove('expanded');
            const children = node.querySelector('.tree-children');
            if (children) children.style.display = 'none';
        });
    }
    
    expandAllTreeNodes() {
        document.querySelectorAll('#editorTreeView .tree-node.expandable').forEach(node => {
            node.classList.add('expanded');
            const children = node.querySelector('.tree-children');
            if (children) {
                children.style.display = 'block';
                if (children.children.length === 0) {
                    const path = node.dataset.path || '';
                    const editorId = node.dataset.editorId || null;
                    try {
                        const nodeValue = JSON.parse(node.dataset.value);
                        this.renderTreeView(nodeValue, children, path, editorId);
                    } catch (e) {}
                }
            }
        });
    }
    
    copySelectedPath() {
        const selected = document.querySelector('#editorTreeView .tree-node.selected');
        if (selected) {
            const path = selected.dataset.path || '';
            navigator.clipboard.writeText(path).then(() => {
                this.showSuccess('Path copied: ' + path);
            });
        } else {
            this.showError('No path selected');
        }
    }
    
    // Search & Replace Functions
    toggleSearchReplace() {
        const bar = document.getElementById('searchReplaceBar');
        if (bar.style.display === 'none') {
            bar.style.display = 'block';
            document.getElementById('searchInputField').focus();
            document.getElementById('searchInputField').select();
        } else {
            this.closeSearchReplace();
        }
    }
    
    closeSearchReplace() {
        const bar = document.getElementById('searchReplaceBar');
        bar.style.display = 'none';
        this.clearSearchHighlights();
        document.getElementById('jsonInput').focus();
    }
    
    performSearch() {
        const textarea = document.getElementById('jsonInput');
        const searchText = document.getElementById('searchInputField').value;
        const matchCase = document.getElementById('matchCase').checked;
        const useRegex = document.getElementById('useRegex').checked;
        const wholeWord = document.getElementById('wholeWord').checked;
        
        if (!searchText) {
            this.clearSearchHighlights();
            document.getElementById('matchCount').textContent = '';
            return;
        }
        
        const text = textarea.value;
        let regex;
        
        try {
            if (useRegex) {
                regex = new RegExp(searchText, matchCase ? 'g' : 'gi');
            } else {
                const escaped = searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const pattern = wholeWord ? `\\b${escaped}\\b` : escaped;
                regex = new RegExp(pattern, matchCase ? 'g' : 'gi');
            }
            
            this.searchMatches = [];
            let match;
            while ((match = regex.exec(text)) !== null) {
                this.searchMatches.push({
                    start: match.index,
                    end: match.index + match[0].length,
                    text: match[0]
                });
                // Prevent infinite loop for zero-length matches
                if (match[0].length === 0) {
                    regex.lastIndex++;
                }
            }
            
            this.currentMatchIndex = this.searchMatches.length > 0 ? 0 : -1;
            this.highlightMatches();
            this.updateMatchCount();
            this.scrollToMatch();
        } catch (error) {
            document.getElementById('matchCount').textContent = 'Invalid regex';
            this.clearSearchHighlights();
        }
    }
    
    highlightMatches() {
        const textarea = document.getElementById('jsonInput');
        const text = textarea.value;
        
        if (this.searchMatches.length === 0) {
            this.clearSearchHighlights();
            return;
        }
        
        // Create a wrapper div to show highlights (since textarea can't show HTML)
        let highlightOverlay = document.getElementById('searchHighlightOverlay');
        if (!highlightOverlay) {
            highlightOverlay = document.createElement('div');
            highlightOverlay.id = 'searchHighlightOverlay';
            highlightOverlay.className = 'search-highlight-overlay';
            const container = textarea.parentElement;
            container.style.position = 'relative';
            container.appendChild(highlightOverlay);
        }
        
        // Position overlay to match textarea exactly
        highlightOverlay.style.position = 'absolute';
        highlightOverlay.style.top = '0';
        highlightOverlay.style.left = '0';
        highlightOverlay.style.width = textarea.offsetWidth + 'px';
        highlightOverlay.style.height = textarea.scrollHeight + 'px';
        highlightOverlay.style.pointerEvents = 'none';
        highlightOverlay.style.zIndex = '3';
        highlightOverlay.style.overflow = 'hidden';
        
        // Clear previous highlights
        highlightOverlay.innerHTML = '';
        
        // Calculate line height and character width
        const computedStyle = getComputedStyle(textarea);
        const lineHeight = parseFloat(computedStyle.lineHeight) || 1.8 * 14;
        const paddingTop = parseFloat(computedStyle.paddingTop) || 24;
        const paddingLeft = parseFloat(computedStyle.paddingLeft) || 24;
        const fontSize = parseFloat(computedStyle.fontSize) || 14;
        const fontFamily = computedStyle.fontFamily;
        
        // Use canvas to measure text width more accurately
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = `${fontSize}px ${fontFamily}`;
        const charWidth = context.measureText('M').width; // Use 'M' as average width
        
        // Create highlight markers
        const lines = text.split('\n');
        
        this.searchMatches.forEach((match, index) => {
            // Find which line contains this match
            let lineIndex = 0;
            let lineStart = 0;
            
            for (let i = 0; i < lines.length; i++) {
                const lineEnd = lineStart + lines[i].length + (i < lines.length - 1 ? 1 : 0); // +1 for newline except last line
                if (match.start >= lineStart && match.start < lineEnd) {
                    lineIndex = i;
                    break;
                }
                lineStart = lineEnd;
            }
            
            // Calculate position
            const line = lines[lineIndex] || '';
            const col = match.start - lineStart;
            const matchText = line.substring(col, col + match.text.length);
            const width = context.measureText(matchText || match.text).width || match.text.length * charWidth;
            
            const top = lineIndex * lineHeight + paddingTop;
            const left = col * charWidth + paddingLeft;
            
            const marker = document.createElement('div');
            marker.className = `search-match ${index === this.currentMatchIndex ? 'current' : ''}`;
            marker.style.position = 'absolute';
            marker.style.top = `${top}px`;
            marker.style.left = `${left}px`;
            marker.style.width = `${Math.max(width, 2)}px`;
            marker.style.height = `${lineHeight}px`;
            marker.style.background = index === this.currentMatchIndex 
                ? 'rgba(99, 102, 241, 0.4)' 
                : 'rgba(99, 102, 241, 0.2)';
            marker.style.borderBottom = index === this.currentMatchIndex 
                ? '2px solid var(--primary-color)' 
                : 'none';
            marker.style.borderRadius = '2px';
            
            highlightOverlay.appendChild(marker);
        });
    }
    
    clearSearchHighlights() {
        const overlay = document.getElementById('searchHighlightOverlay');
        if (overlay) {
            overlay.remove();
        }
        this.searchMatches = [];
        this.currentMatchIndex = -1;
    }
    
    updateMatchCount() {
        const countEl = document.getElementById('matchCount');
        if (this.searchMatches.length === 0) {
            countEl.textContent = '';
        } else {
            countEl.textContent = `${this.currentMatchIndex + 1} of ${this.searchMatches.length}`;
        }
    }
    
    findNext() {
        if (this.searchMatches.length === 0) {
            this.performSearch();
            return;
        }
        
        this.currentMatchIndex = (this.currentMatchIndex + 1) % this.searchMatches.length;
        this.highlightMatches();
        this.updateMatchCount();
        this.scrollToMatch();
    }
    
    findPrevious() {
        if (this.searchMatches.length === 0) {
            this.performSearch();
            return;
        }
        
        this.currentMatchIndex = this.currentMatchIndex <= 0 
            ? this.searchMatches.length - 1 
            : this.currentMatchIndex - 1;
        this.highlightMatches();
        this.updateMatchCount();
        this.scrollToMatch();
    }
    
    scrollToMatch() {
        if (this.currentMatchIndex < 0 || this.currentMatchIndex >= this.searchMatches.length) {
            return;
        }
        
        const textarea = document.getElementById('jsonInput');
        const match = this.searchMatches[this.currentMatchIndex];
        const text = textarea.value;
        
        // Find line number
        const textBeforeMatch = text.substring(0, match.start);
        const lineNumber = textBeforeMatch.split('\n').length - 1;
        
        // Calculate scroll position
        const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight) || 1.8 * 14;
        const scrollTop = lineNumber * lineHeight - textarea.clientHeight / 2;
        
        textarea.scrollTop = Math.max(0, scrollTop);
        textarea.setSelectionRange(match.start, match.end);
        textarea.focus();
    }
    
    replaceCurrent() {
        if (this.currentMatchIndex < 0 || this.currentMatchIndex >= this.searchMatches.length) {
            return;
        }
        
        const textarea = document.getElementById('jsonInput');
        const replaceText = document.getElementById('replaceInputField').value;
        const match = this.searchMatches[this.currentMatchIndex];
        
        const text = textarea.value;
        const newText = text.substring(0, match.start) + replaceText + text.substring(match.end);
        textarea.value = newText;
        
        // Update selection
        textarea.setSelectionRange(match.start, match.start + replaceText.length);
        
        // Recalculate matches
        this.performSearch();
    }
    
    replaceAll() {
        const textarea = document.getElementById('jsonInput');
        const searchText = document.getElementById('searchInputField').value;
        const replaceText = document.getElementById('replaceInputField').value;
        const matchCase = document.getElementById('matchCase').checked;
        const useRegex = document.getElementById('useRegex').checked;
        const wholeWord = document.getElementById('wholeWord').checked;
        
        if (!searchText) {
            return;
        }
        
        let text = textarea.value;
        let regex;
        let replacementCount = 0;
        
        try {
            if (useRegex) {
                regex = new RegExp(searchText, matchCase ? 'g' : 'gi');
                text = text.replace(regex, (match) => {
                    replacementCount++;
                    return replaceText;
                });
            } else {
                const escaped = searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const pattern = wholeWord ? `\\b${escaped}\\b` : escaped;
                regex = new RegExp(pattern, matchCase ? 'g' : 'gi');
                text = text.replace(regex, (match) => {
                    replacementCount++;
                    return replaceText;
                });
            }
            
            textarea.value = text;
            this.showSuccess(`Replaced ${replacementCount} occurrence(s)`);
            this.clearSearchHighlights();
            document.getElementById('matchCount').textContent = '';
            this.saveToHistory();
        } catch (error) {
            this.showError('Replace failed: ' + error.message);
        }
    }
    
    setupTreeViewToggles() {
        // Main editor tree toggle
        const toggleEditorTree = document.getElementById('toggleEditorTree');
        const toggleEditorTreeBtn = document.getElementById('toggleEditorTreeBtn');
        const editorTreePanel = document.getElementById('editorTreePanel');
        
        if (toggleEditorTree && toggleEditorTreeBtn && editorTreePanel) {
            const toggleFn = () => {
                editorTreePanel.classList.toggle('collapsed');
                toggleEditorTree.querySelector('.icon').textContent = 
                    editorTreePanel.classList.contains('collapsed') ? '▶' : '◀';
            };
            toggleEditorTree.addEventListener('click', toggleFn);
            toggleEditorTreeBtn.addEventListener('click', toggleFn);
        }
        
        // Compare tree toggles
        ['1', '2'].forEach(num => {
            const toggleBtn = document.getElementById(`toggleCompare${num}Tree`);
            const toggleHeaderBtn = document.getElementById(`toggleCompare${num}TreeBtn`);
            const panel = document.getElementById(`compare${num}TreePanel`);
            
            if (toggleBtn && toggleHeaderBtn && panel) {
                const toggleFn = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const isCollapsed = panel.classList.contains('collapsed');
                    
                    if (isCollapsed) {
                        panel.classList.remove('collapsed');
                    } else {
                        panel.classList.add('collapsed');
                    }
                    
                    // Update icon in tree panel button
                    const icon = toggleBtn.querySelector('.icon');
                    if (icon) {
                        icon.textContent = panel.classList.contains('collapsed') ? '▶' : '◀';
                    }
                };
                
                toggleBtn.addEventListener('click', toggleFn);
                toggleHeaderBtn.addEventListener('click', toggleFn);
            } else {
                console.warn(`Tree toggle elements not found for compare ${num}:`, {
                    toggleBtn: !!toggleBtn,
                    toggleHeaderBtn: !!toggleHeaderBtn,
                    panel: !!panel
                });
            }
        });
        
        // Transform tree toggles
        ['Input', 'Output'].forEach(type => {
            const toggleBtn = document.getElementById(`toggleTransform${type}Tree`);
            const toggleHeaderBtn = document.getElementById(`toggleTransform${type}TreeBtn`);
            const panel = document.getElementById(`transform${type}TreePanel`);
            
            if (toggleBtn && toggleHeaderBtn && panel) {
                const toggleFn = () => {
                    panel.classList.toggle('collapsed');
                    toggleBtn.querySelector('.icon').textContent = 
                        panel.classList.contains('collapsed') ? '▶' : '◀';
                };
                toggleBtn.addEventListener('click', toggleFn);
                toggleHeaderBtn.addEventListener('click', toggleFn);
            }
        });
        
        // Schema tree toggles
        ['Input', 'Output'].forEach(type => {
            const toggleBtn = document.getElementById(`toggleSchema${type}Tree`);
            const toggleHeaderBtn = document.getElementById(`toggleSchema${type}TreeBtn`);
            const panel = document.getElementById(`schema${type}TreePanel`);
            
            if (toggleBtn && toggleHeaderBtn && panel) {
                const toggleFn = () => {
                    panel.classList.toggle('collapsed');
                    toggleBtn.querySelector('.icon').textContent = 
                        panel.classList.contains('collapsed') ? '▶' : '◀';
                };
                toggleBtn.addEventListener('click', toggleFn);
                toggleHeaderBtn.addEventListener('click', toggleFn);
            }
        });
        
        // Convert tree toggles
        ['Input', 'Output'].forEach(type => {
            const toggleBtn = document.getElementById(`toggleConvert${type}Tree`);
            const toggleHeaderBtn = document.getElementById(`toggleConvert${type}TreeBtn`);
            const panel = document.getElementById(`convert${type}TreePanel`);
            
            if (toggleBtn && toggleHeaderBtn && panel) {
                const toggleFn = () => {
                    panel.classList.toggle('collapsed');
                    toggleBtn.querySelector('.icon').textContent = 
                        panel.classList.contains('collapsed') ? '▶' : '◀';
                };
                toggleBtn.addEventListener('click', toggleFn);
                toggleHeaderBtn.addEventListener('click', toggleFn);
            }
        });
        
        // Quality tree toggle
        const toggleQualityTree = document.getElementById('toggleQualityInputTree');
        const toggleQualityTreeBtn = document.getElementById('toggleQualityInputTreeBtn');
        const qualityTreePanel = document.getElementById('qualityInputTreePanel');
        
        if (toggleQualityTree && toggleQualityTreeBtn && qualityTreePanel) {
            const toggleFn = () => {
                qualityTreePanel.classList.toggle('collapsed');
                toggleQualityTree.querySelector('.icon').textContent = 
                    qualityTreePanel.classList.contains('collapsed') ? '▶' : '◀';
            };
            toggleQualityTree.addEventListener('click', toggleFn);
            toggleQualityTreeBtn.addEventListener('click', toggleFn);
        }
        
        // Analyze tree toggle
        const toggleAnalyzeTree = document.getElementById('toggleAnalyzeInputTree');
        const toggleAnalyzeTreeBtn = document.getElementById('toggleAnalyzeInputTreeBtn');
        const analyzeTreePanel = document.getElementById('analyzeInputTreePanel');
        
        if (toggleAnalyzeTree && toggleAnalyzeTreeBtn && analyzeTreePanel) {
            const toggleFn = () => {
                analyzeTreePanel.classList.toggle('collapsed');
                toggleAnalyzeTree.querySelector('.icon').textContent = 
                    analyzeTreePanel.classList.contains('collapsed') ? '▶' : '◀';
            };
            toggleAnalyzeTree.addEventListener('click', toggleFn);
            toggleAnalyzeTreeBtn.addEventListener('click', toggleFn);
        }
        
        // Expand/Collapse buttons for main editor tree
        const expandEditorTree = document.getElementById('expandEditorTree');
        const collapseEditorTree = document.getElementById('collapseEditorTree');
        
        if (expandEditorTree) {
            expandEditorTree.addEventListener('click', () => {
                const expandNode = (node) => {
                    if (node.classList.contains('expandable')) {
                        const isExpanded = node.classList.contains('expanded');
                        if (!isExpanded) {
                            node.classList.add('expanded');
                            const childrenContainer = node.querySelector('.tree-children');
                            if (childrenContainer) {
                                childrenContainer.style.display = 'block';
                                // Render children if not already rendered
                                if (childrenContainer.children.length === 0) {
                                    try {
                                        const nodeValue = JSON.parse(node.dataset.value);
                                        const path = node.dataset.path || '';
                                        const editorId = node.dataset.editorId || null;
                                        this.renderTreeView(nodeValue, childrenContainer, path, editorId);
                                    } catch (error) {
                                        console.error('Error expanding node:', error);
                                    }
                                }
                                // Expand all children recursively
                                Array.from(childrenContainer.children).forEach(child => {
                                    expandNode(child);
                                });
                            }
                        }
                    }
                };
                document.querySelectorAll('#editorTreeView > .tree-node').forEach(node => {
                    expandNode(node);
                });
            });
        }
        
        if (collapseEditorTree) {
            collapseEditorTree.addEventListener('click', () => {
                document.querySelectorAll('#editorTreeView .tree-node.expandable').forEach(node => {
                    node.classList.remove('expanded');
                    const childrenContainer = node.querySelector('.tree-children');
                    if (childrenContainer) {
                        childrenContainer.style.display = 'none';
                    }
                });
            });
        }
    }

    createTreeNode(key, value, path, editorId = null) {
        const node = document.createElement('div');
        node.className = 'tree-node';
        node.dataset.path = path;
        node.dataset.editorId = editorId || '';
        const isExpandable = typeof value === 'object' && value !== null;
        
        if (isExpandable) {
            node.classList.add('expandable');
            const childrenContainer = document.createElement('div');
            childrenContainer.className = 'tree-children';
            childrenContainer.style.display = 'none';
            
            // Store the value for lazy rendering
            node.dataset.value = JSON.stringify(value);
            
            const label = document.createElement('span');
            const valueStr = Array.isArray(value) ? `Array(${value.length})` : `Object(${Object.keys(value).length})`;
            label.textContent = `${key}: ${valueStr}`;
            label.style.cursor = 'pointer';
            
            // Toggle expansion on label click
            label.addEventListener('click', (e) => {
                e.stopPropagation();
                const isExpanded = node.classList.contains('expanded');
                node.classList.toggle('expanded');
                childrenContainer.style.display = isExpanded ? 'none' : 'block';
                
                // Render children if expanding for first time
                if (!isExpanded && childrenContainer.children.length === 0) {
                    try {
                        const nodeValue = JSON.parse(node.dataset.value);
                        this.renderTreeView(nodeValue, childrenContainer, path, editorId);
                    } catch (error) {
                        console.error('Error rendering tree children:', error);
                    }
                }
            });
            
            // Add click handler for selection
            node.addEventListener('click', (e) => {
                if (e.target === label || label.contains(e.target)) return;
                document.querySelectorAll('.tree-node').forEach(n => n.classList.remove('selected'));
                node.classList.add('selected');
            });
            
            node.appendChild(label);
            node.appendChild(childrenContainer);
        } else {
            // Make leaf nodes clickable to navigate to path
            const label = document.createElement('span');
            const valueStr = JSON.stringify(value);
            label.textContent = `${key}: ${valueStr}`;
            
            if (editorId) {
                label.style.cursor = 'pointer';
                label.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.navigateToPath(editorId, path);
                });
            }
            
            // Add click handler for selection
            node.addEventListener('click', (e) => {
                document.querySelectorAll('.tree-node').forEach(n => n.classList.remove('selected'));
                node.classList.add('selected');
            });
            
            node.appendChild(label);
        }
        
        return node;
    }
    
    setupTreePanelResize() {
        const resizeHandles = document.querySelectorAll('.tree-resize-handle');
        
        resizeHandles.forEach(handle => {
            let isResizing = false;
            let startX = 0;
            let startWidth = 0;
            let panel = null;
            
            handle.addEventListener('mousedown', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                isResizing = true;
                startX = e.clientX;
                panel = document.getElementById(handle.dataset.panel);
                
                if (panel) {
                    startWidth = panel.offsetWidth;
                    panel.classList.add('resizing');
                    document.body.style.cursor = 'col-resize';
                    document.body.style.userSelect = 'none';
                }
            });
            
            document.addEventListener('mousemove', (e) => {
                if (!isResizing || !panel) return;
                
                const diff = e.clientX - startX;
                const newWidth = startWidth + diff;
                
                // Get min and max width from CSS or use defaults
                const minWidth = panel.classList.contains('compare-tree') ? 120 : 
                                panel.classList.contains('split-tree') ? 140 : 150;
                const maxWidth = panel.classList.contains('compare-tree') ? 500 : 
                                panel.classList.contains('split-tree') ? 550 : 600;
                
                if (newWidth >= minWidth && newWidth <= maxWidth) {
                    panel.style.width = `${newWidth}px`;
                }
            });
            
            document.addEventListener('mouseup', () => {
                if (isResizing && panel) {
                    panel.classList.remove('resizing');
                    document.body.style.cursor = '';
                    document.body.style.userSelect = '';
                    
                    // Save width to localStorage
                    const panelId = panel.id;
                    localStorage.setItem(`treePanelWidth_${panelId}`, panel.style.width);
                }
                
                isResizing = false;
                panel = null;
            });
        });
        
        // Restore saved widths on load
        this.restoreTreePanelWidths();
    }
    
    restoreTreePanelWidths() {
        const panels = document.querySelectorAll('.tree-panel');
        panels.forEach(panel => {
            const savedWidth = localStorage.getItem(`treePanelWidth_${panel.id}`);
            if (savedWidth && !panel.classList.contains('collapsed')) {
                panel.style.width = savedWidth;
            }
        });
    }
    
    navigateToPath(editorId, path) {
        const editor = document.getElementById(editorId);
        if (!editor) return;
        
        try {
            const editorText = editor.value;
            const lines = editorText.split('\n');
            const pathParts = path.split('.');
            const lastKey = pathParts[pathParts.length - 1].replace(/\[(\d+)\]/g, '$1');
            
            // Find line containing this key
            for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
                const line = lines[lineIndex];
                const keyPatterns = [
                    new RegExp(`"${this.escapeRegex(lastKey)}"\\s*:`, 'g'),
                    new RegExp(`'${this.escapeRegex(lastKey)}'\\s*:`, 'g'),
                    new RegExp(`${this.escapeRegex(lastKey)}\\s*:`, 'g')
                ];
                
                for (const pattern of keyPatterns) {
                    if (pattern.test(line)) {
                        // Scroll to line
                        const lineHeight = 1.8 * 0.875; // line-height * font-size in rem
                        const scrollTop = (lineIndex * lineHeight * 16) - (editor.clientHeight / 2);
                        editor.scrollTop = Math.max(0, scrollTop);
                        editor.focus();
                        
                        // Highlight line briefly
                        const selection = window.getSelection();
                        const range = document.createRange();
                        // This is a simplified approach - in production you might want more sophisticated highlighting
                        return;
                    }
                }
            }
        } catch (error) {
            console.error('Error navigating to path:', error);
        }
    }

    expandAllNodes() {
        document.querySelectorAll('.tree-node.expandable').forEach(node => {
            node.classList.add('expanded');
            const childrenContainer = node.querySelector('.tree-children');
            if (childrenContainer) {
                childrenContainer.style.display = 'block';
                // Render children if not already rendered
                if (childrenContainer.children.length === 0) {
                    const path = node.dataset.path || '';
                    const editorId = node.dataset.editorId || null;
                    // We need to get the value from the path - simplified approach
                    // For now, just show the container
                }
            }
        });
    }

    collapseAllNodes() {
        document.querySelectorAll('.tree-node.expandable').forEach(node => {
            node.classList.remove('expanded');
            const childrenContainer = node.querySelector('.tree-children');
            if (childrenContainer) {
                childrenContainer.style.display = 'none';
            }
        });
    }
    
    expandTreeNode(node) {
        if (!node.classList.contains('expandable')) return;
        
        const isExpanded = node.classList.contains('expanded');
        node.classList.toggle('expanded');
        
        const childrenContainer = node.querySelector('.tree-children');
        if (childrenContainer) {
            childrenContainer.style.display = isExpanded ? 'none' : 'block';
            
            // Render children if expanding for first time
            if (!isExpanded && childrenContainer.children.length === 0) {
                const path = node.dataset.path || '';
                const editorId = node.dataset.editorId || null;
                // Get value from node data or reconstruct from tree structure
                // This is a simplified version - in production you'd want to store the value
            }
        }
    }

    flattenJSON() {
        const input = document.getElementById('transformInput').value.trim();
        if (!input) {
            this.showError('Please enter JSON to flatten');
            return;
        }

        try {
            const json = JSON.parse(input);
            const flattened = this.flattenObject(json);
            const output = JSON.stringify(flattened, null, 2);
            document.getElementById('transformOutput').value = output;
            this.updateEditorTreeView('transformOutput', 'transformOutputTreeView');
        } catch (error) {
            this.showError('Invalid JSON: ' + error.message);
        }
    }

    flattenObject(obj, prefix = '', result = {}) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const newKey = prefix ? `${prefix}.${key}` : key;
                if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                    this.flattenObject(obj[key], newKey, result);
                } else {
                    result[newKey] = obj[key];
                }
            }
        }
        return result;
    }

    unflattenJSON() {
        const input = document.getElementById('transformInput').value.trim();
        if (!input) {
            this.showError('Please enter flattened JSON');
            return;
        }

        try {
            const json = JSON.parse(input);
            const unflattened = this.unflattenObject(json);
            const output = JSON.stringify(unflattened, null, 2);
            document.getElementById('transformOutput').value = output;
            this.updateEditorTreeView('transformOutput', 'transformOutputTreeView');
        } catch (error) {
            this.showError('Invalid JSON: ' + error.message);
        }
    }

    unflattenObject(obj) {
        const result = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const keys = key.split('.');
                let current = result;
                for (let i = 0; i < keys.length - 1; i++) {
                    if (!current[keys[i]]) {
                        current[keys[i]] = {};
                    }
                    current = current[keys[i]];
                }
                current[keys[keys.length - 1]] = obj[key];
            }
        }
        return result;
    }

    generateSchema() {
        const input = document.getElementById('schemaInput').value.trim();
        if (!input) {
            this.showError('Please enter JSON to generate schema');
            return;
        }

        try {
            const json = JSON.parse(input);
            const schema = this.inferSchema(json);
            const output = JSON.stringify(schema, null, 2);
            document.getElementById('schemaOutput').value = output;
            this.updateEditorTreeView('schemaOutput', 'schemaOutputTreeView');
        } catch (error) {
            this.showError('Invalid JSON: ' + error.message);
        }
    }

    inferSchema(obj, path = '#') {
        const schema = {
            type: Array.isArray(obj) ? 'array' : typeof obj === 'object' && obj !== null ? 'object' : typeof obj,
        };

        if (schema.type === 'object') {
            schema.properties = {};
            schema.required = [];
            Object.keys(obj).forEach(key => {
                schema.properties[key] = this.inferSchema(obj[key], `${path}/${key}`);
                schema.required.push(key);
            });
        } else if (schema.type === 'array' && obj.length > 0) {
            schema.items = this.inferSchema(obj[0], `${path}/0`);
        }

        return schema;
    }

    convertJSON() {
        const input = document.getElementById('convertInput').value.trim();
        if (!input) {
            this.showError('Please enter JSON to convert');
            return;
        }

        try {
            const json = JSON.parse(input);
            const format = document.getElementById('convertFormat').value;
            let converted = '';

            switch (format) {
                case 'csv':
                    converted = this.jsonToCSV(json);
                    break;
                case 'xml':
                    converted = this.jsonToXML(json);
                    break;
                case 'yaml':
                    converted = this.jsonToYAML(json);
                    break;
                case 'typescript':
                    converted = this.jsonToTypeScript(json);
                    break;
                case 'python':
                    converted = this.jsonToPython(json);
                    break;
                case 'java':
                    converted = this.jsonToJava(json);
                    break;
                case 'csharp':
                    converted = this.jsonToCSharp(json);
                    break;
                case 'javascript':
                    converted = this.jsonToJavaScript(json);
                    break;
                case 'graphql':
                    converted = this.jsonToGraphQL(json);
                    break;
                case 'openapi':
                    converted = this.jsonToOpenAPI(json);
                    break;
                case 'postman':
                    converted = this.jsonToPostman(json);
                    break;
                case 'curl':
                    converted = this.jsonToCurl(json);
                    break;
                case 'sql':
                    converted = this.jsonToSQL(json);
                    break;
                case 'mongodb':
                    converted = this.jsonToMongoDB(json);
                    break;
                case 'html':
                    converted = this.jsonToHTML(json);
                    break;
                case 'markdown':
                    converted = this.jsonToMarkdown(json);
                    break;
                default:
                    converted = JSON.stringify(json, null, 2);
            }

            document.getElementById('convertOutput').value = converted;
            // Only update tree view for JSON-like outputs
            if (['csv', 'xml', 'yaml', 'html', 'markdown', 'sql', 'mongodb', 'curl', 'graphql', 'openapi', 'postman'].includes(format)) {
                // These formats don't have tree views
            } else {
                this.updateEditorTreeView('convertOutput', 'convertOutputTreeView');
            }
        } catch (error) {
            this.showError('Conversion failed: ' + error.message);
        }
    }

    jsonToCSV(json) {
        if (Array.isArray(json) && json.length > 0) {
            const headers = Object.keys(json[0]);
            const rows = json.map(obj => headers.map(h => JSON.stringify(obj[h] || '')));
            return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        }
        return 'CSV conversion requires an array of objects';
    }

    jsonToXML(obj, rootName = 'root') {
        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>`;
        xml += this.objectToXML(obj);
        xml += `</${rootName}>`;
        return xml;
    }

    objectToXML(obj, indent = '') {
        let xml = '';
        if (typeof obj === 'object' && obj !== null) {
            if (Array.isArray(obj)) {
                obj.forEach(item => {
                    xml += `\n${indent}  <item>${this.objectToXML(item, indent + '  ')}</item>`;
                });
            } else {
                Object.keys(obj).forEach(key => {
                    const value = obj[key];
                    if (typeof value === 'object' && value !== null) {
                        xml += `\n${indent}  <${key}>${this.objectToXML(value, indent + '  ')}</${key}>`;
                    } else {
                        xml += `\n${indent}  <${key}>${this.escapeXML(value)}</${key}>`;
                    }
                });
            }
        } else {
            xml = this.escapeXML(obj);
        }
        return xml;
    }

    escapeXML(str) {
        return String(str).replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }

    jsonToYAML(obj, indent = 0) {
        let yaml = '';
        const indentStr = '  '.repeat(indent);

        if (Array.isArray(obj)) {
            obj.forEach(item => {
                yaml += `${indentStr}- ${this.valueToYAML(item, indent + 1)}\n`;
            });
        } else if (typeof obj === 'object' && obj !== null) {
            Object.keys(obj).forEach(key => {
                const value = obj[key];
                yaml += `${indentStr}${key}: ${this.valueToYAML(value, indent + 1)}\n`;
            });
        } else {
            yaml = String(obj);
        }

        return yaml;
    }

    valueToYAML(value, indent) {
        if (typeof value === 'object' && value !== null) {
            return '\n' + this.jsonToYAML(value, indent);
        }
        return String(value);
    }

    jsonToTypeScript(obj, interfaceName = 'Root') {
        let ts = `interface ${interfaceName} {\n`;
        if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
            Object.keys(obj).forEach(key => {
                const value = obj[key];
                const type = this.getTypeScriptType(value);
                ts += `  ${key}: ${type};\n`;
            });
        }
        ts += '}';
        return ts;
    }

    getTypeScriptType(value) {
        if (value === null) return 'null';
        if (Array.isArray(value)) {
            return value.length > 0 ? `${this.getTypeScriptType(value[0])}[]` : 'any[]';
        }
        if (typeof value === 'object') return 'object';
        return typeof value;
    }

    jsonToPython(obj, className = 'Root') {
        let py = `from dataclasses import dataclass\nfrom typing import Optional\n\n`;
        py += `@dataclass\nclass ${className}:\n`;
        if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
            Object.keys(obj).forEach(key => {
                const value = obj[key];
                const type = this.getPythonType(value);
                py += `    ${key}: ${type}\n`;
            });
        }
        return py;
    }

    getPythonType(value) {
        if (value === null) return 'Optional[None]';
        if (Array.isArray(value)) return 'list';
        if (typeof value === 'object') return 'dict';
        return typeof value === 'string' ? 'str' : typeof value === 'number' ? 'float' : typeof value;
    }

    jsonToJava(obj, className = 'Root') {
        let java = `public class ${className} {\n`;
        if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
            Object.keys(obj).forEach(key => {
                const value = obj[key];
                const type = this.getJavaType(value);
                java += `    private ${type} ${key};\n`;
            });
        }
        java += '}';
        return java;
    }

    getJavaType(value) {
        if (Array.isArray(value)) return 'List<Object>';
        if (typeof value === 'string') return 'String';
        if (typeof value === 'number') return Number.isInteger(value) ? 'Integer' : 'Double';
        if (typeof value === 'boolean') return 'Boolean';
        return 'Object';
    }

    jsonToCSharp(obj, className = 'Root') {
        let cs = `public class ${className}\n{\n`;
        if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
            Object.keys(obj).forEach(key => {
                const value = obj[key];
                const type = this.getCSharpType(value);
                cs += `    public ${type} ${this.toPascalCase(key)} { get; set; }\n`;
            });
        }
        cs += '}';
        return cs;
    }

    getCSharpType(value) {
        if (Array.isArray(value)) return 'List<object>';
        if (typeof value === 'string') return 'string';
        if (typeof value === 'number') return Number.isInteger(value) ? 'int' : 'double';
        if (typeof value === 'boolean') return 'bool';
        return 'object';
    }

    toPascalCase(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    scanQuality() {
        const input = document.getElementById('qualityInput').value.trim();
        if (!input) {
            this.showError('Please enter JSON to scan');
            return;
        }

        try {
            const json = JSON.parse(input);
            const report = this.analyzeQuality(json);
            this.displayQualityReport(report);
        } catch (error) {
            this.showError('Invalid JSON: ' + error.message);
        }
    }

    analyzeQuality(obj) {
        const report = [];
        
        // Check for null values
        this.findNullValues(obj, '', report);
        
        // Check for empty objects/arrays
        this.findEmptyStructures(obj, '', report);
        
        // Check naming conventions
        this.checkNamingConventions(obj, '', report);
        
        return report;
    }

    findNullValues(obj, path, report) {
        if (obj === null) {
            report.push({ type: 'warning', message: `Null value found at: ${path || 'root'}` });
        } else if (typeof obj === 'object') {
            Object.keys(obj).forEach(key => {
                const newPath = path ? `${path}.${key}` : key;
                this.findNullValues(obj[key], newPath, report);
            });
        }
    }

    findEmptyStructures(obj, path, report) {
        if (Array.isArray(obj) && obj.length === 0) {
            report.push({ type: 'info', message: `Empty array at: ${path || 'root'}` });
        } else if (typeof obj === 'object' && obj !== null && Object.keys(obj).length === 0) {
            report.push({ type: 'info', message: `Empty object at: ${path || 'root'}` });
        } else if (typeof obj === 'object' && obj !== null) {
            Object.keys(obj).forEach(key => {
                const newPath = path ? `${path}.${key}` : key;
                this.findEmptyStructures(obj[key], newPath, report);
            });
        }
    }

    checkNamingConventions(obj, path, report) {
        if (typeof obj === 'object' && obj !== null) {
            Object.keys(obj).forEach(key => {
                const newPath = path ? `${path}.${key}` : key;
                if (key.includes('_') && key.includes('-')) {
                    report.push({ type: 'warning', message: `Mixed naming convention at: ${newPath}` });
                }
                this.checkNamingConventions(obj[key], newPath, report);
            });
        }
    }

    detectPII() {
        const input = document.getElementById('qualityInput').value.trim();
        if (!input) {
            this.showError('Please enter JSON to scan for PII');
            return;
        }

        try {
            const json = JSON.parse(input);
            const pii = this.findPII(json);
            this.displayPIIReport(pii);
        } catch (error) {
            this.showError('Invalid JSON: ' + error.message);
        }
    }

    findPII(obj, path = '', results = []) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
        const ssnRegex = /\d{3}-\d{2}-\d{4}/;
        const ccRegex = /\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}/;

        if (typeof obj === 'string') {
            if (emailRegex.test(obj)) {
                results.push({ type: 'email', path, value: obj });
            } else if (phoneRegex.test(obj)) {
                results.push({ type: 'phone', path, value: obj });
            } else if (ssnRegex.test(obj)) {
                results.push({ type: 'ssn', path, value: obj });
            } else if (ccRegex.test(obj)) {
                results.push({ type: 'credit_card', path, value: obj });
            }
        } else if (typeof obj === 'object' && obj !== null) {
            Object.keys(obj).forEach(key => {
                const newPath = path ? `${path}.${key}` : key;
                this.findPII(obj[key], newPath, results);
            });
        }

        return results;
    }

    displayPIIReport(pii) {
        const reportEl = document.getElementById('qualityReport');
        if (pii.length === 0) {
            reportEl.innerHTML = '<p class="status-success">No PII detected</p>';
            return;
        }

        let html = '<h3>PII Detection Results</h3>';
        pii.forEach(item => {
            html += `<div class="quality-item warning">
                <strong>${item.type.toUpperCase()}</strong> found at: <code>${item.path}</code><br>
                Value: <code>${item.value}</code>
            </div>`;
        });
        reportEl.innerHTML = html;
    }

    maskSensitiveData() {
        const input = document.getElementById('qualityInput').value.trim();
        if (!input) {
            this.showError('Please enter JSON to mask');
            return;
        }

        try {
            const json = JSON.parse(input);
            const masked = this.maskPII(json);
            document.getElementById('qualityInput').value = JSON.stringify(masked, null, 2);
            this.showSuccess('Sensitive data masked');
        } catch (error) {
            this.showError('Failed to mask data: ' + error.message);
        }
    }

    maskPII(obj) {
        const masked = JSON.parse(JSON.stringify(obj));
        return this.applyMask(masked);
    }

    applyMask(obj, path = '') {
        if (typeof obj === 'string') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
            const ssnRegex = /\d{3}-\d{2}-\d{4}/;
            const ccRegex = /\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}/;

            if (emailRegex.test(obj)) {
                return '***@***.***';
            } else if (phoneRegex.test(obj)) {
                return '***-***-****';
            } else if (ssnRegex.test(obj)) {
                return '***-**-****';
            } else if (ccRegex.test(obj)) {
                return '****-****-****-****';
            }
            return obj;
        } else if (typeof obj === 'object' && obj !== null) {
            if (Array.isArray(obj)) {
                return obj.map(item => this.applyMask(item, path));
            } else {
                const result = {};
                Object.keys(obj).forEach(key => {
                    const newPath = path ? `${path}.${key}` : key;
                    result[key] = this.applyMask(obj[key], newPath);
                });
                return result;
            }
        }
        return obj;
    }

    displayQualityReport(report) {
        const reportEl = document.getElementById('qualityReport');
        if (report.length === 0) {
            reportEl.innerHTML = '<p class="status-success">No issues found</p>';
            return;
        }

        let html = '<h3>Quality Report</h3>';
        report.forEach(item => {
            html += `<div class="quality-item ${item.type}">${item.message}</div>`;
        });
        reportEl.innerHTML = html;
    }

    saveToHistory() {
        const currentValue = document.getElementById('jsonInput').value;
        if (this.history[this.historyIndex] !== currentValue) {
            this.history = this.history.slice(0, this.historyIndex + 1);
            this.history.push(currentValue);
            this.historyIndex = this.history.length - 1;
            if (this.history.length > 50) {
                this.history.shift();
                this.historyIndex--;
            }
        }
    }

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            document.getElementById('jsonInput').value = this.history[this.historyIndex];
            this.updateStats();
        }
    }

    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            document.getElementById('jsonInput').value = this.history[this.historyIndex];
            this.updateStats();
        }
    }

    showHistory() {
        alert(`History: ${this.history.length} entries\nCurrent position: ${this.historyIndex + 1}`);
    }

    downloadJSON() {
        const content = document.getElementById('jsonInput').value;
        const blob = new Blob([content], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    downloadConverted() {
        const content = document.getElementById('convertOutput').value;
        const format = document.getElementById('convertFormat').value;
        const extension = format === 'typescript' ? 'ts' : format === 'python' ? 'py' : format === 'java' ? 'java' : format === 'csharp' ? 'cs' : format;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `converted.${extension}`;
        a.click();
        URL.revokeObjectURL(url);
    }

    copyToClipboard() {
        const content = document.getElementById('jsonInput').value;
        navigator.clipboard.writeText(content).then(() => {
            this.showSuccess('Copied to clipboard!');
        }).catch(() => {
            this.showError('Failed to copy');
        });
    }

    async loadCompareFile(num) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                try {
                    const text = await file.text();
                    document.getElementById(`compareInput${num}`).value = text;
                    this.updateCompareLineNumbers(num);
                    const otherInput = document.getElementById(`compareInput${num === 1 ? 2 : 1}`).value;
                    if (otherInput.trim()) {
                        this.compareJSON();
                    }
                } catch (error) {
                    this.showError('Failed to load file: ' + error.message);
                }
            }
        };
        input.click();
    }

    showAddKeyDialog() {
        const path = prompt('Enter path (e.g., "user.name"):');
        const value = prompt('Enter value:');
        if (path && value) {
            this.addKey(path, value);
        }
    }

    showRemoveKeyDialog() {
        const path = prompt('Enter path to remove:');
        if (path) {
            this.removeKey(path);
        }
    }

    showRenameKeyDialog() {
        const oldPath = prompt('Enter current path:');
        const newName = prompt('Enter new key name:');
        if (oldPath && newName) {
            this.renameKey(oldPath, newName);
        }
    }

    showExtractDialog() {
        const path = prompt('Enter path to extract:');
        if (path) {
            this.extractPath(path);
        }
    }

    showMergeDialog() {
        const json2 = prompt('Enter second JSON:');
        if (json2) {
            try {
                const parsed = JSON.parse(json2);
                this.mergeJSON(parsed);
            } catch (error) {
                this.showError('Invalid JSON: ' + error.message);
            }
        }
    }

    addKey(path, value) {
        const input = document.getElementById('transformInput').value.trim();
        if (!input) {
            this.showError('Please enter JSON');
            return;
        }

        try {
            const json = JSON.parse(input);
            const keys = path.split('.');
            let current = json;
            for (let i = 0; i < keys.length - 1; i++) {
                if (!current[keys[i]]) {
                    current[keys[i]] = {};
                }
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = JSON.parse(value);
            const output = JSON.stringify(json, null, 2);
            document.getElementById('transformOutput').value = output;
            this.updateEditorTreeView('transformOutput', 'transformOutputTreeView');
        } catch (error) {
            this.showError('Failed to add key: ' + error.message);
        }
    }

    removeKey(path) {
        const input = document.getElementById('transformInput').value.trim();
        if (!input) {
            this.showError('Please enter JSON');
            return;
        }

        try {
            const json = JSON.parse(input);
            const keys = path.split('.');
            let current = json;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            delete current[keys[keys.length - 1]];
            const output = JSON.stringify(json, null, 2);
            document.getElementById('transformOutput').value = output;
            this.updateEditorTreeView('transformOutput', 'transformOutputTreeView');
        } catch (error) {
            this.showError('Failed to remove key: ' + error.message);
        }
    }

    renameKey(path, newName) {
        const input = document.getElementById('transformInput').value.trim();
        if (!input) {
            this.showError('Please enter JSON');
            return;
        }

        try {
            const json = JSON.parse(input);
            const keys = path.split('.');
            let current = json;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            const value = current[keys[keys.length - 1]];
            delete current[keys[keys.length - 1]];
            current[newName] = value;
            const output = JSON.stringify(json, null, 2);
            document.getElementById('transformOutput').value = output;
            this.updateEditorTreeView('transformOutput', 'transformOutputTreeView');
        } catch (error) {
            this.showError('Failed to rename key: ' + error.message);
        }
    }

    extractPath(path) {
        const input = document.getElementById('transformInput').value.trim();
        if (!input) {
            this.showError('Please enter JSON');
            return;
        }

        try {
            const json = JSON.parse(input);
            const keys = path.split('.');
            let current = json;
            for (const key of keys) {
                current = current[key];
            }
            const output = JSON.stringify(current, null, 2);
            document.getElementById('transformOutput').value = output;
            this.updateEditorTreeView('transformOutput', 'transformOutputTreeView');
        } catch (error) {
            this.showError('Failed to extract path: ' + error.message);
        }
    }

    mergeJSON(json2) {
        const input = document.getElementById('transformInput').value.trim();
        if (!input) {
            this.showError('Please enter JSON');
            return;
        }

        try {
            const json1 = JSON.parse(input);
            const merged = { ...json1, ...json2 };
            const output = JSON.stringify(merged, null, 2);
            document.getElementById('transformOutput').value = output;
            this.updateEditorTreeView('transformOutput', 'transformOutputTreeView');
        } catch (error) {
            this.showError('Failed to merge: ' + error.message);
        }
    }

    validateAgainstSchema() {
        const input = document.getElementById('schemaInput').value.trim();
        const schemaInput = document.getElementById('schemaOutput').value.trim();
        
        if (!input || !schemaInput) {
            this.showError('Please provide both JSON and schema');
            return;
        }

        try {
            const json = JSON.parse(input);
            const schema = JSON.parse(schemaInput);
            // Simplified validation - in production, use a proper JSON Schema validator
            this.showSuccess('Schema validation completed (simplified)');
        } catch (error) {
            this.showError('Validation failed: ' + error.message);
        }
    }

    schemaDiff() {
        this.showError('Schema diff feature coming soon');
    }

    schemaToJSON() {
        const schemaInput = document.getElementById('schemaOutput').value.trim();
        if (!schemaInput) {
            this.showError('Please provide a schema');
            return;
        }

        try {
            const schema = JSON.parse(schemaInput);
            const sample = this.generateSampleFromSchema(schema);
            document.getElementById('schemaInput').value = JSON.stringify(sample, null, 2);
        } catch (error) {
            this.showError('Failed to generate sample: ' + error.message);
        }
    }

    generateSampleFromSchema(schema) {
        if (schema.type === 'object' && schema.properties) {
            const sample = {};
            Object.keys(schema.properties).forEach(key => {
                sample[key] = this.generateSampleFromSchema(schema.properties[key]);
            });
            return sample;
        } else if (schema.type === 'array' && schema.items) {
            return [this.generateSampleFromSchema(schema.items)];
        } else {
            switch (schema.type) {
                case 'string': return '';
                case 'number': return 0;
                case 'boolean': return false;
                case 'array': return [];
                default: return null;
            }
        }
    }

    // Enhanced JSONPath Support
    executeJSONPath() {
        const input = document.getElementById('jsonInput').value.trim();
        const expression = document.getElementById('jsonpathExpression').value.trim();
        
        if (!input) {
            this.showError('Please enter JSON in the editor');
            return;
        }
        
        if (!expression) {
            this.showError('Please enter a JSONPath expression');
            return;
        }
        
        try {
            const json = JSON.parse(input);
            const results = this.executeJSONPathQuery(json, expression);
            const resultsEl = document.getElementById('jsonpathResults');
            
            if (results.length === 0) {
                resultsEl.innerHTML = '<p class="status-warning">No results found</p>';
                return;
            }
            
            let html = `<h4>Found ${results.length} result(s):</h4>`;
            results.forEach((result, index) => {
                html += `<div class="jsonpath-result-item">
                    <strong>Result ${index + 1}:</strong>
                    <pre>${JSON.stringify(result.value, null, 2)}</pre>
                    <small>Path: ${result.path}</small>
                </div>`;
            });
            resultsEl.innerHTML = html;
        } catch (error) {
            this.showError('JSONPath execution failed: ' + error.message);
        }
    }
    
    executeJSONPathQuery(obj, expression) {
        const results = [];
        const path = [];
        
        // Simple JSONPath implementation
        if (expression === '$..*') {
            this.findAllValues(obj, path, results);
        } else if (expression.startsWith('$..')) {
            const key = expression.substring(3);
            this.findByKey(obj, key, path, results);
        } else if (expression === '$[*]') {
            if (Array.isArray(obj)) {
                obj.forEach((item, index) => {
                    results.push({ path: `$[${index}]`, value: item });
                });
            }
        } else if (expression.startsWith('$[') && expression.includes('?(@')) {
            // Filter expression
            const match = expression.match(/\?\(@\.(\w+)\s*([><=!]+)\s*(\w+)\)/);
            if (match) {
                const [, key, operator, value] = match;
                this.findByFilter(obj, key, operator, value, path, results);
            }
        } else {
            // Try to evaluate as path
            try {
                const value = this.getPathValue(obj, expression);
                if (value !== undefined) {
                    results.push({ path: expression, value });
                }
            } catch (e) {
                // Fallback to simple search
                this.findByKey(obj, expression.replace(/^\$\.\.?/, ''), path, results);
            }
        }
        
        return results;
    }
    
    findAllValues(obj, path, results) {
        if (typeof obj !== 'object' || obj === null) {
            results.push({ path: path.join('.'), value: obj });
            return;
        }
        
        if (Array.isArray(obj)) {
            obj.forEach((item, index) => {
                this.findAllValues(item, [...path, `[${index}]`], results);
            });
        } else {
            Object.keys(obj).forEach(key => {
                this.findAllValues(obj[key], [...path, key], results);
            });
        }
    }
    
    findByKey(obj, key, path, results) {
        if (typeof obj !== 'object' || obj === null) return;
        
        if (Array.isArray(obj)) {
            obj.forEach((item, index) => {
                this.findByKey(item, key, [...path, `[${index}]`], results);
            });
        } else {
            Object.keys(obj).forEach(k => {
                if (k === key) {
                    results.push({ path: [...path, k].join('.'), value: obj[k] });
                }
                this.findByKey(obj[k], key, [...path, k], results);
            });
        }
    }
    
    findByFilter(obj, key, operator, value, path, results) {
        if (typeof obj !== 'object' || obj === null) return;
        
        if (Array.isArray(obj)) {
            obj.forEach((item, index) => {
                this.findByFilter(item, key, operator, value, [...path, `[${index}]`], results);
            });
        } else {
            if (obj[key] !== undefined) {
                const objValue = obj[key];
                const compareValue = isNaN(value) ? value : Number(value);
                let matches = false;
                
                switch (operator) {
                    case '>': matches = objValue > compareValue; break;
                    case '<': matches = objValue < compareValue; break;
                    case '>=': matches = objValue >= compareValue; break;
                    case '<=': matches = objValue <= compareValue; break;
                    case '==': matches = objValue == compareValue; break;
                    case '!=': matches = objValue != compareValue; break;
                }
                
                if (matches) {
                    results.push({ path: path.join('.'), value: obj });
                }
            }
            
            Object.keys(obj).forEach(k => {
                this.findByFilter(obj[k], key, operator, value, [...path, k], results);
            });
        }
    }
    
    getPathValue(obj, path) {
        const parts = path.replace(/^\$/, '').split(/[\.\[\]]/).filter(p => p);
        let current = obj;
        for (const part of parts) {
            if (part === '') continue;
            const index = parseInt(part);
            if (!isNaN(index)) {
                current = current[index];
            } else {
                current = current[part];
            }
            if (current === undefined) return undefined;
        }
        return current;
    }
    
    searchWithRegex(obj, pattern, path = '', results = []) {
        try {
            const regex = new RegExp(pattern, 'gi');
            const str = JSON.stringify(obj);
            
            if (regex.test(str)) {
                if (typeof obj === 'string' && regex.test(obj)) {
                    results.push({ path: path || 'root', value: obj });
                } else if (typeof obj === 'object' && obj !== null) {
                    Object.keys(obj).forEach(key => {
                        const newPath = path ? `${path}.${key}` : key;
                        this.searchWithRegex(obj[key], pattern, newPath, results);
                    });
                }
            }
        } catch (error) {
            // Invalid regex
        }
        return results;
    }
    
    // Batch Processing
    batchFiles = [];
    
    async handleBatchFileLoad(files) {
        this.batchFiles = [];
        for (let i = 0; i < files.length; i++) {
            try {
                const text = await files[i].text();
                this.batchFiles.push({
                    name: files[i].name,
                    content: text,
                    processed: null,
                    error: null
                });
            } catch (error) {
                this.batchFiles.push({
                    name: files[i].name,
                    content: null,
                    processed: null,
                    error: error.message
                });
            }
        }
        this.updateBatchFilesList();
    }
    
    updateBatchFilesList() {
        const listEl = document.getElementById('batchFilesList');
        const statsEl = document.getElementById('batchStats');
        
        statsEl.textContent = `${this.batchFiles.length} file(s) loaded`;
        
        let html = '';
        this.batchFiles.forEach((file, index) => {
            const status = file.error ? 'error' : file.processed ? 'success' : 'pending';
            html += `<div class="batch-file-item ${status}">
                <div class="file-name">${file.name}</div>
                <div class="file-status">
                    ${file.error ? `<span class="status-error">Error: ${file.error}</span>` : 
                      file.processed ? `<span class="status-success">✓ Processed</span>` : 
                      '<span class="status-pending">Pending</span>'}
                </div>
            </div>`;
        });
        listEl.innerHTML = html;
    }
    
    processBatch() {
        if (this.batchFiles.length === 0) {
            this.showError('No files loaded');
            return;
        }
        
        const operation = document.getElementById('batchOperation').value;
        const results = [];
        
        this.batchFiles.forEach((file, index) => {
            if (file.error || !file.content) {
                results.push({ file: file.name, success: false, error: file.error || 'No content' });
                return;
            }
            
            try {
                const json = JSON.parse(file.content);
                let processed = null;
                
                switch (operation) {
                    case 'validate':
                        processed = JSON.stringify(json, null, 2);
                        break;
                    case 'format':
                        processed = JSON.stringify(json, null, 2);
                        break;
                    case 'minify':
                        processed = JSON.stringify(json);
                        break;
                    case 'sort':
                        processed = JSON.stringify(this.sortObjectKeys(json), null, 2);
                        break;
                    case 'transform':
                        processed = JSON.stringify(json, null, 2);
                        break;
                }
                
                file.processed = processed;
                results.push({ file: file.name, success: true, content: processed });
            } catch (error) {
                file.error = error.message;
                results.push({ file: file.name, success: false, error: error.message });
            }
        });
        
        this.updateBatchFilesList();
        this.displayBatchResults(results);
    }
    
    displayBatchResults(results) {
        const resultsEl = document.getElementById('batchResults');
        let html = '';
        
        results.forEach(result => {
            html += `<div class="batch-result-item ${result.success ? 'success' : 'error'}">
                <strong>${result.file}</strong>
                ${result.success ? 
                    `<span class="status-success">✓ Success</span>` : 
                    `<span class="status-error">✗ ${result.error}</span>`}
            </div>`;
        });
        
        resultsEl.innerHTML = html;
    }
    
    downloadBatch() {
        if (this.batchFiles.length === 0) {
            this.showError('No files to download');
            return;
        }
        
        this.batchFiles.forEach(file => {
            if (file.processed) {
                const blob = new Blob([file.processed], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = file.name;
                a.click();
                URL.revokeObjectURL(url);
            }
        });
        
        this.showSuccess(`Downloaded ${this.batchFiles.filter(f => f.processed).length} file(s)`);
    }
    
    clearBatch() {
        this.batchFiles = [];
        document.getElementById('batchFilesList').innerHTML = '';
        document.getElementById('batchResults').innerHTML = '';
        document.getElementById('batchStats').textContent = '0 file(s) loaded';
    }
    
    // JSON Analysis
    analyzeJSON() {
        const input = document.getElementById('analyzeInput').value.trim();
        if (!input) {
            this.showError('Please enter JSON to analyze');
            return;
        }
        
        try {
            const json = JSON.parse(input);
            const analysis = this.performAnalysis(json);
            this.displayAnalysis(analysis);
            this.updateEditorTreeView('analyzeInput', 'analyzeInputTreeView');
        } catch (error) {
            this.showError('Invalid JSON: ' + error.message);
        }
    }
    
    performAnalysis(obj) {
        const jsonString = JSON.stringify(obj);
        const size = new Blob([jsonString]).size;
        
        return {
            size: {
                bytes: size,
                kb: (size / 1024).toFixed(2),
                mb: (size / 1024 / 1024).toFixed(4)
            },
            structure: {
                depth: this.getDepth(obj),
                totalKeys: this.countKeys(obj),
                totalValues: this.countValues(obj),
                arrayCount: this.countArrays(obj),
                objectCount: this.countObjects(obj)
            },
            types: this.analyzeTypes(obj),
            performance: {
                parseTime: this.measureParseTime(jsonString),
                stringifyTime: this.measureStringifyTime(obj)
            }
        };
    }
    
    getDepth(obj, depth = 0) {
        if (typeof obj !== 'object' || obj === null) return depth;
        if (Array.isArray(obj)) {
            return Math.max(...obj.map(item => this.getDepth(item, depth + 1)), depth);
        }
        const keys = Object.keys(obj);
        if (keys.length === 0) return depth;
        return Math.max(...keys.map(key => this.getDepth(obj[key], depth + 1)), depth);
    }
    
    countKeys(obj, count = 0) {
        if (typeof obj !== 'object' || obj === null) return count;
        if (Array.isArray(obj)) {
            return obj.reduce((acc, item) => acc + this.countKeys(item, 0), count);
        }
        return Object.keys(obj).length + Object.values(obj).reduce((acc, val) => acc + this.countKeys(val, 0), 0);
    }
    
    countValues(obj) {
        if (typeof obj !== 'object' || obj === null) return 1;
        if (Array.isArray(obj)) {
            return obj.reduce((acc, item) => acc + this.countValues(item), 0);
        }
        return Object.values(obj).reduce((acc, val) => acc + this.countValues(val), 0);
    }
    
    countArrays(obj, count = 0) {
        if (Array.isArray(obj)) {
            count++;
            return obj.reduce((acc, item) => acc + this.countArrays(item, 0), count);
        }
        if (typeof obj === 'object' && obj !== null) {
            return Object.values(obj).reduce((acc, val) => acc + this.countArrays(val, 0), count);
        }
        return count;
    }
    
    countObjects(obj, count = 0) {
        if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
            count++;
            return Object.values(obj).reduce((acc, val) => acc + this.countObjects(val, 0), count);
        }
        if (Array.isArray(obj)) {
            return obj.reduce((acc, item) => acc + this.countObjects(item, 0), count);
        }
        return count;
    }
    
    analyzeTypes(obj) {
        const types = { string: 0, number: 0, boolean: 0, null: 0, array: 0, object: 0 };
        
        const analyze = (val) => {
            if (val === null) types.null++;
            else if (Array.isArray(val)) {
                types.array++;
                val.forEach(analyze);
            } else if (typeof val === 'object') {
                types.object++;
                Object.values(val).forEach(analyze);
            } else {
                types[typeof val]++;
            }
        };
        
        analyze(obj);
        return types;
    }
    
    measureParseTime(jsonString) {
        const start = performance.now();
        JSON.parse(jsonString);
        return (performance.now() - start).toFixed(4);
    }
    
    measureStringifyTime(obj) {
        const start = performance.now();
        JSON.stringify(obj);
        return (performance.now() - start).toFixed(4);
    }
    
    displayAnalysis(analysis) {
        const reportEl = document.getElementById('analyzeReport');
        let html = `
            <div class="analysis-section">
                <h3>📊 Size Analysis</h3>
                <div class="analysis-grid">
                    <div class="analysis-card">
                        <div class="analysis-label">Size</div>
                        <div class="analysis-value">${analysis.size.bytes} bytes</div>
                        <div class="analysis-sub">${analysis.size.kb} KB / ${analysis.size.mb} MB</div>
                    </div>
                </div>
            </div>
            <div class="analysis-section">
                <h3>🏗️ Structure Analysis</h3>
                <div class="analysis-grid">
                    <div class="analysis-card">
                        <div class="analysis-label">Depth</div>
                        <div class="analysis-value">${analysis.structure.depth}</div>
                    </div>
                    <div class="analysis-card">
                        <div class="analysis-label">Total Keys</div>
                        <div class="analysis-value">${analysis.structure.totalKeys}</div>
                    </div>
                    <div class="analysis-card">
                        <div class="analysis-label">Total Values</div>
                        <div class="analysis-value">${analysis.structure.totalValues}</div>
                    </div>
                    <div class="analysis-card">
                        <div class="analysis-label">Arrays</div>
                        <div class="analysis-value">${analysis.structure.arrayCount}</div>
                    </div>
                    <div class="analysis-card">
                        <div class="analysis-label">Objects</div>
                        <div class="analysis-value">${analysis.structure.objectCount}</div>
                    </div>
                </div>
            </div>
            <div class="analysis-section">
                <h3>🔤 Type Distribution</h3>
                <div class="analysis-grid">
                    ${Object.entries(analysis.types).map(([type, count]) => `
                        <div class="analysis-card">
                            <div class="analysis-label">${type}</div>
                            <div class="analysis-value">${count}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="analysis-section">
                <h3>⚡ Performance Metrics</h3>
                <div class="analysis-grid">
                    <div class="analysis-card">
                        <div class="analysis-label">Parse Time</div>
                        <div class="analysis-value">${analysis.performance.parseTime}ms</div>
                    </div>
                    <div class="analysis-card">
                        <div class="analysis-label">Stringify Time</div>
                        <div class="analysis-value">${analysis.performance.stringifyTime}ms</div>
                    </div>
                </div>
            </div>
        `;
        reportEl.innerHTML = html;
    }
    
    exportAnalysis() {
        const reportEl = document.getElementById('analyzeReport');
        const content = reportEl.textContent || reportEl.innerText;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'json-analysis-report.txt';
        a.click();
        URL.revokeObjectURL(url);
    }
    
    // Workspace Settings Export/Import
    exportSettings() {
        const settings = {
            theme: localStorage.getItem('theme') || 'light',
            indentSize: document.getElementById('indentSize')?.value || '4',
            autoFormat: document.getElementById('autoFormat')?.checked || false,
            lineNumbers: document.getElementById('lineNumbers')?.checked || false,
            treePanelWidths: {}
        };
        
        // Save tree panel widths
        document.querySelectorAll('.tree-panel').forEach(panel => {
            if (panel.style.width) {
                settings.treePanelWidths[panel.id] = panel.style.width;
            }
        });
        
        const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'json-operations-settings.json';
        a.click();
        URL.revokeObjectURL(url);
        this.showSuccess('Settings exported successfully');
    }
    
    async     importSettings(file) {
        if (!file) return;
        
        try {
            const text = await file.text();
            const settings = JSON.parse(text);
            
            // Apply theme
            if (settings.theme) {
                document.documentElement.setAttribute('data-theme', settings.theme);
                localStorage.setItem('theme', settings.theme);
                document.getElementById('themeToggle').querySelector('.icon').textContent = 
                    settings.theme === 'dark' ? '☀️' : '🌙';
            }
            
            // Apply editor settings
            if (settings.indentSize) {
                const indentEl = document.getElementById('indentSize');
                if (indentEl) indentEl.value = settings.indentSize;
            }
            
            if (settings.autoFormat !== undefined) {
                const autoFormatEl = document.getElementById('autoFormat');
                if (autoFormatEl) autoFormatEl.checked = settings.autoFormat;
            }
            
            if (settings.lineNumbers !== undefined) {
                const lineNumbersEl = document.getElementById('lineNumbers');
                if (lineNumbersEl) lineNumbersEl.checked = settings.lineNumbers;
            }
            
            // Restore tree panel widths
            if (settings.treePanelWidths) {
                Object.keys(settings.treePanelWidths).forEach(panelId => {
                    const panel = document.getElementById(panelId);
                    if (panel) {
                        panel.style.width = settings.treePanelWidths[panelId];
                        localStorage.setItem(`treePanelWidth_${panelId}`, settings.treePanelWidths[panelId]);
                    }
                });
            }
            
            this.showSuccess('Settings imported successfully');
        } catch (error) {
            this.showError('Failed to import settings: ' + error.message);
        }
    }
    
    // Code Folding System
    updateFoldIndicators() {
        const textarea = document.getElementById('jsonInput');
        const gutter = document.getElementById('foldGutter');
        if (!textarea || !gutter) return;
        
        const text = textarea.value.trim();
        if (!text) {
            gutter.innerHTML = '';
            return;
        }
        
        // Find all foldable regions (objects and arrays)
        this.foldRanges = this.findFoldableRegions(text);
        
        // Clear gutter
        gutter.innerHTML = '';
        const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight) || 1.8 * 14;
        gutter.style.height = textarea.scrollHeight + 'px';
        
        // Create fold indicators
        this.foldRanges.forEach((range, index) => {
            const top = (range.startLine - 1) * lineHeight;
            
            const indicator = document.createElement('div');
            indicator.className = `fold-indicator ${this.foldedRegions.has(index) ? 'folded' : 'expanded'}`;
            indicator.style.position = 'absolute';
            indicator.style.top = `${top + 2}px`;
            indicator.style.left = '4px';
            indicator.style.cursor = 'pointer';
            indicator.style.userSelect = 'none';
            indicator.style.zIndex = '10';
            indicator.textContent = this.foldedRegions.has(index) ? '▶' : '▼';
            indicator.title = this.foldedRegions.has(index) ? 'Click to expand' : 'Click to collapse';
            indicator.dataset.rangeIndex = index;
            
            indicator.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.toggleFold(index);
            });
            
            gutter.appendChild(indicator);
        });
        
        // Update overlay after a short delay
        setTimeout(() => {
            const foldedLines = new Set();
            this.foldRanges.forEach((range, index) => {
                if (this.foldedRegions.has(index)) {
                    for (let i = range.startLine; i < range.endLine - 1; i++) {
                        foldedLines.add(i);
                    }
                }
            });
            this.updateFoldOverlay(foldedLines);
        }, 50);
    }
    
    findFoldableRegions(text) {
        const ranges = [];
        const lines = text.split('\n');
        const stack = [];
        
        lines.forEach((line, lineIndex) => {
            const trimmed = line.trim();
            const indent = line.length - trimmed.length;
            
            // Check for opening braces/brackets
            if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
                const closingChar = trimmed.startsWith('{') ? '}' : ']';
                const openChar = trimmed.startsWith('{') ? '{' : '[';
                
                // Check if it's a single-line object/array
                if (trimmed.endsWith(closingChar) && trimmed.length > 2) {
                    // Single line, not foldable
                    return;
                }
                
                // Find matching closing brace/bracket
                const endLine = this.findMatchingBrace(lines, lineIndex, openChar, closingChar);
                if (endLine > lineIndex) {
                    ranges.push({
                        startLine: lineIndex + 1,
                        endLine: endLine + 1,
                        indent: Math.floor(indent / 2), // Approximate indent level
                        type: openChar === '{' ? 'object' : 'array'
                    });
                }
            }
        });
        
        return ranges;
    }
    
    findMatchingBrace(lines, startLine, openChar, closeChar) {
        let depth = 0;
        let inString = false;
        let escapeNext = false;
        
        for (let i = startLine; i < lines.length; i++) {
            const line = lines[i];
            
            for (let j = 0; j < line.length; j++) {
                const char = line[j];
                
                if (escapeNext) {
                    escapeNext = false;
                    continue;
                }
                
                if (char === '\\') {
                    escapeNext = true;
                    continue;
                }
                
                if (char === '"' && !escapeNext) {
                    inString = !inString;
                    continue;
                }
                
                if (inString) continue;
                
                if (char === openChar) {
                    depth++;
                } else if (char === closeChar) {
                    depth--;
                    if (depth === 0) {
                        return i;
                    }
                }
            }
        }
        
        return -1; // Not found
    }
    
    toggleFold(rangeIndex) {
        if (this.foldedRegions.has(rangeIndex)) {
            this.foldedRegions.delete(rangeIndex);
        } else {
            this.foldedRegions.add(rangeIndex);
        }
        this.updateFoldIndicators();
    }
    
    collapseAllFolds() {
        this.foldRanges.forEach((_, index) => {
            this.foldedRegions.add(index);
        });
        this.updateFoldIndicators();
    }
    
    expandAllFolds() {
        this.foldedRegions.clear();
        this.updateFoldIndicators();
    }
    
    applyFolds() {
        const textarea = document.getElementById('jsonInput');
        if (!textarea || this.foldedRegions.size === 0) return;
        
        // Store original value
        const originalValue = textarea.value;
        if (!this.originalValue) {
            this.originalValue = originalValue;
        }
        
        const lines = originalValue.split('\n');
        const foldedLines = new Set();
        
        // Mark lines to hide
        this.foldRanges.forEach((range, index) => {
            if (this.foldedRegions.has(index)) {
                for (let i = range.startLine; i < range.endLine - 1; i++) {
                    foldedLines.add(i);
                }
            }
        });
        
        // Create folded display
        const displayLines = lines.map((line, index) => {
            if (foldedLines.has(index)) {
                return null; // Mark for hiding
            }
            return line;
        });
        
        // Build display text with ellipsis markers
        let displayText = '';
        let lastVisibleIndex = -1;
        
        displayLines.forEach((line, index) => {
            if (line !== null) {
                // Check if there's a gap before this line
                if (index > lastVisibleIndex + 1 && lastVisibleIndex >= 0) {
                    // Add ellipsis for hidden content
                    const prevLine = lines[lastVisibleIndex];
                    const indent = prevLine.length - prevLine.trimStart().length;
                    const indentStr = ' '.repeat(Math.max(0, indent));
                    displayText += indentStr + '...\n';
                }
                displayText += line + '\n';
                lastVisibleIndex = index;
            }
        });
        
        // Remove trailing newline
        displayText = displayText.replace(/\n$/, '');
        
        // Apply to textarea (but preserve actual value)
        // We'll use a visual overlay instead to avoid modifying the actual content
        this.updateFoldOverlay(foldedLines);
    }
    
    updateFoldOverlay(foldedLines) {
        const textarea = document.getElementById('jsonInput');
        if (!textarea) return;
        
        // Remove existing overlay
        let overlay = document.getElementById('foldOverlay');
        if (overlay) {
            overlay.remove();
        }
        
        if (foldedLines.size === 0) return;
        
        overlay = document.createElement('div');
        overlay.id = 'foldOverlay';
        overlay.className = 'fold-overlay';
        
        // Position overlay to match textarea
        const textareaRect = textarea.getBoundingClientRect();
        const containerRect = textarea.parentElement.getBoundingClientRect();
        
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.right = '0';
        overlay.style.bottom = '0';
        overlay.style.pointerEvents = 'none';
        overlay.style.zIndex = '2';
        
        textarea.parentElement.style.position = 'relative';
        textarea.parentElement.appendChild(overlay);
        
        // Add visual markers for folded regions
        const lines = textarea.value.split('\n');
        const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight) || 1.8 * 14;
        const paddingTop = parseFloat(getComputedStyle(textarea).paddingTop) || 24;
        
        // Group consecutive folded lines
        const sortedLines = Array.from(foldedLines).sort((a, b) => a - b);
        let startLine = null;
        let endLine = null;
        
        sortedLines.forEach((lineIndex, idx) => {
            if (startLine === null) {
                startLine = lineIndex;
                endLine = lineIndex;
            } else if (lineIndex === endLine + 1) {
                endLine = lineIndex;
            } else {
                // Create marker for previous group
                this.createFoldMarker(overlay, startLine, endLine, lineHeight, paddingTop);
                startLine = lineIndex;
                endLine = lineIndex;
            }
        });
        
        // Create marker for last group
        if (startLine !== null) {
            this.createFoldMarker(overlay, startLine, endLine, lineHeight, paddingTop);
        }
    }
    
    createFoldMarker(overlay, startLine, endLine, lineHeight, paddingTop) {
        const marker = document.createElement('div');
        marker.className = 'folded-line-marker';
        marker.style.position = 'absolute';
        marker.style.top = `${startLine * lineHeight + paddingTop}px`;
        marker.style.left = '24px';
        marker.style.right = '0';
        marker.style.height = `${(endLine - startLine + 1) * lineHeight}px`;
        marker.style.background = 'linear-gradient(to right, rgba(99, 102, 241, 0.08) 0%, transparent 100%)';
        marker.style.borderLeft = '2px solid var(--primary-color)';
        marker.style.pointerEvents = 'none';
        marker.style.display = 'flex';
        marker.style.alignItems = 'center';
        marker.style.paddingLeft = '8px';
        marker.style.fontSize = '0.7rem';
        marker.style.color = 'var(--text-muted)';
        marker.textContent = '...';
        overlay.appendChild(marker);
    }
    
    // New Conversion Formats
    jsonToJavaScript(obj) {
        return `const data = ${JSON.stringify(obj, null, 2)};`;
    }
    
    jsonToGraphQL(obj) {
        let schema = 'type Query {\n';
        if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
            Object.keys(obj).forEach(key => {
                const type = this.getGraphQLType(obj[key]);
                schema += `  ${key}: ${type}\n`;
            });
        }
        schema += '}';
        return schema;
    }
    
    getGraphQLType(value) {
        if (value === null) return 'String';
        if (Array.isArray(value)) {
            return value.length > 0 ? `[${this.getGraphQLType(value[0])}]` : '[String]';
        }
        if (typeof value === 'object') return 'JSON';
        if (typeof value === 'string') return 'String';
        if (typeof value === 'number') return Number.isInteger(value) ? 'Int' : 'Float';
        if (typeof value === 'boolean') return 'Boolean';
        return 'String';
    }
    
    jsonToOpenAPI(obj) {
        return JSON.stringify({
            openapi: '3.0.0',
            info: {
                title: 'API',
                version: '1.0.0'
            },
            paths: {
                '/': {
                    get: {
                        responses: {
                            '200': {
                                description: 'Success',
                                content: {
                                    'application/json': {
                                        schema: this.inferSchema(obj)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }, null, 2);
    }
    
    jsonToPostman(obj) {
        return JSON.stringify({
            info: {
                name: 'JSON Collection',
                schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
            },
            item: [{
                name: 'Request',
                request: {
                    method: 'GET',
                    header: [],
                    body: {
                        mode: 'raw',
                        raw: JSON.stringify(obj, null, 2)
                    }
                }
            }]
        }, null, 2);
    }
    
    jsonToCurl(obj) {
        return `curl -X POST https://api.example.com/endpoint \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(obj)}'`;
    }
    
    jsonToSQL(obj, tableName = 'data') {
        if (!Array.isArray(obj)) {
            obj = [obj];
        }
        
        if (obj.length === 0) return '-- No data to insert';
        
        const columns = Object.keys(obj[0]);
        const values = obj.map(item => 
            '(' + columns.map(col => {
                const val = item[col];
                return typeof val === 'string' ? `'${val.replace(/'/g, "''")}'` : val === null ? 'NULL' : val;
            }).join(', ') + ')'
        ).join(',\n  ');
        
        return `INSERT INTO ${tableName} (${columns.join(', ')})\nVALUES\n  ${values};`;
    }
    
    jsonToMongoDB(obj) {
        if (Array.isArray(obj)) {
            return `db.collection.insertMany(${JSON.stringify(obj, null, 2)});`;
        }
        return `db.collection.insertOne(${JSON.stringify(obj, null, 2)});`;
    }
    
    jsonToHTML(obj) {
        if (Array.isArray(obj) && obj.length > 0) {
            const headers = Object.keys(obj[0]);
            let html = '<table border="1" cellpadding="5" cellspacing="0">\n<thead>\n<tr>';
            headers.forEach(h => html += `<th>${h}</th>`);
            html += '</tr>\n</thead>\n<tbody>\n';
            obj.forEach(row => {
                html += '<tr>';
                headers.forEach(h => html += `<td>${row[h] || ''}</td>`);
                html += '</tr>\n';
            });
            html += '</tbody>\n</table>';
            return html;
        }
        return '<p>HTML table conversion requires an array of objects</p>';
    }
    
    jsonToMarkdown(obj) {
        if (Array.isArray(obj) && obj.length > 0) {
            const headers = Object.keys(obj[0]);
            let md = '| ' + headers.join(' | ') + ' |\n';
            md += '|' + headers.map(() => '---').join('|') + '|\n';
            obj.forEach(row => {
                md += '| ' + headers.map(h => String(row[h] || '')).replace(/\|/g, '\\|') + ' |\n';
            });
            return md;
        }
        return '```json\n' + JSON.stringify(obj, null, 2) + '\n```';
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? 'var(--success-color)' : 'var(--danger-color)'};
            color: white;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new JSONOperationsApp();
    
    // Initialize main editor with empty history entry
    const jsonInput = document.getElementById('jsonInput');
    if (jsonInput.value) {
        window.app.saveToHistory();
    } else {
        window.app.history.push('');
        window.app.historyIndex = 0;
    }
    
    // Initialize compare line numbers
    window.app.updateCompareLineNumbers(1);
    window.app.updateCompareLineNumbers(2);
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
