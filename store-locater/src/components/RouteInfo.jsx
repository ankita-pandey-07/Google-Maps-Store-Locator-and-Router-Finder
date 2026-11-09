import { ArrowRight, Clock3, ExternalLink, MapPin, Navigation } from 'lucide-react'

export default function RouteInfo({ store, origin, distance }) {
  if (!store) return null

  const originText = origin ? `${origin.lat},${origin.lng}` : 'New Delhi'
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(originText)}&destination=${store.lat},${store.lng}`
  const duration = Math.max(4, Math.round((distance ?? 0) / 22 * 60))

  return (
    <aside className="route-info">
      <div className="route-details">
        <div className="route-badge"><Navigation size={17} /></div>
        <div className="route-copy">
          <span className="route-label">YOUR SELECTED STORE</span>
          <strong>{store.name}</strong>
          <span className="route-address"><MapPin size={13} /> {store.address}</span>
        </div>
      </div>
      <div className="route-stats">
        <div><span className="stat-icon"><Navigation size={14} /></span><strong>{distance < 1 ? `${Math.round(distance * 1000)} m` : `${distance.toFixed(1)} km`}</strong><span>approx. distance</span></div>
        <div><span className="stat-icon"><Clock3 size={14} /></span><strong>~{duration} min</strong><span>by car</span></div>
      </div>
      <a className="route-button" href={directionsUrl} target="_blank" rel="noreferrer">
        Get directions <ArrowRight size={16} /><ExternalLink className="external-icon" size={13} />
      </a>
    </aside>
  )
}
