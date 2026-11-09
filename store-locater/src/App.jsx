import { useMemo, useState } from 'react'
import { ArrowDownUp, Crosshair, LocateFixed, Map, SlidersHorizontal } from 'lucide-react'
import MapView from './components/MapView'
import Navbar from './components/Navbar'
import RouteInfo from './components/RouteInfo'
import SearchBar from './components/SearchBar'
import StoreCard from './components/StoreCard'
import { storesData } from './data/stores'
import './App.css'

const defaultLocation = { lat: 28.6139, lng: 77.209 }

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStore, setSelectedStore] = useState(storesData[0])
  const [userLocation, setUserLocation] = useState(null)
  const [locationMessage, setLocationMessage] = useState('')
  const [sortByDistance, setSortByDistance] = useState(false)

  const stores = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    const filtered = storesData.filter((store) =>
      `${store.name} ${store.address} ${store.city}`.toLowerCase().includes(query),
    )
    if (!sortByDistance) return filtered

    const origin = userLocation ?? defaultLocation
    return [...filtered].sort((a, b) => getDistance(origin, a) - getDistance(origin, b))
  }, [searchTerm, sortByDistance, userLocation])
  const activeStore = stores.find((store) => store.id === selectedStore?.id) ?? stores[0] ?? null

  function getCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationMessage('Location is not supported by this browser.')
      return
    }

    setLocationMessage('Finding your location…')
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const location = { lat: coords.latitude, lng: coords.longitude }
        setUserLocation(location)
        setLocationMessage('Showing stores near you')
      },
      () => setLocationMessage('Could not access your location. Check browser permissions.'),
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  return (
    <div className="app-shell min-h-screen">
      <Navbar />

      <main className="workspace">
        <section className="store-panel" id="stores" aria-label="Store directory">
          <div className="panel-heading">
            <div className="eyebrow"><Map size={14} /> FIND A STORE</div>
            <h1>Find your<br />nearest store.</h1>
            <p className="panel-description">Explore our stores and get directions in just a few clicks.</p>
          </div>

          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <div className="list-toolbar">
            <span><strong>{stores.length}</strong> locations</span>
            <button
              type="button"
              className={`text-button${sortByDistance ? ' is-active' : ''}`}
              onClick={() => setSortByDistance((value) => !value)}
              aria-pressed={sortByDistance}
            >
              <ArrowDownUp size={14} /> {sortByDistance ? 'Nearest first' : 'Sort'}
            </button>
          </div>

          {locationMessage && (
            <p className="location-message" role="status">{locationMessage}</p>
          )}

          <div className="store-list">
            {stores.length > 0 ? stores.map((store, index) => (
              <StoreCard
                key={store.id}
                store={store}
                distance={getDistance(userLocation ?? defaultLocation, store)}
                isSelected={activeStore?.id === store.id}
                onSelect={() => setSelectedStore(store)}
                onGetDirections={() => setSelectedStore(store)}
                index={index}
              />
            )) : (
              <div className="empty-state">
                <SlidersHorizontal size={22} />
                <strong>No stores found</strong>
                <span>Try a different store name or area.</span>
              </div>
            )}
          </div>

          <div className="panel-footer">
            <Crosshair size={16} />
            <span>Can’t find a store near you?</span>
            <button type="button" onClick={getCurrentLocation}>Use my location</button>
          </div>
        </section>

        <section className="map-panel" aria-label="Store map">
          <div className="map-topbar">
            <div className="map-title">
              <span className="live-dot" />
              <div>
                <strong>Stores around you</strong>
                <span>{userLocation ? 'Near your current location' : 'New Delhi, India'}</span>
              </div>
            </div>
            <button type="button" className="location-button" onClick={getCurrentLocation}>
              <LocateFixed size={16} /> <span>My location</span>
            </button>
          </div>

          <MapView
            stores={stores}
            selectedStore={activeStore}
            onSelectStore={setSelectedStore}
            userLocation={userLocation}
          />

          <RouteInfo
            store={activeStore}
            origin={userLocation}
            distance={activeStore ? getDistance(userLocation ?? defaultLocation, activeStore) : null}
          />

          <div className="map-attribution">Map data © OpenStreetMap contributors</div>
        </section>
      </main>
    </div>
  )
}

function getDistance(origin, destination) {
  const radians = (degrees) => (degrees * Math.PI) / 180
  const latitudeDifference = radians(destination.lat - origin.lat)
  const longitudeDifference = radians(destination.lng - origin.lng)
  const value = Math.sin(latitudeDifference / 2) ** 2
    + Math.cos(radians(origin.lat))
    * Math.cos(radians(destination.lat))
    * Math.sin(longitudeDifference / 2) ** 2
  return 6371 * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value))
}

export default App
