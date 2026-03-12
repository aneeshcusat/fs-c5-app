// Unix Timestamp Converter

document.addEventListener('DOMContentLoaded', function() {
    const timestampInput = document.getElementById('timestampInput');
    const dateInput = document.getElementById('dateInput');
    const convertBtn = document.getElementById('convertBtn');
    const useNowBtn = document.getElementById('useNowBtn');
    const copyBtn = document.getElementById('copyBtn');
    const results = document.getElementById('results');
    const formats = document.getElementById('formats');
    const statusMessage = document.getElementById('statusMessage');

    // Use current time
    useNowBtn.addEventListener('click', function() {
        const now = Math.floor(Date.now() / 1000);
        timestampInput.value = now;
        convert();
    });

    // Convert
    convertBtn.addEventListener('click', convert);

    // Auto-convert on input
    timestampInput.addEventListener('input', Utils.debounce(function() {
        if (timestampInput.value) convert();
    }, 300));

    dateInput.addEventListener('change', function() {
        const date = new Date(dateInput.value);
        if (!isNaN(date.getTime())) {
            timestampInput.value = Math.floor(date.getTime() / 1000);
            convert();
        }
    });

    function convert() {
        const timestamp = parseInt(timestampInput.value);
        
        if (!timestamp || isNaN(timestamp)) {
            results.textContent = 'Please enter a valid Unix timestamp';
            formats.textContent = '';
            return;
        }

        // Handle milliseconds timestamp
        let date;
        if (timestamp > 10000000000) {
            date = new Date(timestamp);
        } else {
            date = new Date(timestamp * 1000);
        }

        if (isNaN(date.getTime())) {
            showStatus('Invalid timestamp', 'error');
            return;
        }

        // Update date input
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        dateInput.value = localDate.toISOString().slice(0, 16);

        // Display results
        results.innerHTML = `
            <strong>Human Readable Date:</strong><br>
            ${date.toLocaleString()}<br><br>
            <strong>ISO 8601:</strong><br>
            ${date.toISOString()}<br><br>
            <strong>UTC:</strong><br>
            ${date.toUTCString()}<br><br>
            <strong>Unix Timestamp (seconds):</strong><br>
            ${Math.floor(date.getTime() / 1000)}<br><br>
            <strong>Unix Timestamp (milliseconds):</strong><br>
            ${date.getTime()}
        `;

        formats.innerHTML = `
            <strong>RFC 2822:</strong> ${date.toUTCString()}<br>
            <strong>Date Only:</strong> ${date.toLocaleDateString()}<br>
            <strong>Time Only:</strong> ${date.toLocaleTimeString()}<br>
            <strong>Year:</strong> ${date.getFullYear()}<br>
            <strong>Month:</strong> ${date.getMonth() + 1}<br>
            <strong>Day:</strong> ${date.getDate()}<br>
            <strong>Day of Week:</strong> ${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()]}<br>
            <strong>Week Number:</strong> ${getWeekNumber(date)}<br>
            <strong>Days since epoch:</strong> ${Math.floor(date.getTime() / (1000 * 60 * 60 * 24))}
        `;
    }

    function getWeekNumber(date) {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    }

    copyBtn.addEventListener('click', function() {
        if (!results.textContent) {
            showStatus('No results to copy', 'warning');
            return;
        }
        Utils.copyToClipboard(results.textContent).then(() => {
            showStatus('Copied to clipboard!', 'success');
        });
    });

    function showStatus(message, type) {
        statusMessage.innerHTML = `<div class="status-message status-${type}">${message}</div>`;
        setTimeout(() => {
            statusMessage.innerHTML = '';
        }, 3000);
    }

    // Initialize with current time
    useNowBtn.click();
});
