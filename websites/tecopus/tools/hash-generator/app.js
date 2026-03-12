// Hash Generator

document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('inputText');
    const hashOutput = document.getElementById('hashOutput');
    const hashType = document.getElementById('hashType');
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const loadFileBtn = document.getElementById('loadFileBtn');
    const fileInput = document.getElementById('fileInput');
    const hashInfo = document.getElementById('hashInfo');
    const statusMessage = document.getElementById('statusMessage');

    generateBtn.addEventListener('click', generateHash);
    copyBtn.addEventListener('click', copyHash);
    loadFileBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                inputText.value = e.target.result;
                generateHash();
                showStatus('File loaded and hashed!', 'success');
            };
            reader.readAsText(file);
        }
    });

    // Auto-generate on input
    inputText.addEventListener('input', Utils.debounce(generateHash, 500));

    function generateHash() {
        const input = inputText.value.trim();
        if (!input) {
            hashOutput.value = '';
            hashInfo.textContent = '';
            return;
        }

        const type = hashType.value;
        let hash;

        try {
            switch(type) {
                case 'md5':
                    hash = CryptoJS.MD5(input).toString();
                    break;
                case 'sha1':
                    hash = CryptoJS.SHA1(input).toString();
                    break;
                case 'sha256':
                    hash = CryptoJS.SHA256(input).toString();
                    break;
                case 'sha512':
                    hash = CryptoJS.SHA512(input).toString();
                    break;
            }

            hashOutput.value = hash;
            updateHashInfo(hash, type, input.length);
            showStatus(`${type.toUpperCase()} hash generated!`, 'success');
        } catch (error) {
            showStatus('Error generating hash: ' + error.message, 'error');
        }
    }

    function updateHashInfo(hash, type, inputLength) {
        hashInfo.innerHTML = `
            <strong>Hash Type:</strong> ${type.toUpperCase()}<br>
            <strong>Hash Length:</strong> ${hash.length} characters<br>
            <strong>Input Length:</strong> ${inputLength} characters<br>
            <strong>Hash (Hex):</strong> ${hash}<br>
            <strong>Hash (Base64):</strong> ${CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(hash))}
        `;
    }

    function copyHash() {
        if (!hashOutput.value) {
            showStatus('No hash to copy', 'warning');
            return;
        }
        Utils.copyToClipboard(hashOutput.value).then(() => {
            showStatus('Hash copied to clipboard!', 'success');
        });
    }

    function showStatus(message, type) {
        statusMessage.innerHTML = `<div class="status-message status-${type}">${message}</div>`;
        setTimeout(() => {
            statusMessage.innerHTML = '';
        }, 3000);
    }
});
