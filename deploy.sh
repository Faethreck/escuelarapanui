#!/bin/bash

# Deployment script for Escuela Rapa Nui Website
# Usage: ./deploy.sh [server-user@server-ip] [server-path]

set -e

echo "🚀 Starting deployment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if server details provided
if [ -z "$1" ] || [ -z "$2" ]; then
    echo -e "${YELLOW}Usage: ./deploy.sh user@server.com /path/to/website${NC}"
    echo "Or run locally: npm run build && npm start"
    exit 1
fi

SERVER=$1
SERVER_PATH=$2

echo -e "${GREEN}Step 1: Building production version...${NC}"
npm run build

echo -e "${GREEN}Step 2: Creating deployment package...${NC}"
tar -czf deploy.tar.gz \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='.git' \
    --exclude='deploy.tar.gz' \
    --exclude='.DS_Store' \
    .

echo -e "${GREEN}Step 3: Transferring files to server...${NC}"
scp deploy.tar.gz $SERVER:$SERVER_PATH/

echo -e "${GREEN}Step 4: Extracting and installing on server...${NC}"
ssh $SERVER << EOF
    cd $SERVER_PATH
    tar -xzf deploy.tar.gz
    npm install --production
    npm run build
    pm2 restart escuela-rapa-nui || pm2 start npm --name "escuela-rapa-nui" -- start
    rm deploy.tar.gz
EOF

echo -e "${GREEN}Step 5: Cleaning up...${NC}"
rm deploy.tar.gz

echo -e "${GREEN}✅ Deployment complete!${NC}"
