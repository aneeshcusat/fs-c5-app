// ============================================
// PROFESSIONAL SHARED UTILITIES
// Advanced Features & Enhancements
// ============================================

// Theme Management
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
        
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            showNotification(`Switched to ${newTheme} mode`, 'success');
        });
    }

    function updateThemeIcon(theme) {
        if (themeToggle) {
            themeToggle.querySelector('.icon').textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    // Initialize keyboard shortcuts
    initKeyboardShortcuts();
    
    // Initialize tooltips
    initTooltips();
    
    // Initialize quick actions
    initQuickActions();
    
    // Initialize help button
    const helpBtn = document.getElementById('helpBtn');
    if (helpBtn) {
        helpBtn.addEventListener('click', function() {
            showHelpModal();
        });
    }
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

const Utils = {
    // Copy to clipboard with enhanced feedback
    copyToClipboard: function(text, showNotification = true) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text).then(() => {
                if (showNotification) {
                    this.showNotification('Copied to clipboard!', 'success');
                }
                return Promise.resolve();
            });
        } else {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                document.body.removeChild(textarea);
                if (showNotification) {
                    this.showNotification('Copied to clipboard!', 'success');
                }
                return Promise.resolve();
            } catch (err) {
                document.body.removeChild(textarea);
                return Promise.reject(err);
            }
        }
    },
    
    // Download file with better naming
    downloadFile: function(content, filename, mimeType = 'text/plain') {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this.showNotification(`Downloaded: ${filename}`, 'success');
    },
    
    // Enhanced notification system
    showNotification: function(message, type = 'success', duration = 3000) {
        // Remove existing notifications
        const existing = document.querySelectorAll('.notification-toast');
        existing.forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification-toast notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${getNotificationIcon(type)}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            min-width: 300px;
            max-width: 500px;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            notification.style.transition = 'all 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, duration);
    },
    
    // Format file size
    formatFileSize: function(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    },
    
    // Debounce function
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle: function(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Generate sample data
    generateSampleData: function(type) {
        const samples = {
            json: JSON.stringify({
                name: "John Doe",
                age: 30,
                email: "john.doe@example.com",
                address: {
                    street: "123 Main St",
                    city: "New York",
                    zip: "10001"
                },
                hobbies: ["reading", "coding", "hiking"],
                active: true
            }, null, 2),
            yaml: `name: John Doe
age: 30
email: john.doe@example.com
address:
  street: 123 Main St
  city: New York
  zip: 10001
hobbies:
  - reading
  - coding
  - hiking
active: true`,
            sql: `SELECT 
    u.id,
    u.name,
    u.email,
    COUNT(o.id) as order_count,
    SUM(o.total) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.active = 1
    AND u.created_at >= '2024-01-01'
GROUP BY u.id, u.name, u.email
HAVING COUNT(o.id) > 0
ORDER BY total_spent DESC
LIMIT 10;`,
            csv: `name,age,email,city
John Doe,30,john@example.com,New York
Jane Smith,25,jane@example.com,Los Angeles
Bob Johnson,35,bob@example.com,Chicago`
        };
        return samples[type] || '';
    },
    
    // History management
    saveToHistory: function(key, data) {
        try {
            const history = JSON.parse(localStorage.getItem(`history_${key}`) || '[]');
            history.unshift({
                data: data,
                timestamp: Date.now()
            });
            // Keep only last 50 items
            const limited = history.slice(0, 50);
            localStorage.setItem(`history_${key}`, JSON.stringify(limited));
        } catch (e) {
            console.error('Failed to save history:', e);
        }
    },
    
    getHistory: function(key) {
        try {
            return JSON.parse(localStorage.getItem(`history_${key}`) || '[]');
        } catch (e) {
            return [];
        }
    },
    
    // Clear history
    clearHistory: function(key) {
        localStorage.removeItem(`history_${key}`);
        this.showNotification('History cleared', 'success');
    },
    
    // Show loading state
    showLoading: function(element, text = 'Processing...') {
        if (element) {
            element.classList.add('loading');
            element.dataset.originalContent = element.textContent;
            element.textContent = text;
            element.disabled = true;
        }
    },
    
    hideLoading: function(element) {
        if (element) {
            element.classList.remove('loading');
            if (element.dataset.originalContent) {
                element.textContent = element.dataset.originalContent;
            }
            element.disabled = false;
        }
    },
    
    // Format JSON with error handling
    formatJSON: function(jsonString) {
        try {
            const obj = JSON.parse(jsonString);
            return JSON.stringify(obj, null, 2);
        } catch (e) {
            throw new Error('Invalid JSON: ' + e.message);
        }
    },
    
    // Validate JSON
    validateJSON: function(jsonString) {
        try {
            JSON.parse(jsonString);
            return { valid: true };
        } catch (e) {
            return { valid: false, error: e.message };
        }
    },
    
    // Get character count with details
    getTextStats: function(text) {
        return {
            characters: text.length,
            charactersNoSpaces: text.replace(/\s/g, '').length,
            words: text.trim() ? text.trim().split(/\s+/).length : 0,
            lines: text.split('\n').length,
            paragraphs: text.split(/\n\s*\n/).filter(p => p.trim()).length
        };
    }
};

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K: Focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                e.preventDefault();
                searchInput.focus();
                searchInput.select();
            }
        }
        
        // Ctrl/Cmd + S: Save/Download (prevent default browser save)
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            const downloadBtn = document.querySelector('[data-shortcut="download"]');
            if (downloadBtn && !e.target.matches('input, textarea')) {
                e.preventDefault();
                downloadBtn.click();
            }
        }
        
        // Ctrl/Cmd + Enter: Process/Convert
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const processBtn = document.querySelector('[data-shortcut="process"]');
            if (processBtn && document.activeElement.matches('textarea, input')) {
                e.preventDefault();
                processBtn.click();
            }
        }
        
        // Escape: Close modals/clear
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal.active');
            modals.forEach(modal => modal.classList.remove('active'));
        }
    });
}

