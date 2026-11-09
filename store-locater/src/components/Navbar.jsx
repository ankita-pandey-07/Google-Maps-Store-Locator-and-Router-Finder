import { MapPin, Menu } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="site-header flex items-center">
      <a className="brand inline-flex items-center" href="#" aria-label="Pinpoint home">
        <span className="brand-mark"><MapPin size={20} fill="currentColor" /></span>
        <span>pinpoint<span className="brand-period">.</span></span>
      </a>
      <nav className="header-nav" aria-label="Main navigation">
        <a className="nav-active" href="#stores">Find a store</a>
        <a href="#map">Our locations</a>
      </nav>
      <a className="header-contact" href="mailto:hello@pinpoint.example">Need help? <span>Contact us</span></a>
      <button className="mobile-menu" type="button" aria-label="Open menu"><Menu size={21} /></button>
    </header>
  )
}
