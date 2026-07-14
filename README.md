# Simon Stevenson Professional Website

Personal professional website for Dr. Simon Stevenson, hosted with GitHub Pages.

**Live site:** [https://simonstevenson.github.io/](https://simonstevenson.github.io/)

## Overview

This site presents Simon's academic and professional profile, with dual audience modes for academia and industry. It includes:

- Biography and research interests
- Selected projects and open-source software
- Selected publications with category filters and expandable lists
- Professional experience and technical skills
- Contact details

## Repository Structure

```text
.
├── index.html              # Main website content
├── stylesheets/
│   ├── stylesheet.css      # Main screen styles
│   └── print.css           # Print/CV styles
├── javascripts/
│   └── main.js             # Theme toggle, audience mode, navigation, publications filtering
└── images/                 # Site images and visual assets
```

## Local Preview

Because this is a static site, it can be previewed by opening `index.html` directly in a browser.

For a closer match to GitHub Pages behavior, run a simple local server from the repository root:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Deployment

The site is deployed automatically by GitHub Pages from this repository:

[https://github.com/SimonStevenson/SimonStevenson.github.io](https://github.com/SimonStevenson/SimonStevenson.github.io)

To update the public site:

```bash
git add .
git commit -m "Update website"
git push origin master
```

GitHub Pages usually publishes changes within a few minutes.

## Maintenance Notes

- Edit site content primarily in `index.html`.
- Update styling in `stylesheets/stylesheet.css`.
- Update print layout in `stylesheets/print.css`.
- Update interactive behavior in `javascripts/main.js`.
- Keep external publication and software links current, especially for newly released LVK papers and project repositories.
