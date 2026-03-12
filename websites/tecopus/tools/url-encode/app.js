// URL Encode/Decode Tool

document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const processBtn = document.getElementById('processBtn');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const modeButtons = document.querySelectorAll('.mode-btn');
    const statusMessage = document.getElementById('statusMessage');

    let currentMode = 'encode';

    modeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            modeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentMode = this.dataset.mode;
            processBtn.textContent = currentMode === 'encode' ? 'Encode' : 'Decode';
            inputText.value = '';
            outputText.value = '';
        });
    });

    processBtn.addEventListener('click', function() {
        const input = inputText.value.trim();
        if (!input) {
            showStatus('Please enter input text', 'error');
            return;
        }

        try {
            if (currentMode === 'encode') {
                const encoded = encodeURIComponent(input);
                outputText.value = encoded;
                showStatus('URL encoded successfully!', 'success');
            } else {
                try {
                    const decoded = decodeURIComponent(input);
                    outputText.value = decoded;
                    showStatus('URL decoded successfully!', 'success');
                } catch (e) {
                    // Try with decodeURI for partial encoding
                    try {
                        const decoded = decodeURI(input);
                        outputText.value = decoded;
                        showStatus('URL decoded successfully!', 'success');
                    } catch (e2) {
                        throw new Error('Invalid URL encoded string');
                    }
                }
            }
        } catch (error) {
            showStatus('Error: ' + error.message, 'error');
            outputText.value = '';
        }
    });

    copyBtn.addEventListener('click', function() {
        if (!outputText.value) {
            showStatus('No output to copy', 'warning');
            return;
        }
        Utils.copyToClipboard(outputText.value).then(() => {
            showStatus('Copied to clipboard!', 'success');
        });
    });

    downloadBtn.addEventListener('click', function() {
        if (!outputText.value) {
            showStatus('No output to download', 'warning');
            return;
        }
        const filename = currentMode === 'encode' ? 'encoded-url.txt' : 'decoded-url.txt';
        Utils.downloadFile(outputText.value, filename, 'text/plain');
        showStatus('File downloaded!', 'success');
    });

    inputText.addEventListener('input', Utils.debounce(function() {
        if (inputText.value.trim()) {
            processBtn.click();
        }
    }, 500));

    function showStatus(message, type) {
        statusMessage.innerHTML = `<div class="status-message status-${type}">${message}</div>`;
        setTimeout(() => {
            statusMessage.innerHTML = '';
        }, 3000);
    }
});
