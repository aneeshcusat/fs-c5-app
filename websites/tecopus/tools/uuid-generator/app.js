// UUID / ULID Generator - Enhanced Version

document.addEventListener('DOMContentLoaded', function() {
    const typeSelect = document.getElementById('typeSelect');
    const countInput = document.getElementById('countInput');
    const generateBtn = document.getElementById('generateBtn');
    const generate10Btn = document.getElementById('generate10Btn');
    const generate100Btn = document.getElementById('generate100Btn');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearBtn = document.getElementById('clearBtn');
    const validateBtn = document.getElementById('validateBtn');
    const outputArea = document.getElementById('outputArea');
    const stats = document.getElementById('stats');
    const statusMessage = document.getElementById('statusMessage');
    const countBadge = document.getElementById('countBadge');
    const charCount = document.getElementById('charCount');

    // Event listeners
    generateBtn.addEventListener('click', () => generate());
    generate10Btn.addEventListener('click', () => { countInput.value = 10; generate(); });
    generate100Btn.addEventListener('click', () => { countInput.value = 100; generate(); });
    copyBtn.addEventListener('click', copyAll);
    downloadBtn.addEventListener('click', download);
    clearBtn.addEventListener('click', clearOutput);
    validateBtn.addEventListener('click', validateIDs);

    // Update character count on input
    outputArea.addEventListener('input', updateCharCount);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            generate();
        }
    });

    function generate() {
        const type = typeSelect.value;
        const count = parseInt(countInput.value) || 1;
        
        if (count < 1 || count > 1000) {
            Utils.showNotification('Count must be between 1 and 1000', 'error');
            return;
        }

        Utils.showLoading(generateBtn, 'Generating...');
        
        // Use setTimeout to show loading state
        setTimeout(() => {
            const ids = [];
            const startTime = performance.now();

            for (let i = 0; i < count; i++) {
                let id;
                if (type === 'uuid4') {
                    id = uuid.v4();
                } else if (type === 'uuid1') {
                    id = uuid.v1();
                } else if (type === 'ulid') {
                    id = generateULID();
                }
                ids.push(id);
            }

            const endTime = performance.now();
            const duration = ((endTime - startTime) / 1000).toFixed(3);

            outputArea.value = ids.join('\n');
            updateStats(ids, duration);
            updateCharCount();
            updateBadge(ids.length);
            
            // Save to history
            Utils.saveToHistory('uuid-generator', {
                type: type,
                count: count,
                ids: ids.slice(0, 10) // Store first 10
            });

            Utils.hideLoading(generateBtn);
            Utils.showNotification(`Generated ${count} ${type.toUpperCase()}${count > 1 ? 's' : ''} in ${duration}s`, 'success');
        }, 50);
    }

    function generateULID() {
        // Enhanced ULID implementation
        const timestamp = Date.now();
        const random1 = Math.random().toString(36).substring(2, 15);
        const random2 = Math.random().toString(36).substring(2, 15);
        const random = (random1 + random2).substring(0, 16).toUpperCase();
        return timestamp.toString(36).toUpperCase().padStart(10, '0') + random;
    }

    function copyAll() {
        if (!outputArea.value.trim()) {
            Utils.showNotification('No IDs to copy', 'warning');
            return;
        }
        Utils.copyToClipboard(outputArea.value);
    }

    function download() {
        if (!outputArea.value.trim()) {
            Utils.showNotification('No IDs to download', 'warning');
            return;
        }
        const type = typeSelect.value;
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
        const filename = `${type}-${timestamp}.txt`;
        Utils.downloadFile(outputArea.value, filename, 'text/plain');
    }

    function clearOutput() {
        outputArea.value = '';
        stats.textContent = '';
        updateBadge(0);
        updateCharCount();
        Utils.showNotification('Output cleared', 'info');
    }

    function validateIDs() {
        const ids = outputArea.value.trim().split('\n').filter(id => id.trim());
        if (ids.length === 0) {
            Utils.showNotification('No IDs to validate', 'warning');
            return;
        }

        const type = typeSelect.value;
        const results = {
            valid: 0,
            invalid: 0,
            duplicates: 0
        };

        const seen = new Set();
        ids.forEach(id => {
            if (seen.has(id)) {
                results.duplicates++;
            } else {
                seen.add(id);
                // Basic validation based on type
                if (type === 'uuid4' || type === 'uuid1') {
                    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
                    if (uuidRegex.test(id)) {
                        results.valid++;
                    } else {
                        results.invalid++;
                    }
                } else {
                    // ULID validation (26 chars, alphanumeric)
                    if (id.length === 26 && /^[0-9A-Z]+$/.test(id)) {
                        results.valid++;
                    } else {
                        results.invalid++;
                    }
                }
            }
        });

        const message = `Valid: ${results.valid} | Invalid: ${results.invalid} | Duplicates: ${results.duplicates}`;
        Utils.showNotification(message, results.invalid === 0 ? 'success' : 'warning');
    }

    function updateStats(ids, duration) {
        const unique = new Set(ids).size;
        const totalLength = ids.reduce((sum, id) => sum + id.length, 0);
        const avgLength = (totalLength / ids.length).toFixed(2);
        
        stats.innerHTML = `
            <div style="display: grid; gap: 0.75rem;">
                <div style="display: flex; justify-content: space-between;">
                    <strong>Total Generated:</strong>
                    <span style="color: var(--primary-color); font-weight: 700;">${ids.length}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <strong>Unique IDs:</strong>
                    <span style="color: var(--success-color); font-weight: 700;">${unique}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <strong>Average Length:</strong>
                    <span>${avgLength} chars</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <strong>Generation Time:</strong>
                    <span>${duration}s</span>
                </div>
                ${unique < ids.length ? `<div style="color: var(--warning-color); font-size: 0.875rem; margin-top: 0.5rem;">
                    ⚠ Warning: ${ids.length - unique} duplicate${ids.length - unique > 1 ? 's' : ''} detected
                </div>` : ''}
            </div>
        `;
    }

    function updateBadge(count) {
        countBadge.textContent = `${count} ID${count !== 1 ? 's' : ''}`;
        countBadge.style.background = count > 0 ? 'var(--success-gradient)' : 'var(--primary-gradient)';
    }

    function updateCharCount() {
        const text = outputArea.value;
        const stats = Utils.getTextStats(text);
        charCount.textContent = `${stats.characters.toLocaleString()} characters`;
    }

    // Generate on load
    generate();
});
