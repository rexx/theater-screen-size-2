# Cinema Screen War (台灣最大影廳銀幕比一比)

A React application to visually compare cinema screen sizes in Taiwan.

## Features

- **Visual Comparison**: Interactive SVG overlay of different screen sizes.
- **Data Table**: Comprehensive list of screens with dimensions and area.
- **Regional Filtering**: Filter screens by region (North, Central, South, East, Historical).
- **Responsive Design**: Mobile-friendly layout with a detailed sidebar on desktop.

## Development

This project uses Vite + React + TypeScript.

### Prerequisites

- Node.js (v18 or later recommended)

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production

```bash
npm run build
```

The output will be in the `dist` folder.

## Deployment

This project is configured to deploy to GitHub Pages automatically via GitHub Actions.

**Important:** You must enable GitHub Pages in your repository settings:
1. Go to **Settings** > **Pages**.
2. Under **Source**, select **GitHub Actions**.
