import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  createProfile,
  deleteProfile,
  downloadProfilesCsv,
  listProfiles,
} from '../utils/api'
import type { PaginatedProfiles, ProfileFilters } from '../types'
import { emptyProfiles, getCurrentRole } from '../utils/profileHelpers'
import { Pagination } from './Pagination'
import { ProfileTable } from './ProfileTable'

export function ProfilesPage() {
  const [filters, setFilters] = useState<ProfileFilters>({
    page: 1,
    limit: 10,
    sort_by: 'created_at',
    order: 'desc',
  })
  const [profiles, setProfiles] = useState<PaginatedProfiles>(emptyProfiles)
  const [newProfileName, setNewProfileName] = useState('')
  const [status, setStatus] = useState('')
  const role = getCurrentRole()

  function updateFilter(key: keyof ProfileFilters, value: string) {
    setFilters((current) => ({ ...current, [key]: value, page: 1 }))
  }

  function goToPage(page: number) {
    setFilters((current) => ({ ...current, page }))
  }

  async function onCreateProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!newProfileName.trim()) {
      return
    }

    try {
      setStatus('Creating profile...')
      await createProfile(newProfileName.trim())
      setNewProfileName('')
      const data = await listProfiles({ ...filters, page: 1 })
      setProfiles(data)
      setStatus('')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not create profile')
    }
  }

  async function onExport() {
    try {
      setStatus('Preparing CSV export...')
      await downloadProfilesCsv()
      setStatus('')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not export profiles')
    }
  }

  async function onDelete(profileId: string) {
    try {
      setStatus('Deleting profile...')
      await deleteProfile(profileId)
      const data = await listProfiles(filters)
      setProfiles(data)
      setStatus('')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not delete profile')
    }
  }

  async function applyFilters() {
    try {
      setStatus('Applying filters...')
      const data = await listProfiles(filters)
      setProfiles(data)
      setStatus('')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not apply filters')
    }
  }

  return (
    <section className="workspace app-workspace">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Profiles</p>
          <h1>Browse enriched names.</h1>
        </div>
        {role === 'admin' ? (
          <button className="text-button" type="button" onClick={onExport}>
            Export CSV
          </button>
        ) : null}
      </div>

      <section className="filters-panel" aria-label="Profile filters">
        <select value={filters.gender ?? ''} onChange={(event) => updateFilter('gender', event.target.value)}>
          <option value="">Any gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
        <input
          value={filters.country_id ?? ''}
          onChange={(event) => updateFilter('country_id', event.target.value.toUpperCase())}
          placeholder="Country ID"

        />
        <input
          value={filters.min_age ?? ''}
          onChange={(event) => updateFilter('min_age', event.target.value)}
          inputMode="numeric"
          placeholder="Min age"
        />
        <input
          value={filters.max_age ?? ''}
          onChange={(event) => updateFilter('max_age', event.target.value)}
          inputMode="numeric"
          placeholder="Max age"
        />
        <select value={filters.sort_by ?? 'created_at'} onChange={(event) => updateFilter('sort_by', event.target.value)}>
          <option value="created_at">Created</option>
          <option value="age">Age</option>
          <option value="gender_probability">Gender probability</option>
        </select>
        <select value={filters.order ?? 'desc'} onChange={(event) => updateFilter('order', event.target.value)}>
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
      </section>

      <section>
        <button className="text-button" type="button" onClick={applyFilters}>
          Apply filters
        </button>
      </section>

      {role === 'admin' ? (
        <form className="admin-create" onSubmit={onCreateProfile}>
          <input
            value={newProfileName}
            onChange={(event) => setNewProfileName(event.target.value)}
            placeholder="Create profile by name"
          />
          <button type="submit">Create</button>
        </form>
      ) : null}

      {status ? <p className="status-line">{status}</p> : null}
      <ProfileTable profiles={profiles.data} onDelete={role === 'admin' ? onDelete : undefined} />
      <Pagination profiles={profiles} onPageChange={goToPage} />
    </section>
  )
}
