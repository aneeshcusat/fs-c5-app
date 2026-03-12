// Regex Tester & Visualizer

document.addEventListener('DOMContentLoaded', function() {
    const regexInput = document.getElementById('regexInput');
    const testText = document.getElementById('testText');
    const testBtn = document.getElementById('testBtn');
    const matchResults = document.getElementById('matchResults');
    const matchVisualization = document.getElementById('matchVisualization');
    const statusMessage = document.getElementById('statusMessage');
    const flags = {
        g: document.getElementById('flagG'),
        i: document.getElementById('flagI'),
        m: document.getElementById('flagM'),
        s: document.getElementById('flagS'),
        u: document.getElementById('flagU'),
        y: document.getElementById('flagY')
    };

    testBtn.addEventListener('click', testRegex);
    testText.addEventListener('input', Utils.debounce(testRegex, 300));
    regexInput.addEventListener('input', Utils.debounce(testRegex, 300));

    Object.values(flags).forEach(flag => {
        flag.addEventListener('change', testRegex);
    });

    function testRegex() {
        const pattern = regexInput.value.trim();
        const text = testText.value;

        if (!pattern) {
            matchResults.textContent = 'Enter a regex pattern';
            matchVisualization.textContent = '';
            return;
        }

        try {
            // Build flags string
            let flagsStr = '';
            Object.entries(flags).forEach(([flag, checkbox]) => {
                if (checkbox.checked) {
                    flagsStr += flag;
                }
            });

            // Remove leading/trailing slashes if present
            let cleanPattern = pattern;
            if (pattern.startsWith('/') && pattern.lastIndexOf('/') > 0) {
                cleanPattern = pattern.slice(1, pattern.lastIndexOf('/'));
            }

            const regex = new RegExp(cleanPattern, flagsStr);
            const matches = [...text.matchAll(regex)];
            const testResult = regex.test(text);

            // Display results
            if (matches.length === 0) {
                matchResults.innerHTML = `
                    <div class="status-warning">
                        <strong>No matches found</strong><br>
                        <small>The regex pattern did not match the test text</small>
                    </div>
                `;
                matchVisualization.textContent = text || '(empty)';
            } else {
                matchResults.innerHTML = `
                    <div class="status-success">
                        <strong>Found ${matches.length} match${matches.length !== 1 ? 'es' : ''}</strong><br>
                        <small>Pattern: <code>/${cleanPattern}/${flagsStr}</code></small>
                    </div>
                    <div class="match-results">
                        ${matches.map((match, idx) => `
                            <div class="match-item">
                                <strong>Match ${idx + 1}:</strong> "${match[0]}"<br>
                                <small>Index: ${match.index}, Length: ${match[0].length}</small>
                                ${match.length > 1 ? `<br><small>Groups: ${match.slice(1).map((g, i) => `$${i + 1}="${g}"`).join(', ')}</small>` : ''}
                            </div>
                        `).join('')}
                    </div>
                `;

                // Visualize matches
                let visualization = text;
                let offset = 0;
                matches.forEach(match => {
                    const start = match.index + offset;
                    const end = start + match[0].length;
                    const before = visualization.substring(0, start);
                    const matched = visualization.substring(start, end);
                    const after = visualization.substring(end);
                    visualization = before + `[${matched}]` + after;
                    offset += 2; // Account for added brackets
                });
                matchVisualization.textContent = visualization || '(empty)';
            }

            showStatus('Regex tested successfully!', 'success');
        } catch (error) {
            matchResults.innerHTML = `
                <div class="status-error">
                    <strong>Invalid Regex Pattern</strong><br>
                    <small>${error.message}</small>
                </div>
            `;
            matchVisualization.textContent = '';
            showStatus('Invalid regex pattern', 'error');
        }
    }

    function showStatus(message, type) {
        statusMessage.innerHTML = `<div class="status-message status-${type}">${message}</div>`;
        setTimeout(() => {
            statusMessage.innerHTML = '';
        }, 3000);
    }

    // Example patterns
    regexInput.placeholder = 'Example: /\\d+/g or email@example\\.com';
});
