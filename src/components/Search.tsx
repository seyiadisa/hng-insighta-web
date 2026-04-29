import { useState } from 'react'
import type { FormEvent } from 'react'
import type { PaginatedProfiles } from '../types'
import { searchProfiles } from '../utils/api'
import { emptyProfiles } from '../utils/profileHelpers'
import { ProfileTable } from './ProfileTable'

export function SearchPage() {
  const [query, setQuery] = useState('')
  const [profiles, setProfiles] = useState<PaginatedProfiles>(emptyProfiles)
  const [status, setStatus] = useState('')

  async function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!query.trim()) {
      return
    }

    try {
      setStatus('Searching profiles...')
      const data = await searchProfiles(query.trim())
      setProfiles(data)
      setStatus('')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Search failed')
    }
  }

  return (
    <section className="workspace app-workspace">
      <div className="workspace-intro">
        <p className="eyebrow">Search</p>
        <h1>Ask for the segment you need.</h1>
        <p>Use natural language to search by profile traits, confidence, age, or country.</p>
      </div>
      <form className="search-card" onSubmit={onSearch}>
        <label htmlFor="profile-search">Natural language query</label>
        <div className="search-row">
          <input
            id="profile-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="e.g. women under 35 from Nigeria with high confidence"
          />
          <button type="submit">Search</button>
        </div>
      </form>
      {status ? <p className="status-line">{status}</p> : null}
      <ProfileTable profiles={profiles.data} />
    </section>
  )
}
