# Personal Profile Website

A professional personal profile website for Aneeshkumar Perukilakattunirappel Sundareswaran.

## Features

- **Professional Design**: Modern, clean, and responsive design
- **Easy Navigation**: Smooth scrolling navigation with active section highlighting
- **SEO Optimized**: Comprehensive meta tags, structured data, and semantic HTML
- **Awards Gallery**: Dedicated section with photo placeholders for awards
- **Certification Links**: Organized certification section with clickable links
- **Responsive**: Fully responsive design that works on all devices
- **Performance**: Optimized for fast loading and smooth interactions

## File Structure

```
myprofile/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript for interactivity
├── README.md           # This file
└── images/
    ├── profile-photo.svg           # Your profile photo placeholder (replace with .jpg/.png)
    ├── placeholder-award.svg       # Placeholder for awards
    └── awards/
        ├── lifetime-achievement-ioasd.jpg
        ├── outstanding-achievement-indus.jpg
        ├── claro-gold-award.jpg
        ├── global-recognition-2024.jpg
        ├── wcp-champion-2024.jpg
        ├── walmart-codeception-2019.jpg
        ├── litmus7-draathon-2018.jpg
        └── litmus7-outstanding-2016.jpg
```

## Setup Instructions

### 1. Add Your Profile Photo

Replace `images/profile-photo.svg` with your actual profile photo (`profile-photo.jpg` or `profile-photo.png`). Recommended size: 500x500px or larger (square format works best). Update the `src` attribute in `index.html` from `profile-photo.svg` to your image filename.

### 2. Add Award Photos

Add photos of your awards to the `images/awards/` directory with the following filenames:
- `lifetime-achievement-ioasd.jpg`
- `outstanding-achievement-indus.jpg`
- `claro-gold-award.jpg`
- `global-recognition-2024.jpg`
- `wcp-champion-2024.jpg`
- `walmart-codeception-2019.jpg`
- `litmus7-draathon-2018.jpg`
- `litmus7-outstanding-2016.jpg`

If an award photo is missing, the site will automatically use the placeholder image.

### 3. Update Certification Links

In `index.html`, update the certification links in the Certifications section. Replace the `#` placeholders with actual URLs to your certification pages or PDFs.

Example:
```html
<li><a href="https://example.com/certificate.pdf" target="_blank" rel="noopener noreferrer">Certification Name</a></li>
```

### 4. Update Social Media Links

Update the social media links in the Hero and Contact sections with your actual profiles:
- LinkedIn
- GitHub
- Twitter

### 5. Update Contact Email

Replace `contact@aneeshkumarps.com` with your actual email address in the Contact section.

### 6. Update Domain/URL

In `index.html`, update the Open Graph URL meta tag:
```html
<meta property="og:url" content="https://yourdomain.com">
```

## Customization

### Colors

You can customize the color scheme by modifying CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --primary-dark: #1e40af;
    --secondary-color: #64748b;
    /* ... */
}
```

### Content

All content can be edited directly in `index.html`. The structure is semantic and easy to modify.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## SEO Features

- Semantic HTML5 structure
- Meta tags for description, keywords, and author
- Open Graph tags for social media sharing
- Twitter Card tags
- Structured data (JSON-LD) for search engines
- Proper heading hierarchy
- Alt text for images (add descriptive alt text when adding images)

## Performance

- Optimized CSS and JavaScript
- Lazy loading for images
- Smooth scroll animations
- Efficient DOM manipulation

## Deployment

You can deploy this website to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

Simply upload all files maintaining the directory structure.

## License

Personal use only. All rights reserved.

