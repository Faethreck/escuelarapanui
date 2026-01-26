# Deploying Escuela Rapa Nui on Hetzner Server (Same Server as prinvo.net)

This guide will help you deploy the Escuela Rapa Nui website on the same Hetzner server where prinvo.net is already running.

## Prerequisites

- SSH access to your Hetzner server
- Root or sudo access
- Nginx already configured (since prinvo.net is working)
- Node.js 18+ installed

---

## Step 1: Connect to Your Server

```bash
ssh root@your-hetzner-server-ip
# or
ssh your-user@your-hetzner-server-ip
```

---

## Step 2: Create Directory for the New Website

```bash
# Navigate to your web directory (adjust path based on your setup)
cd /var/www
# or wherever you keep your websites
# cd /home/your-user/websites

# Create directory for escuela-rapa-nui
mkdir -p escuela-rapa-nui
cd escuela-rapa-nui
```

---

## Step 3: Transfer Your Code to Server

**Option A: Using Git (Recommended)**

```bash
# On your server
cd /var/www/escuela-rapa-nui
git clone your-repository-url .
# or if you already have it locally, push to a repo first
```

**Option B: Using SCP from Your Local Machine**

```bash
# From your local machine
cd /path/to/Escuela-Rapa-Nui
scp -r . root@your-server-ip:/var/www/escuela-rapa-nui/
```

**Option C: Using rsync (Most Efficient)**

```bash
# From your local machine
rsync -avz --exclude 'node_modules' --exclude '.next' --exclude '.git' \
  ./ root@your-server-ip:/var/www/escuela-rapa-nui/
```

---

## Step 4: Install Dependencies and Build

```bash
# On your server
cd /var/www/escuela-rapa-nui

# Install dependencies
npm install

# Build the production version
npm run build
```

---

## Step 5: Setup PM2 Process

Since you likely already have PM2 running for prinvo.net, we'll add this as a new PM2 process:

```bash
# Start the new application on a different port (e.g., 3001)
PORT=3001 pm2 start npm --name "escuela-rapa-nui" -- start

# Or create an ecosystem file for better management
```

**Create PM2 Ecosystem File** (Recommended):

Create `/var/www/escuela-rapa-nui/ecosystem.config.js`:

```javascript
module.exports = {
  apps: [
    {
      name: 'escuela-rapa-nui',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/escuela-rapa-nui',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      error_file: '/var/log/escuela-rapa-nui-error.log',
      out_file: '/var/log/escuela-rapa-nui-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_memory_restart: '1G',
    }
  ]
};
```

Then start with:
```bash
pm2 start ecosystem.config.js
pm2 save
```

---

## Step 6: Configure Nginx

You'll need to add a new server block for the Escuela Rapa Nui website.

**Option A: Separate Domain (e.g., escuelarapanui.cl)**

```bash
sudo nano /etc/nginx/sites-available/escuela-rapa-nui
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name escuelarapanui.cl www.escuelarapanui.cl;

    location / {
        proxy_pass http://localhost:3001;
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
sudo systemctl reload nginx
```

**Option B: Subdomain (e.g., escuela.prinvo.net)**

If you want to use a subdomain of your existing domain:

```nginx
server {
    listen 80;
    server_name escuela.prinvo.net;

    location / {
        proxy_pass http://localhost:3001;
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

**Option C: Subdirectory (e.g., prinvo.net/escuela)**

If you want to serve it as a subdirectory (requires Next.js basePath config):

Update `next.config.js`:
```javascript
const nextConfig = {
  reactStrictMode: true,
  basePath: '/escuela', // Add this
  images: {
    remotePatterns: [
      // ... existing config
    ],
  },
}
```

Nginx config:
```nginx
location /escuela {
    proxy_pass http://localhost:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

---

## Step 7: Setup SSL Certificate (Let's Encrypt)

If using a separate domain or subdomain:

```bash
sudo certbot --nginx -d escuelarapanui.cl -d www.escuelarapanui.cl
# or
sudo certbot --nginx -d escuela.prinvo.net
```

Certbot will automatically update your Nginx configuration to use HTTPS.

---

## Step 8: Verify Everything Works

```bash
# Check PM2 status
pm2 status

# Check PM2 logs
pm2 logs escuela-rapa-nui

# Check Nginx status
sudo systemctl status nginx

# Test the application
curl http://localhost:3001
```

---

## Step 9: Update DNS (if using separate domain)

If you're using a separate domain (escuelarapanui.cl):

1. Go to your domain registrar
2. Add an A record pointing to your Hetzner server IP:
   - Type: A
   - Name: @ (or escuelarapanui)
   - Value: your-hetzner-server-ip
   - TTL: 3600

3. Add CNAME for www:
   - Type: CNAME
   - Name: www
   - Value: escuelarapanui.cl
   - TTL: 3600

---

## Quick Deployment Script

Create a script to automate future deployments:

```bash
# Create deploy script
nano /var/www/escuela-rapa-nui/deploy.sh
```

Add this content:

```bash
#!/bin/bash
set -e

echo "🚀 Deploying Escuela Rapa Nui..."

cd /var/www/escuela-rapa-nui

# Pull latest changes (if using Git)
# git pull origin main

# Install dependencies
npm install

# Build
npm run build

# Restart PM2
pm2 restart escuela-rapa-nui

echo "✅ Deployment complete!"
```

Make it executable:
```bash
chmod +x /var/www/escuela-rapa-nui/deploy.sh
```

Then for future deployments, just run:
```bash
/var/www/escuela-rapa-nui/deploy.sh
```

---

## Managing Both Applications

**View all PM2 processes:**
```bash
pm2 list
```

**Restart both applications:**
```bash
pm2 restart all
# or individually
pm2 restart prinvo-net
pm2 restart escuela-rapa-nui
```

**View logs:**
```bash
pm2 logs prinvo-net
pm2 logs escuela-rapa-nui
pm2 logs  # All logs
```

**Monitor resources:**
```bash
pm2 monit
```

---

## Troubleshooting

**Port conflict:**
- Make sure each app uses a different port
- Check what ports are in use: `sudo netstat -tulpn | grep LISTEN`
- Update PORT in ecosystem.config.js if needed

**Nginx 502 Bad Gateway:**
- Check if the app is running: `pm2 status`
- Check if the port is correct: `curl http://localhost:3001`
- Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`

**Build fails:**
- Check Node.js version: `node --version` (should be 18+)
- Clear cache: `rm -rf .next node_modules && npm install`
- Check disk space: `df -h`

**Permission issues:**
- Make sure files are owned correctly: `sudo chown -R $USER:$USER /var/www/escuela-rapa-nui`
- Check Nginx user permissions

---

## Summary

Your server setup should look like this:

```
Hetzner Server
├── prinvo.net (Port 3000)
│   └── PM2: prinvo-net
│   └── Nginx: prinvo.net → localhost:3000
│
└── escuela-rapa-nui (Port 3001)
    └── PM2: escuela-rapa-nui
    └── Nginx: escuelarapanui.cl → localhost:3001
```

Both applications run independently and can be managed separately with PM2.
