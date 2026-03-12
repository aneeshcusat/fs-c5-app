// YAML Formatter & Validator

document.addEventListener('DOMContentLoaded', function() {
    const yamlInput = document.getElementById('yamlInput');
    const yamlOutput = document.getElementById('yamlOutput');
    const formatBtn = document.getElementById('formatBtn');
    const validateBtn = document.getElementById('validateBtn');
    const minifyBtn = document.getElementById('minifyBtn');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const loadFileBtn = document.getElementById('loadFileBtn');
    const fileInput = document.getElementById('fileInput');
    const statusMessage = document.getElementById('statusMessage');
    const validationResults = document.getElementById('validationResults');
    const validationOutput = document.getElementById('validationOutput');

    // Format YAML
    formatBtn.addEventListener('click', function() {
        try {
            const input = yamlInput.value.trim();
            if (!input) {
                showStatus('Please enter YAML content', 'error');
                return;
            }

            const obj = jsyaml.load(input);
            const formatted = jsyaml.dump(obj, {
                indent: 2,
                lineWidth: -1,
                quotingType: '"',
                forceQuotes: false,
                noRefs: true
            });

            yamlOutput.value = formatted;
            showStatus('YAML formatted successfully!', 'success');
            validationResults.style.display = 'none';
        } catch (error) {
            showStatus('Error formatting YAML: ' + error.message, 'error');
            yamlOutput.value = '';
        }
    });

    // Validate YAML
    validateBtn.addEventListener('click', function() {
        try {
            const input = yamlInput.value.trim();
            if (!input) {
                showStatus('Please enter YAML content', 'error');
                return;
            }

            const obj = jsyaml.load(input);
            const formatted = jsyaml.dump(obj, {
                indent: 2,
                lineWidth: -1
            });

            yamlOutput.value = formatted;
            validationResults.style.display = 'block';
            validationOutput.innerHTML = `
                <div class="status-success">
                    <strong>✓ Valid YAML</strong><br>
                    <small>Parsed successfully. Structure is valid.</small>
                </div>
            `;
            showStatus('YAML is valid!', 'success');
        } catch (error) {
            validationResults.style.display = 'block';
            validationOutput.innerHTML = `
                <div class="status-error">
                    <strong>✗ Invalid YAML</strong><br>
                    <small>${error.message}</small><br>
                    <small>Line: ${error.mark?.line || 'Unknown'}, Column: ${error.mark?.column || 'Unknown'}</small>
                </div>
            `;
            showStatus('YAML validation failed', 'error');
        }
    });

    // Minify YAML
    minifyBtn.addEventListener('click', function() {
        try {
            const input = yamlInput.value.trim();
            if (!input) {
                showStatus('Please enter YAML content', 'error');
                return;
            }

            const obj = jsyaml.load(input);
            const minified = jsyaml.dump(obj, {
                indent: 0,
                lineWidth: -1,
                noRefs: true
            }).replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();

            yamlOutput.value = minified;
            showStatus('YAML minified successfully!', 'success');
            validationResults.style.display = 'none';
        } catch (error) {
            showStatus('Error minifying YAML: ' + error.message, 'error');
            yamlOutput.value = '';
        }
    });

    // Copy to clipboard
    copyBtn.addEventListener('click', function() {
        if (!yamlOutput.value) {
            showStatus('No output to copy', 'warning');
            return;
        }
        Utils.copyToClipboard(yamlOutput.value).then(() => {
            showStatus('Copied to clipboard!', 'success');
        }).catch(() => {
            showStatus('Failed to copy', 'error');
        });
    });

    // Download
    downloadBtn.addEventListener('click', function() {
        if (!yamlOutput.value) {
            showStatus('No output to download', 'warning');
            return;
        }
        Utils.downloadFile(yamlOutput.value, 'formatted.yaml', 'text/yaml');
        showStatus('File downloaded!', 'success');
    });

    // Load file
    loadFileBtn.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                yamlInput.value = e.target.result;
                showStatus('File loaded successfully!', 'success');
            };
            reader.readAsText(file);
        }
    });

    // Auto-format on paste
    yamlInput.addEventListener('paste', function() {
        setTimeout(() => {
            formatBtn.click();
        }, 100);
    });

    function showStatus(message, type) {
        statusMessage.innerHTML = `<div class="status-message status-${type}">${message}</div>`;
        setTimeout(() => {
            statusMessage.innerHTML = '';
        }, 5000);
    }
});
