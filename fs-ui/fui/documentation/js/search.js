// Documentation Search Functionality
(function() {
    'use strict';

    // Get base path for relative URLs
    function getBasePath() {
        const path = window.location.pathname;
        if (path.includes('/faq/')) {
            return '../';
        }
        return '';
    }

    const basePath = getBasePath();

    // Documentation pages index
    const documentationPages = [
        {
            title: 'Home',
            url: basePath + 'index.html',
            description: 'Documentation home page with overview and quick navigation',
            keywords: ['home', 'overview', 'navigation', 'getting started']
        },
        {
            title: 'Getting Started',
            url: basePath + 'getting-started.html',
            description: 'Login, authentication, navigation basics, and your first steps',
            keywords: ['login', 'authentication', 'navigation', 'basics', 'first steps', 'getting started']
        },
        {
            title: 'Projects',
            url: basePath + 'projects.html',
            description: 'Creating, editing, viewing, and managing projects',
            keywords: ['projects', 'create project', 'edit project', 'project list', 'project details', 'archive', 'delete']
        },
        {
            title: 'Tasks',
            url: basePath + 'tasks.html',
            description: 'Creating tasks, task board, task planner, work items, and task management',
            keywords: ['tasks', 'deliverables', 'task board', 'kanban', 'task planner', 'work items', 'create task']
        },
        {
            title: 'HRMS',
            url: basePath + 'hrms.html',
            description: 'Timesheet management, employee management, attendance, and HRMS features',
            keywords: ['hrms', 'timesheet', 'employee', 'attendance', 'leave', 'holiday', 'invoice']
        },
        {
            title: 'Sales',
            url: basePath + 'sales.html',
            description: 'Bid requests, purchase orders, and sales management',
            keywords: ['sales', 'bid request', 'purchase order', 'po', 'bids']
        },
        {
            title: 'Reports',
            url: basePath + 'reports.html',
            description: 'Utilization reports, project reports, time reports, and data exports',
            keywords: ['reports', 'utilization', 'project reports', 'time reports', 'data dump', 'export']
        },
        {
            title: 'Advanced Features',
            url: basePath + 'advanced.html',
            description: 'Resource planner, feedback system, accounts management, and advanced features',
            keywords: ['advanced', 'resource planner', 'feedback', 'accounts', 'calendar', 'search', 'notifications']
        },
        {
            title: 'Access Controls',
            url: basePath + 'access-controls.html',
            description: 'Permissions, access restrictions, and understanding system access',
            keywords: ['access', 'permissions', 'controls', 'restrictions', 'access denied', 'permission denied']
        },
        {
            title: 'Application Configuration',
            url: basePath + 'application-configuration.html',
            description: 'Organization-level configuration settings, dropdown values, and system customization',
            keywords: ['configuration', 'settings', 'config', 'dropdown', 'organization', 'customization']
        },
        {
            title: 'FAQ',
            url: basePath + 'faq/index.html',
            description: 'Frequently asked questions and troubleshooting',
            keywords: ['faq', 'questions', 'help', 'troubleshooting', 'issues', 'problems']
        }
    ];

    // Search function
    function searchDocumentation(query) {
        if (!query || query.trim().length < 2) {
            return [];
        }

        const searchTerm = query.toLowerCase().trim();
        const results = [];

        // Search through page titles, descriptions, and keywords
        documentationPages.forEach(page => {
            let score = 0;
            const titleMatch = page.title.toLowerCase().includes(searchTerm);
            const descMatch = page.description.toLowerCase().includes(searchTerm);
            const keywordMatches = page.keywords.filter(kw => kw.toLowerCase().includes(searchTerm)).length;

            if (titleMatch) score += 10;
            if (descMatch) score += 5;
            score += keywordMatches * 2;

            if (score > 0) {
                results.push({
                    ...page,
                    score: score,
                    matchType: titleMatch ? 'title' : (descMatch ? 'description' : 'keyword')
                });
            }
        });

        // Also search through current page content
        const currentPageResults = searchCurrentPage(searchTerm);
        results.push(...currentPageResults);

        // Sort by score (highest first)
        results.sort((a, b) => b.score - a.score);

        return results.slice(0, 10); // Return top 10 results
    }

    // Search current page content
    function searchCurrentPage(searchTerm) {
        const results = [];
        const sections = document.querySelectorAll('.section, h2, h3, h4, .field-description');
        
        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                const heading = section.querySelector('h2, h3, h4') || section;
                const headingText = heading.textContent.trim();
                const id = section.id || heading.id || '';
                
                if (headingText && !results.find(r => r.url === `#${id}`)) {
                    results.push({
                        title: headingText,
                        url: id ? `#${id}` : window.location.pathname,
                        description: text.substring(0, 150) + '...',
                        score: 3,
                        matchType: 'content',
                        isCurrentPage: true
                    });
                }
            }
        });

        return results;
    }

    // Create search UI
    function createSearchUI() {
        const header = document.querySelector('header .container');
        if (!header) return;

        // Create search container
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <div class="search-wrapper">
                <input 
                    type="text" 
                    id="docSearchInput" 
                    class="search-input" 
                    placeholder="Search documentation..." 
                    autocomplete="off"
                />
                <span class="search-icon">🔍</span>
                <div id="searchResults" class="search-results"></div>
            </div>
        `;

        // Insert search before header text or at the end
        const headerContent = header.querySelector('.header-content');
        if (headerContent) {
            headerContent.appendChild(searchContainer);
        } else {
            header.appendChild(searchContainer);
        }

        // Add event listeners
        const searchInput = document.getElementById('docSearchInput');
        const searchResults = document.getElementById('searchResults');
        let searchTimeout;

        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value;

            if (query.length < 2) {
                searchResults.innerHTML = '';
                searchResults.classList.remove('active');
                return;
            }

            searchTimeout = setTimeout(() => {
                const results = searchDocumentation(query);
                displaySearchResults(results, query);
            }, 200);
        });

        searchInput.addEventListener('focus', function() {
            if (this.value.length >= 2) {
                const results = searchDocumentation(this.value);
                displaySearchResults(results, this.value);
            }
        });

        // Close results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchContainer.contains(e.target)) {
                searchResults.classList.remove('active');
            }
        });

        // Handle keyboard navigation
        searchInput.addEventListener('keydown', function(e) {
            const activeResult = searchResults.querySelector('.result-item.active');
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const next = activeResult ? activeResult.nextElementSibling : searchResults.querySelector('.result-item');
                if (next) {
                    if (activeResult) activeResult.classList.remove('active');
                    next.classList.add('active');
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prev = activeResult ? activeResult.previousElementSibling : null;
                if (prev) {
                    activeResult.classList.remove('active');
                    prev.classList.add('active');
                } else {
                    if (activeResult) activeResult.classList.remove('active');
                }
            } else if (e.key === 'Enter' && activeResult) {
                e.preventDefault();
                const link = activeResult.querySelector('a');
                if (link) link.click();
            } else if (e.key === 'Escape') {
                searchResults.classList.remove('active');
                searchInput.blur();
            }
        });
    }

    // Display search results
    function displaySearchResults(results, query) {
        const searchResults = document.getElementById('searchResults');
        if (!searchResults) return;

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No results found</div>';
            searchResults.classList.add('active');
            return;
        }

        const resultsHTML = results.map((result, index) => {
            const isAnchor = result.url.startsWith('#');
            const fullUrl = isAnchor ? window.location.pathname + result.url : result.url;
            const highlightTitle = highlightText(result.title, query);
            const highlightDesc = highlightText(result.description, query);

            return `
                <div class="result-item ${index === 0 ? 'active' : ''}" data-url="${fullUrl}">
                    <a href="${fullUrl}" onclick="event.stopPropagation();">
                        <div class="result-title">${highlightTitle}</div>
                        <div class="result-description">${highlightDesc}</div>
                        ${result.matchType ? `<div class="result-type">${result.matchType}</div>` : ''}
                    </a>
                </div>
            `;
        }).join('');

        searchResults.innerHTML = resultsHTML;
        searchResults.classList.add('active');

        // Add click handlers
        searchResults.querySelectorAll('.result-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                searchResults.querySelectorAll('.result-item').forEach(r => r.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // Highlight matching text
    function highlightText(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    // Initialize search when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createSearchUI);
    } else {
        createSearchUI();
    }
})();

