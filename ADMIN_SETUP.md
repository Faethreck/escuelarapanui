# Admin Panel Setup Guide

## Overview

The admin panel allows school administration to create, edit, and delete news posts through a secure web interface.

## Initial Setup

### 1. Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
ADMIN_PASSWORD=your_secure_password_here
JWT_SECRET=your_jwt_secret_key_change_in_production
```

**Important:** 
- Use a strong password for `ADMIN_PASSWORD`
- Generate a random secret for `JWT_SECRET` using: `openssl rand -base64 32`
- Never commit `.env.local` to git (it's already in `.gitignore`)

### 2. For Production (Hetzner Deployment)

When deploying to Hetzner, you'll need to:

1. **Remove static export from `next.config.js`**:
   - Remove or comment out: `output: 'export'`
   - Remove or comment out: `basePath: '/escuelarapanui'`
   - Remove or comment out: `trailingSlash: true`
   - This allows API routes to work properly

2. **Set environment variables on the server**:
   ```bash
   export ADMIN_PASSWORD=your_secure_password
   export JWT_SECRET=your_jwt_secret
   export NODE_ENV=production
   ```

   Or add them to your PM2 ecosystem config or `.env` file.

### 3. Access the Admin Panel

1. Navigate to `/admin` on your website
2. Enter the password set in `ADMIN_PASSWORD`
3. You'll be redirected to the dashboard

## Using the Admin Panel

### Creating a Post

1. Click "Nueva Publicación" on the dashboard
2. Fill in the required fields:
   - **Título**: Post title
   - **Autor**: Author name (e.g., "Equipo Directivo")
   - **Fecha**: Publication date
   - **Contenido Completo**: Full post content
   - **Resumen**: Optional excerpt (auto-generated if not provided)
   - **Categoría**: Optional category (e.g., "Eventos", "Deportes")
   - **URL de Imagen**: Optional image URL
3. Click "Guardar"

### Editing a Post

1. Find the post in the dashboard
2. Click "Editar"
3. Modify the fields as needed
4. Click "Actualizar Publicación"

### Deleting a Post

1. Find the post in the dashboard
2. Click the trash icon
3. Confirm deletion

### Searching Posts

Use the search bar at the top of the dashboard to filter posts by title, author, or content.

## Data Storage

Posts are stored in `data/posts.json`. This file is git-ignored to prevent committing sensitive data. Make sure to:

- Back up `data/posts.json` regularly
- Restore it when deploying to a new server
- Keep it secure (it's not publicly accessible)

## Security Notes

- The admin panel is password-protected
- Sessions expire after 24 hours
- API routes require authentication for create/update/delete operations
- Public read access to posts is allowed (for displaying on the website)

## Troubleshooting

### "Unauthorized" errors
- Check that you're logged in (session may have expired)
- Verify `ADMIN_PASSWORD` is set correctly
- Try logging out and logging back in

### Posts not appearing
- Check that `data/posts.json` exists and is readable
- Verify the API routes are working (check server logs)
- Ensure you're not in static export mode (remove `output: 'export'` from next.config.js)

### API routes not working
- Make sure `output: 'export'` is removed from `next.config.js` (required for Hetzner)
- Verify the server is running Node.js (not just serving static files)
- Check that environment variables are set correctly

## GitHub Pages Limitation

**Note:** The admin panel will NOT work on GitHub Pages because it requires API routes and server-side functionality. It will only work when deployed to Hetzner or another Node.js hosting service.

For GitHub Pages, posts must be pre-built into the static site. Consider:
- Building posts into the static export before deploying
- Or waiting until Hetzner deployment to use the admin panel
