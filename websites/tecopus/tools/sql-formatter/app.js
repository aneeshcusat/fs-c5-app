// SQL Formatter

document.addEventListener('DOMContentLoaded', function() {
    const sqlInput = document.getElementById('sqlInput');
    const sqlOutput = document.getElementById('sqlOutput');
    const formatBtn = document.getElementById('formatBtn');
    const minifyBtn = document.getElementById('minifyBtn');
    const validateBtn = document.getElementById('validateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const loadFileBtn = document.getElementById('loadFileBtn');
    const fileInput = document.getElementById('fileInput');
    const statusMessage = document.getElementById('statusMessage');
    const validationResults = document.getElementById('validationResults');
    const validationOutput = document.getElementById('validationOutput');

    formatBtn.addEventListener('click', function() {
        try {
            const input = sqlInput.value.trim();
            if (!input) {
                showStatus('Please enter SQL query', 'error');
                return;
            }

            const formatted = sqlFormatter.format(input, {
                language: 'sql',
                tabWidth: 2,
                useTabs: false,
                keywordCase: 'upper',
                indentStyle: 'standard',
                linesBetweenQueries: 2
            });

            sqlOutput.value = formatted;
            showStatus('SQL formatted successfully!', 'success');
            validationResults.style.display = 'none';
        } catch (error) {
            showStatus('Error formatting SQL: ' + error.message, 'error');
            sqlOutput.value = '';
        }
    });

    minifyBtn.addEventListener('click', function() {
        try {
            const input = sqlInput.value.trim();
            if (!input) {
                showStatus('Please enter SQL query', 'error');
                return;
            }

            const minified = sqlFormatter.format(input, {
                language: 'sql',
                tabWidth: 0,
                useTabs: false,
                keywordCase: 'upper',
                indentStyle: 'minimal',
                linesBetweenQueries: 1
            }).replace(/\s+/g, ' ').trim();

            sqlOutput.value = minified;
            showStatus('SQL minified successfully!', 'success');
            validationResults.style.display = 'none';
        } catch (error) {
            showStatus('Error minifying SQL: ' + error.message, 'error');
            sqlOutput.value = '';
        }
    });

    validateBtn.addEventListener('click', function() {
        try {
            const input = sqlInput.value.trim();
            if (!input) {
                showStatus('Please enter SQL query', 'error');
                return;
            }

            // Basic validation - check for common SQL syntax errors
            const errors = [];
            const warnings = [];

            // Check for unclosed quotes
            const singleQuotes = (input.match(/'/g) || []).length;
            const doubleQuotes = (input.match(/"/g) || []).length;
            if (singleQuotes % 2 !== 0) {
                errors.push('Unclosed single quotes');
            }
            if (doubleQuotes % 2 !== 0) {
                errors.push('Unclosed double quotes');
            }

            // Check for unclosed parentheses
            const openParens = (input.match(/\(/g) || []).length;
            const closeParens = (input.match(/\)/g) || []).length;
            if (openParens !== closeParens) {
                errors.push('Unclosed parentheses');
            }

            // Check for SELECT without FROM (basic check)
            if (input.toUpperCase().includes('SELECT') && !input.toUpperCase().includes('FROM')) {
                warnings.push('SELECT statement without FROM clause');
            }

            const formatted = sqlFormatter.format(input);
            sqlOutput.value = formatted;

            validationResults.style.display = 'block';
            if (errors.length === 0 && warnings.length === 0) {
                validationOutput.innerHTML = `
                    <div class="status-success">
                        <strong>✓ SQL appears valid</strong><br>
                        <small>No syntax errors detected</small>
                    </div>
                `;
                showStatus('SQL validation passed!', 'success');
            } else {
                let html = '';
                if (errors.length > 0) {
                    html += `<div class="status-error"><strong>✗ Errors:</strong><ul>${errors.map(e => `<li>${e}</li>`).join('')}</ul></div>`;
                }
                if (warnings.length > 0) {
                    html += `<div class="status-warning"><strong>⚠ Warnings:</strong><ul>${warnings.map(w => `<li>${w}</li>`).join('')}</ul></div>`;
                }
                validationOutput.innerHTML = html;
                showStatus('SQL validation found issues', 'warning');
            }
        } catch (error) {
            validationResults.style.display = 'block';
            validationOutput.innerHTML = `
                <div class="status-error">
                    <strong>✗ SQL Validation Failed</strong><br>
                    <small>${error.message}</small>
                </div>
            `;
            showStatus('SQL validation failed', 'error');
        }
    });

    copyBtn.addEventListener('click', function() {
        if (!sqlOutput.value) {
            showStatus('No output to copy', 'warning');
            return;
        }
        Utils.copyToClipboard(sqlOutput.value).then(() => {
            showStatus('Copied to clipboard!', 'success');
        });
    });

    downloadBtn.addEventListener('click', function() {
        if (!sqlOutput.value) {
            showStatus('No output to download', 'warning');
            return;
        }
        Utils.downloadFile(sqlOutput.value, 'formatted.sql', 'text/sql');
        showStatus('File downloaded!', 'success');
    });

    loadFileBtn.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                sqlInput.value = e.target.result;
                showStatus('File loaded successfully!', 'success');
            };
            reader.readAsText(file);
        }
    });

    function showStatus(message, type) {
        statusMessage.innerHTML = `<div class="status-message status-${type}">${message}</div>`;
        setTimeout(() => {
            statusMessage.innerHTML = '';
        }, 5000);
    }
});
