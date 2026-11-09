import { useEffect } from 'react'
import { MapContainer, Marker, Polyline, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'

const storeIcon = L.divIcon({
  className: 'store-pin-wrap',
  html: '<span class="store-pin"><span></span></span>',
  iconSize: [36, 44],
  iconAnchor: [18, 38],
})

const selectedStoreIcon = L.divIcon({
  className: 'store-pin-wrap selected-pin-wrap',
  html: '<span class="store-pin selected-pin"><span></span></span>',
  iconSize: [42, 50],
  iconAnchor: [21, 44],
})

const userIcon = L.divIcon({
  className: 'user-pin-wrap',
  html: '<span class="user-pin"><span></span></span>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

function MapFocus({ selectedStore, userLocation }) {
  const map = useMap()

  useEffect(() => {
    if (userLocation && selectedStore) {
      map.fitBounds(
        [userLocation, [selectedStore.lat, selectedStore.lng]],
        { padding: [70, 70], maxZoom: 14, animate: true },
      )
    } else if (selectedStore) {
      map.flyTo([selectedStore.lat, selectedStore.lng], Math.max(map.getZoom(), 13), { duration: 0.8 })
    } else if (userLocation) {
      map.flyTo([userLocation.lat, userLocation.lng], 13, { duration: 0.8 })
    }
  }, [map, selectedStore, userLocation])

  return null
}

export default function MapView({ stores, selectedStore, onSelectStore, userLocation }) {
  const routePoints = userLocation && selectedStore
    ? [userLocation, [selectedStore.lat, selectedStore.lng]]
    : null

  return (
    <div className="map-canvas" id="map">
      <MapContainer
        center={[28.6139, 77.209]}
        zoom={13}
        scrollWheelZoom
        zoomControl
        className="leaflet-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapFocus selectedStore={selectedStore} userLocation={userLocation} />
        {stores.map((store) => (
          <Marker
            key={store.id}
            position={[store.lat, store.lng]}
            icon={selectedStore?.id === store.id ? selectedStoreIcon : storeIcon}
            eventHandlers={{ click: () => onSelectStore(store) }}
            title={store.name}
            alt={store.name}
          />
        ))}
        {userLocation && <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon} title="Your location" />}
        {routePoints && (
          <Polyline
            positions={routePoints}
            pathOptions={{ color: '#417665', weight: 3, dashArray: '7 9', opacity: 0.8 }}
          />
        )}
      </MapContainer>
      <div className="map-legend"><span className="legend-pin" /> Store location <span className="legend-user" /> You are here</div>
    </div>
  )
}
