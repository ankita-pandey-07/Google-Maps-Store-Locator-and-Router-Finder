# Pinpoint Store Locator

A responsive React store locator for Delhi NCR. Search and sort locations, select them on the map, use your current location, and open turn-by-turn directions in Google Maps.

## Run locally

```sh
npm install
npm run dev
```

## Map and directions

The in-app map uses OpenStreetMap tiles via Leaflet, so it does not need a Google Maps API key. The directions buttons open Google Maps with the selected store as the destination. Store locations in `src/data/stores.js` are sample data and can be replaced with real locations.

## Build and lint

```sh
npm run build
npm run lint
```
