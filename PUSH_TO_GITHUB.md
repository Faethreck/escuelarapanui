# Push to GitHub Repository

Follow these steps to push your code to `Faethreck/escuelarapanui`:

## Step 1: Navigate to Project Directory

```bash
cd "/Users/patrick/Desktop/Prinvo/Clients/Escuela Rapa Nui"
```

## Step 2: Initialize Git (if not already done)

```bash
git init
```

## Step 3: Add Remote Repository

```bash
git remote add origin https://github.com/Faethreck/escuelarapanui.git
```

Or if the remote already exists with a different URL:

```bash
git remote set-url origin https://github.com/Faethreck/escuelarapanui.git
```

## Step 4: Stage All Files

```bash
git add .
```

Or add specific files:

```bash
git add app/ components/ public/ lib/ *.json *.js *.ts *.md *.sh
```

## Step 5: Commit Changes

```bash
git commit -m "Initial commit: Escuela Rapa Nui website"
```

## Step 6: Create Repository on GitHub (if not exists)

1. Go to https://github.com/new
2. Repository name: `escuelarapanui`
3. Make it **Public** or **Private** (your choice)
4. **Don't** initialize with README, .gitignore, or license
5. Click "Create repository"

## Step 7: Push to GitHub

```bash
# Push to main branch
git branch -M main
git push -u origin main
```

Or if you prefer `master`:

```bash
git branch -M master
git push -u origin master
```

## Alternative: Using SSH (if you have SSH keys set up)

```bash
git remote set-url origin git@github.com:Faethreck/escuelarapanui.git
git push -u origin main
```

## Troubleshooting

**If you get "repository not found" error:**
- Make sure the repository exists on GitHub
- Check that you have access to the Faethreck organization/account
- Verify the repository name is exactly `escuelarapanui`

**If you get permission denied:**
- Make sure you're authenticated: `gh auth login` (if using GitHub CLI)
- Or use a Personal Access Token instead of password

**If you get "remote origin already exists":**
```bash
git remote remove origin
git remote add origin https://github.com/Faethreck/escuelarapanui.git
```

## Quick One-Liner (if everything is set up)

```bash
cd "/Users/patrick/Desktop/Prinvo/Clients/Escuela Rapa Nui" && \
git init && \
git remote add origin https://github.com/Faethreck/escuelarapanui.git && \
git add . && \
git commit -m "Initial commit: Escuela Rapa Nui website" && \
git branch -M main && \
git push -u origin main
```
