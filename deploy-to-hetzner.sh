#!/bin/bash

# Deployment script for Hetzner server
# Usage: ./deploy-to-hetzner.sh user@server-ip

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

if [ -z "$1" ]; then
    echo -e "${RED}Usage: ./deploy-to-hetzner.sh user@server-ip${NC}"
    echo "Example: ./deploy-to-hetzner.sh root@123.456.789.0"
    exit 1
fi

SERVER=$1
SERVER_PATH="/var/www/escuela-rapa-nui"

echo -e "${GREEN}🚀 Starting deployment to Hetzner server...${NC}"

# Step 1: Build locally
echo -e "${GREEN}Step 1: Building production version...${NC}"
npm run build

# Step 2: Create deployment package
echo -e "${GREEN}Step 2: Creating deployment package...${NC}"
tar -czf deploy.tar.gz \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='.git' \
    --exclude='deploy.tar.gz' \
    --exclude='.DS_Store' \
    --exclude='*.log' \
    .

# Step 3: Transfer to server
echo -e "${GREEN}Step 3: Transferring files to server...${NC}"
scp deploy.tar.gz $SERVER:/tmp/

# Step 4: Extract and setup on server
echo -e "${GREEN}Step 4: Setting up on server...${NC}"
ssh $SERVER << 'ENDSSH'
    set -e
    
    # Create directory if it doesn't exist
    mkdir -p /var/www/escuela-rapa-nui
    cd /var/www/escuela-rapa-nui
    
    # Backup current version if exists
    if [ -d ".next" ]; then
        echo "Backing up current version..."
        tar -czf ../escuela-rapa-nui-backup-$(date +%Y%m%d-%H%M%S).tar.gz .
    fi
    
    # Extract new version
    echo "Extracting new version..."
    tar -xzf /tmp/deploy.tar.gz -C /var/www/escuela-rapa-nui
    
    # Install dependencies
    echo "Installing dependencies..."
    npm install --production
    
    # Build on server (to ensure compatibility)
    echo "Building application..."
    npm run build
    
    # Restart PM2 or start if not running
    echo "Restarting application..."
    if pm2 list | grep -q "escuela-rapa-nui"; then
        pm2 restart escuela-rapa-nui
    else
        PORT=3001 pm2 start npm --name "escuela-rapa-nui" -- start
        pm2 save
    fi
    
    # Cleanup
    rm /tmp/deploy.tar.gz
    
    echo "✅ Deployment complete on server!"
ENDSSH

# Step 5: Cleanup local files
echo -e "${GREEN}Step 5: Cleaning up...${NC}"
rm deploy.tar.gz

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Check PM2 status: ssh $SERVER 'pm2 status'"
echo "2. Check logs: ssh $SERVER 'pm2 logs escuela-rapa-nui'"
echo "3. Configure Nginx (see HETZNER_DEPLOYMENT.md)"
echo "4. Setup SSL: ssh $SERVER 'sudo certbot --nginx -d your-domain.com'"
