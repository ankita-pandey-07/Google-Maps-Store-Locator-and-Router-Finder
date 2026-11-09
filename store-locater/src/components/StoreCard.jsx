import { ArrowUpRight, Clock3, MapPin, Navigation, Phone } from 'lucide-react'

export default function StoreCard({ store, distance, isSelected, onSelect, onGetDirections, index }) {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`

  return (
    <article
      className={`store-card${isSelected ? ' selected' : ''}`}
      style={{ '--card-index': index }}
    >
      <button type="button" className="store-card-main" onClick={onSelect} aria-pressed={isSelected}>
        <span className="store-marker">{String(index + 1).padStart(2, '0')}</span>
        <span className="store-copy">
          <span className="store-card-heading">
            <strong>{store.name}</strong>
            <ArrowUpRight size={15} />
          </span>
          <span className="store-address"><MapPin size={13} /> {store.address}</span>
          <span className="store-meta">
            <span className="open-label"><span /> Open today</span>
            <span className="distance-label">{distance < 1 ? `${Math.round(distance * 1000)} m` : `${distance.toFixed(1)} km`} away</span>
          </span>
        </span>
      </button>
      <div className="store-card-actions">
        <span><Clock3 size={13} /> {store.hours}</span>
        <a href={`tel:${store.phone.replace(/[^\d+]/g, '')}`} aria-label={`Call ${store.name}`}>
          <Phone size={14} /> {store.phone}
        </a>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noreferrer"
          onClick={onGetDirections}
          className="card-directions"
        >
          <Navigation size={14} /> Directions
        </a>
      </div>
    </article>
  )
}
