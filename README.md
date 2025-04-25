# Jeremy Mastering Website

This repository contains the source code for [jeremymastering.com](https://jeremymastering.com), a professional audio mastering service website.

## 🚀 Optimized Development Workflow

This project uses several optimizations to avoid downloading large media files during development:

### Option 1: Lightweight Development (Recommended)

1. Clone the repository without downloading large media files:
   ```bash
   git clone https://github.com/SaltSour/jeremymastering-website.git
   cd jeremymastering-website
   bash scripts/setup.sh
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. In a separate terminal, start the media proxy to serve images from production:
   ```bash
   docker-compose up media-proxy
   ```

This setup will:
- Create placeholder directories locally
- Use a proxy to fetch media files from production only when needed
- Cache downloaded media files locally

### Option 2: Docker Development Environment

For a fully containerized development experience:

```bash
git clone https://github.com/SaltSour/jeremymastering-website.git
cd jeremymastering-website
docker-compose up
```

This creates two containers:
- A Next.js development server (with hot reloading)
- A media proxy for images and videos

## 🛠️ Development Scripts

```bash
# Start development server
npm run dev

# Clean development cache (faster than full reinstall)
npm run dev:clean

# Analyze bundle size during development
npm run dev:analyze

# Build for production
npm run build

# Start production server
npm start

# Clean build cache
npm run clean

# Full clean (including node_modules)
npm run clean:full
```

## 💾 Media File Handling

Large media files are excluded from Git to keep the repository small:
- Images are not tracked in Git (see .gitignore)
- Media files are served from the production site during development
- When needed, you can manually add specific media files to your local /public directory

## 📂 Project Structure

- **app/**: Next.js application code
- **components/**: Reusable React components
- **data/**: Data files including project information
- **public/**: Static assets (images, fonts, etc.)
- **scripts/**: Utility scripts for development

## 🚢 Deployment

The website is deployed on a custom hosting solution. The deployment process involves:

1. Building the application with `npm run build`
2. Starting the server with `npm start`

## 📄 License

All rights reserved. This code is proprietary and not licensed for public use.