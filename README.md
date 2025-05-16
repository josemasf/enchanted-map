# [Enchanted Map](https://enchanted-map.com/)

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## :pencil: About the project

Enchanted Map is an interactive web application that brings the magical history and legends of Córdoba to life. The project combines historical locations, cultural heritage, and local legends into an engaging digital experience. Users can explore iconic landmarks like the Mosque-Cathedral, Alcázar, and Jewish Quarter through an interactive map interface, discovering the rich stories and legends associated with each location.

## :building_construction: Architecture

This project is built with modern web technologies and follows a component-based architecture:

### Core Technologies
- **Vue 3** (v3.4) - Progressive JavaScript framework with Composition API
- **TypeScript** (v5.5) - For type safety and better developer experience
- **Vite** (v5.4) - Next generation frontend tooling

### Key Dependencies
- **Pinia** (v2.3) - State management for Vue applications
- **Vue Router** (v4.2) - Official router for Vue.js
- **Vuetify** (v3.5) - Material Design component framework
- **SASS** - For custom styling solutions

### Map Technologies
- **Leaflet** (v1.9) - Interactive map library
- **MapTiler SDK** (v1.2) - Map styling and tiles
- **Leaflet Locate Control** - User location features

### Authentication
- **Clerk** - User authentication and management

### Project Structure

```
src/
├── assets/           # Static assets
├── components/       # Reusable Vue components
│   ├── layout/      # Layout components (AppHeader, AppFooter)
│   ├── location/    # Location-related components (LocationCard)
│   └── map/         # Map components (MapComponent, MiniMapComponent)
├── views/           # Page components│   
├── router/          # Route configurations
├── stores/          # Pinia stores (auth, locations)
├── services/        # Business logic (locationService, mapService)
├── types/          # TypeScript type definitions
└── styles/         # Global SCSS styles

public/
├── data/           # JSON data files
│   ├── locations.json     # Location information
│   └── stories/          # Location stories
├── markers/        # Map marker assets
└── _redirects      # Netlify redirects configuration
```

## :rocket: Getting Started

### Prerequisites

- Node.js (v14 or higher)
- pnpm package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/enchanted-map.git
cd enchanted-map
```

2. Install dependencies
```bash
pnpm install
```

3. Start the development server
```bash
pnpm dev
```

## :sparkles: Authors

[José María Santos](https://josemariasantos.com/)

## :page_with_curl: License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License - see the LICENSE.md file for details.
