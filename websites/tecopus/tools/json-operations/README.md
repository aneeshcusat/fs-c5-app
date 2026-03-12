# JSON Operations Tool

A comprehensive, professional JSON manipulation tool built with vanilla JavaScript. Lightweight, fast, and feature-rich.

## Features

### 1. Core JSON Handling
- **Input & Output**
  - Paste JSON input
  - Upload JSON file
  - Load JSON from URL
  - Drag-and-drop support
  - Large file handling
  - Auto-detect encoding

- **Validation**
  - Syntax validation
  - Error highlighting with line/column numbers
  - Auto-fix common issues
  - Duplicate key detection

- **Formatting**
  - Pretty print (configurable indentation)
  - Minify / compress
  - Sort keys (alphabetical)
  - Normalize line endings

### 2. JSON Comparison & Diff
- Side-by-side JSON diff
- Structural diff (key-level changes)
- Ignore ordering option
- Highlight added / removed / modified nodes
- JSON Patch (RFC 6902) generation

### 3. Search, Filter, and Navigation
- Tree view (expand / collapse)
- Global search
- Path-based search
- JSONPath evaluator
- Filter nodes by key name, value, data type
- Breadcrumb navigation
- Copy full JSON path

### 4. Transformation & Manipulation
- Add / remove / rename keys
- Move nodes
- Replace values (bulk replace)
- Flatten JSON
- Unflatten JSON
- Extract sub-JSON by path
- Merge multiple JSON files

### 5. Schema & Structure Tools
- Auto-generate JSON Schema
- Validate against JSON Schema
- Schema diff
- Convert Schema → Sample JSON

### 6. Conversion & Export
- JSON → CSV
- JSON → XML
- JSON → YAML
- JSON → TypeScript Interface
- JSON → Python Dataclass
- JSON → Java POJO
- JSON → C# Model
- Export selected paths only

### 7. Data Quality & Safety
- PII detection (email, phone, SSN, CC)
- Mask / redact sensitive fields
- Field type validation
- Empty/null value detection
- Key naming convention checks
- Duplicate object detection

### 8. Developer Workflow Features
- Undo / redo
- History of changes
- Save snapshots
- Download results
- Copy to clipboard
- Dark / light mode

### 9. UI / UX Enhancements
- Syntax highlighting
- Line numbers
- Code folding
- Dark / light mode toggle
- Keyboard shortcuts
- Error quick-jump
- Resizable panes
- Mobile-friendly responsive design

## Usage

1. Open `index.html` in a modern web browser
2. Use the sidebar to navigate between different tool sections
3. Paste or upload your JSON data
4. Use the toolbar buttons to perform operations
5. Download or copy results as needed

## Keyboard Shortcuts

- `Ctrl+Z` / `Cmd+Z` - Undo
- `Ctrl+Y` / `Cmd+Y` - Redo
- `Ctrl+S` / `Cmd+S` - Download
- `Ctrl+F` / `Cmd+F` - Search (in browser)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## File Structure

```
json-operations/
├── index.html      # Main HTML structure
├── styles.css      # Professional styling with dark mode
├── app.js          # Complete application logic
└── README.md       # This file
```

## Technical Details

- **Pure JavaScript** - No dependencies, lightweight
- **Modern CSS** - CSS Variables for theming
- **Responsive Design** - Works on desktop and mobile
- **Local Storage** - Theme preferences saved
- **File API** - Direct file handling
- **Clipboard API** - Copy to clipboard support

## Future Enhancements

- Advanced JSONPath support
- Batch processing
- REST API integration
- CLI interface
- Webhook triggers
- CI/CD pipeline integration

## License

MIT License - Feel free to use and modify as needed.
