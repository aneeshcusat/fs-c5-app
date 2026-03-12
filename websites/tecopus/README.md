# Developer Tools Suite

A comprehensive collection of 67+ developer utilities organized into categories. Each tool is self-contained in its own folder with enhanced features and a user-friendly interface.

## Structure

```
tecopus/
├── index.html              # Main homepage with all tools
├── shared/                 # Shared resources
│   ├── styles.css          # Common styling
│   └── app.js              # Shared utilities
└── tools/                  # Individual tool folders
    ├── yaml-formatter/
    ├── base64/
    ├── text-compare/
    └── ... (67+ tools)
```

## Implemented Tools

### ✅ Completed Tools

1. **YAML Formatter & Validator** - Format, validate, and minify YAML
2. **Base64 Encode/Decode** - Encode and decode Base64 strings
3. **Text Compare** - Side-by-side text diff tool
4. **Unix Timestamp Converter** - Convert between Unix timestamps and dates
5. **UUID/ULID Generator** - Generate UUIDs and ULIDs
6. **SQL Formatter** - Format and validate SQL queries
7. **Hash Generator** - Generate MD5, SHA-1, SHA-256, SHA-512 hashes
8. **URL Encode/Decode** - Encode and decode URL strings
9. **Password Generator** - Generate secure passwords with options
10. **Regex Tester** - Test and visualize regex patterns
11. **JWT Decoder** - Decode and validate JWT tokens

### 📋 Remaining Tools to Implement

The following tools follow the same pattern. Each needs:
- `index.html` - Tool interface
- `app.js` - Tool functionality

#### YAML/XML Tools (6 remaining)
- YAML ↔ JSON Converter
- XML Formatter / Minifier
- XML Compare Tool
- XML ↔ JSON Converter
- XPath / XQuery Tester

#### Text/Diff Tools (10 remaining)
- Case-Insensitive Text Compare
- Whitespace-Aware Text Compare
- Line-by-Line File Compare
- Folder / Directory Compare
- List Compare (Intersection / Difference / Union)
- CSV Compare Tool
- Log File Diff Tool
- Configuration File Compare
- Regex-Based Text Matcher

#### Encoding Tools (7 remaining)
- HTML Encode / Decode
- Unicode Converter
- ASCII ↔ Hex Converter
- ROT13 / Caesar Cipher Tool
- Gzip Compress / Decompress
- Escape / Unescape JSON Strings

#### Time/Date Tools (9 remaining)
- Time Zone Converter
- Cron Expression Generator
- Cron Expression Explainer
- Date Difference Calculator
- ISO-8601 Validator
- Epoch Milliseconds Converter
- Business Days Calculator
- Relative Time Generator
- Log Timestamp Normalizer

#### API Tools (10 remaining)
- REST API Request Builder
- cURL Command Generator
- HTTP Header Builder
- OAuth Token Decoder
- API Payload Validator
- OpenAPI / Swagger Viewer
- Swagger to Client SDK Generator
- API Mock Server
- Webhook Tester
- GraphQL Query Builder & Validator

#### Code Utilities (10 remaining)
- Code Formatter (Java, JS, Python, SQL)
- Code Minifier
- Code Diff Tool
- Snippet Generator
- Environment Variable Generator
- .env File Validator
- Code Comment Remover

#### Database Tools (9 remaining)
- SQL Query Validator
- SQL to NoSQL Query Converter
- Query Plan Visualizer
- MongoDB Query Builder
- Redis Key Inspector
- DB Schema Diff Tool
- CSV ↔ SQL Insert Generator
- Data Masking Tool for DB Dumps

## Tool Template

Each tool follows this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tool Name - Developer Tools</title>
    <link rel="stylesheet" href="../../shared/styles.css">
</head>
<body>
    <div class="app-container">
        <header class="app-header">
            <div class="header-content">
                <a href="../../index.html">
                    <h1 class="logo">🛠️ Developer Tools</h1>
                </a>
                <div class="header-actions">
                    <button class="btn-icon" id="themeToggle">🌙</button>
                </div>
            </div>
        </header>

        <main class="tool-container">
            <div class="tool-header">
                <h1>Tool Name</h1>
                <button class="btn btn-secondary" onclick="window.location.href='../../index.html'">← Back</button>
            </div>

            <div class="tool-content">
                <!-- Tool-specific content -->
            </div>
        </main>
    </div>

    <script src="../../shared/app.js"></script>
    <script src="app.js"></script>
</body>
</html>
```

## Features

- **Consistent Design** - All tools share the same modern, clean UI
- **Dark Mode** - Theme toggle available on all pages
- **Responsive** - Works on desktop and mobile devices
- **User-Friendly** - Intuitive interfaces with helpful feedback
- **Enhanced Features** - Each tool includes validation, copy, download, and more

## Usage

1. Open `index.html` in a browser
2. Click on any tool to use it
3. Each tool is self-contained and works independently

## Dependencies

Tools use CDN libraries when needed:
- js-yaml (for YAML tools)
- sql-formatter (for SQL tools)
- crypto-js (for hashing)
- uuid (for UUID generation)

## Contributing

To add a new tool:
1. Create a folder in `tools/`
2. Add `index.html` and `app.js`
3. Link it from the main `index.html`
4. Follow the existing tool patterns

## License

MIT License - Feel free to use and modify as needed.
