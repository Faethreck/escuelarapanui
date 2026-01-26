# Deployment Guide - Escuela Rapa Nui Website

This guide covers different deployment options for your Next.js website.

## Prerequisites

- Node.js 18+ installed on your server
- npm or yarn package manager
- Git (if deploying from repository)

---

## Option 1: Deploy to Vercel (Recommended - Easiest)

Vercel is the company behind Next.js and offers the easiest deployment:

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to [vercel.com](https://vercel.com)** and sign up/login

3. **Import your repository**
   - Click "New Project"
   - Import your Git repository
   - Vercel will auto-detect Next.js settings

4. **Deploy**
   - Click "Deploy"
   - Your site will be live in minutes with a free domain (yourproject.vercel.app)

**Pros:** Free tier, automatic deployments, CDN, SSL certificates included
**Cons:** Limited server-side control

---

## Option 2: Self-Hosted Server (Full Control)

### Step 1: Build the Production Version

On your local machine or server:

```bash
# Install dependencies
npm install

# Build the production version
npm run build
```

This creates an optimized production build in the `.next` folder.

### Step 2: Transfer Files to Server

You have several options:

**Option A: Using SCP/SFTP**
```bash
# Transfer the entire project
scp -r . user@your-server.com:/path/to/website/

# Or use rsync (more efficient)
rsync -avz --exclude 'node_modules' --exclude '.next' . user@your-server.com:/path/to/website/
```

**Option B: Using Git**
```bash
# On your server
git clone your-repository-url
cd escuela-rapa-nui-website
npm install
npm run build
```

### Step 3: Install Dependencies on Server

```bash
# SSH into your server
ssh user@your-server.com

# Navigate to project directory
cd /path/to/website

# Install dependencies
npm install --production
```

### Step 4: Run the Production Server

**Option A: Using PM2 (Recommended for production)**

```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start npm --name "escuela-rapa-nui" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on server reboot
pm2 startup
```

**Option B: Using systemd (Linux)**

Create a service file `/etc/systemd/system/escuela-rapa-nui.service`:

```ini
[Unit]
Description=Escuela Rapa Nui Next.js App
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/website
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
```

Then:
```bash
sudo systemctl daemon-reload
sudo systemctl enable escuela-rapa-nui
sudo systemctl start escuela-rapa-nui
```

**Option C: Direct npm start (Not recommended for production)**
```bash
npm start
```

### Step 5: Setup Reverse Proxy (Nginx)

If you want to use a domain name and port 80/443, setup Nginx:

```bash
sudo apt-get install nginx
```

Create `/etc/nginx/sites-available/escuela-rapa-nui`:

```nginx
server {
    listen 80;
    server_name escuelarapanui.cl www.escuelarapanui.cl;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/escuela-rapa-nui /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 6: Setup SSL Certificate (Let's Encrypt)

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d escuelarapanui.cl -d www.escuelarapanui.cl
```

---

## Option 3: Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

Update `next.config.js` to enable standalone output:

```javascript
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Add this
  images: {
    remotePatterns: [
      // ... existing config
    ],
  },
}
```

Build and run:
```bash
docker build -t escuela-rapa-nui .
docker run -p 3000:3000 escuela-rapa-nui
```

---

## Environment Variables (if needed)

If you need environment variables, create a `.env.production` file:

```bash
# .env.production
NODE_ENV=production
PORT=3000
```

Then update your start script or PM2 config to use it.

---

## Quick Deployment Checklist

- [ ] Code is committed and pushed to repository
- [ ] Dependencies installed (`npm install`)
- [ ] Production build created (`npm run build`)
- [ ] Server has Node.js 18+ installed
- [ ] Application is running (PM2/systemd/Docker)
- [ ] Reverse proxy configured (Nginx/Apache)
- [ ] SSL certificate installed (Let's Encrypt)
- [ ] Domain DNS points to server IP
- [ ] Firewall allows ports 80, 443, and 3000

---

## Troubleshooting

**Port already in use:**
```bash
# Find process using port 3000
lsof -i :3000
# Kill the process
kill -9 <PID>
```

**Build fails:**
- Check Node.js version: `node --version` (should be 18+)
- Clear cache: `rm -rf .next node_modules && npm install`

**Application won't start:**
- Check logs: `pm2 logs` or `journalctl -u escuela-rapa-nui`
- Verify build completed: `ls -la .next`

**Nginx 502 Bad Gateway:**
- Check if Next.js app is running: `curl http://localhost:3000`
- Verify Nginx proxy_pass points to correct port

---

## Recommended Server Specifications

- **CPU:** 1-2 cores minimum
- **RAM:** 512MB - 1GB minimum (2GB recommended)
- **Storage:** 10GB minimum
- **OS:** Ubuntu 20.04+ or Debian 11+

---

## Need Help?

- Next.js Deployment: https://nextjs.org/docs/deployment
- PM2 Documentation: https://pm2.keymetrics.io/
- Nginx Documentation: https://nginx.org/en/docs/