// ============================================
// TOOLTIPS
// ============================================

function initTooltips() {
    // Tooltips are handled via CSS [data-tooltip] attribute
    // Add tooltip to elements with data-tooltip attribute
    document.querySelectorAll('[data-tooltip]').forEach(el => {
        el.setAttribute('title', el.getAttribute('data-tooltip'));
    });
}

// ============================================
// QUICK ACTIONS
// ============================================

function initQuickActions() {
    // Add quick action buttons to toolbars
    const toolbars = document.querySelectorAll('.toolbar');
    toolbars.forEach(toolbar => {
        // Add quick actions if not already present
        if (!toolbar.querySelector('.quick-actions')) {
            const quickActions = document.createElement('div');
            quickActions.className = 'quick-actions';
            quickActions.style.cssText = 'display: flex; gap: 0.5rem; margin-left: auto;';
            toolbar.appendChild(quickActions);
        }
    });
}

// ============================================
// NOTIFICATION ICONS
// ============================================

function getNotificationIcon(type) {
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    return icons[type] || '•';
}

// ============================================
// ENHANCED NOTIFICATION STYLES
// ============================================

const notificationStyles = `
<style>
@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(100%);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.notification-toast {
    background: var(--bg-glass-strong);
    backdrop-filter: blur(20px);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-xl);
    border: 1px solid var(--border-color);
    overflow: hidden;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
}

.notification-icon {
    font-size: 1.25rem;
    font-weight: bold;
}

.notification-message {
    flex: 1;
    font-weight: 500;
    color: var(--text-primary);
}

.notification-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-muted);
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 0.2s;
}

.notification-close:hover {
    background: var(--bg-hover);
    color: var(--text-primary);
}

.notification-success {
    border-left: 4px solid var(--success-color);
}

.notification-error {
    border-left: 4px solid var(--danger-color);
}

.notification-warning {
    border-left: 4px solid var(--warning-color);
}

.notification-info {
    border-left: 4px solid var(--info-color);
}
</style>
`;

// Inject notification styles
if (!document.getElementById('notification-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'notification-styles';
    styleSheet.textContent = notificationStyles.replace('<style>', '').replace('</style>', '');
    document.head.appendChild(styleSheet);
}

// ============================================
// HELP MODAL FUNCTIONALITY
// ============================================
function showHelpModal() {
    // Check if modal already exists
    let modal = document.getElementById('helpModal');
    if (!modal) {
        // Create modal
        modal = document.createElement('div');
        modal.id = 'helpModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px; background: var(--bg-glass-strong); backdrop-filter: blur(20px); border-radius: var(--border-radius-lg); padding: 2rem; box-shadow: var(--shadow-xl); border: 1px solid var(--border-color);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h2 style="margin: 0; font-size: 1.5rem; font-weight: 800; background: var(--primary-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Help & Shortcuts</h2>
                    <button id="closeHelpModal" style="background: none; border: none; font-size: 2rem; cursor: pointer; color: var(--text-secondary); line-height: 1;">&times;</button>
                </div>
                <div style="color: var(--text-primary);">
                    <h3 style="margin-top: 1.5rem; margin-bottom: 0.75rem; font-size: 1.125rem; font-weight: 700;">Keyboard Shortcuts</h3>
                    <ul style="list-style: none; padding: 0; margin-bottom: 1.5rem;">
                        <li style="padding: 0.5rem 0; display: flex; gap: 0.5rem;"><kbd style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 4px; padding: 0.25rem 0.5rem; font-family: var(--font-mono); font-size: 0.875rem;">Ctrl+S</kbd> / <kbd style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 4px; padding: 0.25rem 0.5rem; font-family: var(--font-mono); font-size: 0.875rem;">Cmd+S</kbd> - Download</li>
                        <li style="padding: 0.5rem 0; display: flex; gap: 0.5rem;"><kbd style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 4px; padding: 0.25rem 0.5rem; font-family: var(--font-mono); font-size: 0.875rem;">Esc</kbd> - Close this dialog</li>
                    </ul>
                    <h3 style="margin-top: 1.5rem; margin-bottom: 0.75rem; font-size: 1.125rem; font-weight: 700;">Tips</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li style="padding: 0.5rem 0;">• Use the theme toggle button (🌙) to switch between light and dark modes</li>
                        <li style="padding: 0.5rem 0;">• Click the logo to return to the home page</li>
                        <li style="padding: 0.5rem 0;">• Most tools support keyboard shortcuts for faster workflow</li>
                    </ul>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add close functionality
        const closeBtn = modal.querySelector('#closeHelpModal');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        });
    }
    
    // Show modal
    modal.classList.add('active');
    
    // Add modal styles if not already present
    if (!document.getElementById('help-modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'help-modal-styles';
        styleSheet.textContent = `
            .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                z-index: 2000;
                align-items: center;
                justify-content: center;
            }
            .modal.active {
                display: flex;
            }
        `;
        document.head.appendChild(styleSheet);
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}
