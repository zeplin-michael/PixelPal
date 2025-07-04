# Project Structure

[⬅ Back to Main Docs](./FRONTEND_DOCS.md)

```
PixelPal/frontend/
  ├── public/                # Static assets (images, audio, favicon, etc.)
  ├── src/
  │   ├── api/               # Contexts and custom hooks for API/state
  │   ├── auth/              # Authentication components and styles
  │   ├── layout/            # Layout and navigation components
  │   ├── pages/             # Main app pages and page-level components
  │   │   ├── ProfilePage/   # Profile page and all related subcomponents
  │   │   ├── game-page/     # Game interaction components (feed, play, etc.)
  │   │   ├── deathscreen/   # Death screen for dead pets
  │   │   ├── utils/         # Utility functions (e.g., avatar image mapping)
  │   ├── index.css          # Global styles
  │   ├── main.jsx           # App entry point
  ├── index.html             # HTML entry point
  ├── package.json           # Project dependencies and scripts
  └── ...                    # Other config files
```

---
