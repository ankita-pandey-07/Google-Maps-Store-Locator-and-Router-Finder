import { Search, X } from 'lucide-react'

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <label className="search-field">
      <Search size={18} aria-hidden="true" />
      <input
        type="search"
        placeholder="Search by store or area"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        aria-label="Search stores by name or area"
      />
      {searchTerm && (
        <button type="button" onClick={() => setSearchTerm('')} aria-label="Clear search">
          <X size={16} />
        </button>
      )}
    </label>
  )
}
