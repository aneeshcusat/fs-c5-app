// Password Generator

document.addEventListener('DOMContentLoaded', function() {
    const lengthInput = document.getElementById('lengthInput');
    const generateBtn = document.getElementById('generateBtn');
    const generateMultipleBtn = document.getElementById('generateMultipleBtn');
    const copyBtn = document.getElementById('copyBtn');
    const passwordOutput = document.getElementById('passwordOutput');
    const strengthInfo = document.getElementById('strengthInfo');
    const statusMessage = document.getElementById('statusMessage');

    const checkboxes = {
        includeUppercase: document.getElementById('includeUppercase'),
        includeLowercase: document.getElementById('includeLowercase'),
        includeNumbers: document.getElementById('includeNumbers'),
        includeSymbols: document.getElementById('includeSymbols'),
        excludeSimilar: document.getElementById('excludeSimilar'),
        excludeAmbiguous: document.getElementById('excludeAmbiguous')
    };

    generateBtn.addEventListener('click', () => generatePassword(1));
    generateMultipleBtn.addEventListener('click', () => generatePassword(10));
    copyBtn.addEventListener('click', copyPassword);

    function generatePassword(count) {
        const length = parseInt(lengthInput.value) || 16;
        const passwords = [];

        for (let i = 0; i < count; i++) {
            let password = '';
            let charset = '';

            if (checkboxes.includeUppercase.checked) {
                charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            }
            if (checkboxes.includeLowercase.checked) {
                charset += 'abcdefghijklmnopqrstuvwxyz';
            }
            if (checkboxes.includeNumbers.checked) {
                charset += '0123456789';
            }
            if (checkboxes.includeSymbols.checked) {
                charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
            }

            if (checkboxes.excludeSimilar.checked) {
                charset = charset.replace(/[il1Lo0O]/g, '');
            }

            if (checkboxes.excludeAmbiguous.checked) {
                charset = charset.replace(/[{}[\]()/\\'"~,;.:]/g, '');
            }

            if (!charset) {
                showStatus('Please select at least one character type', 'error');
                return;
            }

            const array = new Uint32Array(length);
            crypto.getRandomValues(array);

            for (let i = 0; i < length; i++) {
                password += charset[array[i] % charset.length];
            }

            passwords.push(password);
        }

        passwordOutput.value = passwords.join('\n');
        updateStrengthInfo(passwords[0]);
        showStatus(`Generated ${count} password${count > 1 ? 's' : ''}!`, 'success');
    }

    function updateStrengthInfo(password) {
        let strength = 0;
        let feedback = [];

        if (password.length >= 12) strength += 2;
        else if (password.length >= 8) strength += 1;
        else feedback.push('Password is too short (recommend 12+ characters)');

        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
            strength += 1;
        } else {
            feedback.push('Include both uppercase and lowercase letters');
        }

        if (/\d/.test(password)) {
            strength += 1;
        } else {
            feedback.push('Include numbers');
        }

        if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) {
            strength += 1;
        } else {
            feedback.push('Include special characters');
        }

        const entropy = calculateEntropy(password);
        strength += entropy > 60 ? 2 : entropy > 40 ? 1 : 0;

        let strengthText = '';
        let strengthClass = '';
        if (strength >= 7) {
            strengthText = 'Very Strong';
            strengthClass = 'status-success';
        } else if (strength >= 5) {
            strengthText = 'Strong';
            strengthClass = 'status-success';
        } else if (strength >= 3) {
            strengthText = 'Moderate';
            strengthClass = 'status-warning';
        } else {
            strengthText = 'Weak';
            strengthClass = 'status-error';
        }

        strengthInfo.innerHTML = `
            <div class="${strengthClass}">
                <strong>Strength: ${strengthText}</strong><br>
                <small>Entropy: ${entropy.toFixed(2)} bits</small><br>
                ${feedback.length > 0 ? '<small>Suggestions: ' + feedback.join(', ') + '</small>' : ''}
            </div>
        `;
    }

    function calculateEntropy(password) {
        const charsetSize = new Set(password).size;
        return password.length * Math.log2(charsetSize);
    }

    function copyPassword() {
        if (!passwordOutput.value) {
            showStatus('No password to copy', 'warning');
            return;
        }
        Utils.copyToClipboard(passwordOutput.value).then(() => {
            showStatus('Password copied to clipboard!', 'success');
        });
    }

    function showStatus(message, type) {
        statusMessage.innerHTML = `<div class="status-message status-${type}">${message}</div>`;
        setTimeout(() => {
            statusMessage.innerHTML = '';
        }, 3000);
    }

    // Generate on load
    generatePassword(1);
});
