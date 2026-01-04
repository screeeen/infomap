# Infomap

**Infomap** is a **web-based geospatial visualization tool** built with **React, TypeScript, Vite, and Carto**. It allows you to visualize large-scale geographic and network data interactively, rendering points, lines, and polygons on a high-performance WebGL map. Think of it as a **digital cartography platform** for your datasets, where clusters, layers, and spatial relationships are immediately visible.

Carto enables smooth, GPU-accelerated rendering, making it possible to explore tens of thousands of points and connections in real-time.

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Running the Project](#running-the-project)
4. [Available Scripts](#available-scripts)
5. [Project Structure](#project-structure)
6. [Directory Overview](#directory-overview)
7. [Notes](#notes)

---

## Overview

This project leverages **Deck.gl layers** to display geospatial and network data visually:

- **ScatterplotLayer** – Render points on a map (nodes, events, locations)
- **LineLayer** – Show connections or flows between points

Key technologies:

- **React** – Component-based UI
- **TypeScript** – Static type safety
- **Vite** – Fast development and build tool
- **Deck.gl** – High-performance WebGL visualization library
- **Mapbox-gl ** – For map basemaps

---

## Prerequisites

Make sure you have:

- **Node.js** v16+
- **npm** or **Yarn**
- env vars
  -VITE_API_PROJECT_ID
  -VITE_API_ACCESS_TOKEN
  -VITE_API_BASE_URL
  -VITE_CONNECTION_NAME

---

## Running the Project

Clone the repository:

```bash
git clone https://github.com/screeeen/infomap.git
cd infomap
```

Install dependencies:

```
npm install
# or
yarn install
```

Start the dev server:

```
npm run dev
# or
yarn dev
```

Open browser at:

```
http://localhost:5173

```

## Available Scripts

| Script  | Description                                 |
| ------- | ------------------------------------------- |
| dev     | Start development server with hot-reloading |
| build   | Compile production-ready files              |
| preview | Preview the production build locally        |
| lint    | Run ESLint for code quality                 |
| format  | Format code using Prettier                  |
| test    | Run tests (if configured)                   |

# Project Structure

```
infomap/
├─ src/
│  ├─ cartoConfig/          # Carto config and credentials
│  ├─ constants/            # Map Layers config and UI initial states
│  ├─ layerContext/         # React Context providing states and functions
│  ├─ test/                 # Test setup files
│  ├─ types/                # Files with common types used in the app
│  ├─ UI/                   # UI components used in the Map layers editor, logic and UI
│  ├─ utils/                # Helper functions for data processing
│  ├─ App.tsx               # Main app component with providers
│  ├─ CartoMap.tsx          # Component with Deck.gl map
│  ├─ CartoMap.test.tsx     # Always good to run a test or two!
│  └─ main.tsx              # Vite entry point
├─ index.html               # Base HTML template
├─ package.json             # Dependencies and scripts
├─ vite.config.js           # Vite configuration
├─ tsconfig.json            # TypeScript configuration
├─ .prettierrc              # Prettier configuration
└─ eslint.config.js         # ESLint configuration
```

## Directory Overview

**src/** - Main source directory containing all application code

- **cartoConfig/** - Carto configuration and credentials
- **constants/** - Map layer configurations and UI initial states
- **layerContext/** - React Context for state management and shared functions
- **test/** - Test setup files
- **types/** - Common TypeScript type definitions
- **UI/** - UI components for the map layers editor
- **utils/** - Helper functions for data processing

**Configuration Files** - Project configuration at the root level

## Notes

- There is a initial state `constants.ts` and config of each layer for the maps.
- Each layer has its own loader depending on the data type of the map (table, tileset)
- Loader dataSource function can be found at `utils.ts`, it could be done with a custom hook keeping loading and error states. Left it this way for simplicity.
- Both layers can be seen together, this increases somehow complexity on state
- Some types can be refactored and grouped for clarity and security
- There are tests for `CartoMap.test.tsx`, `MapSelector.test.tsx`,`Fill.test.tsx` as examples.
- There is a combination of library components from Carto mixed with material. I followed the carto storybook as an example.
- Columns display are handled via context, thus providing common ground from the UI components that sets interaction and style to the viewState.

# What can be improved:

- UI should keep its state for each layer (table,tileset), thats not finished.
- Domains for columns can be configurable and dynamic based on min and max
- Widget would need a redux store? Somehow got confused with versions, tried to pass `widgetSource` from dataSource but didn't work. Tried to extranct the info and run `getFormula` but couldn't manage to run it. I would need more time and maybe some tips ;-) to get them running!
- Overall architecture is a little mess, and types too... that can be more straight and simplified. Also UI is super sketchy, (too many casts!) It can be improved by keeping the state of each color in a sublevel and not in the main context. I believe it would improve performance too.
- https://github.com/screeeen/infomap/blob/master/src/utils/utils.ts#L54 I didn't see it coming... sorry!
- Storybook and carto UI latest didn't match some components are not exported! I used `3.1.0-alpha.16` seems latest.
- Tried to run typescript base-3 template but had a little confusion with the dependecies and node too. Had to ditch the idea
- Overall I would like to optimize it and understand better the application

# AI chats

Most relevant conversations

- Boilerplate: https://chatgpt.com/share/695ad14b-1754-8007-bdf9-1a7a6dca7c20
- Tooltip: https://chatgpt.com/share/695ad117-a608-8007-b555-11b37941b37f
- Styles: https://chatgpt.com/share/695ad0f5-8a4c-8007-98ce-2a4d988f627a
- Widget: https://chatgpt.com/share/695ad0ad-2d94-8007-95e1-1660d39f7b3e
- Widget Claude: https://claude.ai/share/ad9e29a0-3cda-4c8a-8fe1-54b5e26e669a
