# GitHub Pages Deployment Setup

This project is now configured for static export to GitHub Pages.

## Setup Instructions

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub: https://github.com/Faethreck/escuelarapanui
   - Click on **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save the settings

2. **Push the changes:**
   ```bash
   git add .
   git commit -m "Configure static export for GitHub Pages"
   git push origin main
   ```

3. **Wait for deployment:**
   - Go to the **Actions** tab in your repository
   - The workflow will automatically build and deploy your site
   - Once complete, your site will be available at:
     - `https://faethreck.github.io/escuelarapanui/` (if repository name is used)
     - Or your custom domain if configured

## Important Notes

- The site is now built as static HTML/CSS/JS files
- Images are unoptimized (required for static export)
- All client-side features will work normally
- Server-side features (API routes, server components) won't work

## Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file in the `public/` directory with your domain
2. Update DNS settings to point to GitHub Pages
3. Enable custom domain in GitHub Pages settings

## Troubleshooting

- If the site shows a 404, check that GitHub Pages is set to use **GitHub Actions** as the source
- If images don't load, verify the image paths are correct
- Check the Actions tab for build errors
