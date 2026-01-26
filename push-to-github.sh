#!/bin/bash

# Script to push Escuela Rapa Nui website to GitHub
# Run this from the project root directory

set -e

echo "🚀 Preparing to push to GitHub..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

REPO_URL="https://github.com/Faethreck/escuelarapanui.git"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found. Please run this script from the project root.${NC}"
    exit 1
fi

# Initialize git if needed
if [ ! -d ".git" ]; then
    echo -e "${GREEN}Initializing git repository...${NC}"
    git init
fi

# Add remote (remove if exists, then add)
if git remote get-url origin &>/dev/null; then
    echo -e "${YELLOW}Updating remote URL...${NC}"
    git remote set-url origin $REPO_URL
else
    echo -e "${GREEN}Adding remote repository...${NC}"
    git remote add origin $REPO_URL
fi

# Stage all files
echo -e "${GREEN}Staging files...${NC}"
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo -e "${YELLOW}No changes to commit.${NC}"
else
    # Commit
    echo -e "${GREEN}Committing changes...${NC}"
    git commit -m "Initial commit: Escuela Rapa Nui website with Next.js, Tailwind CSS, and shadcn/ui"
fi

# Set default branch to main
git branch -M main 2>/dev/null || true

# Push
echo -e "${GREEN}Pushing to GitHub...${NC}"
echo -e "${YELLOW}If this is the first push, you may need to authenticate.${NC}"
git push -u origin main || {
    echo -e "${RED}Push failed. Common issues:${NC}"
    echo "1. Repository doesn't exist on GitHub - create it first at https://github.com/new"
    echo "2. Authentication required - use: gh auth login or set up SSH keys"
    echo "3. Permission denied - check repository access"
    exit 1
}

echo -e "${GREEN}✅ Successfully pushed to GitHub!${NC}"
echo -e "Repository: ${YELLOW}$REPO_URL${NC}"
