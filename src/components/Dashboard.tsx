import { useEffect, useMemo, useState } from 'react'
import type { PaginatedProfiles } from '../types'
import { listProfiles } from '../utils/api'
import { emptyProfiles } from '../utils/profileHelpers'
import { ProfileTable } from './ProfileTable'

export function DashboardPage() {
  const [profiles, setProfiles] = useState<PaginatedProfiles>(emptyProfiles)
  const [status, setStatus] = useState('Loading dashboard...')

  useEffect(() => {
    listProfiles({ page: 1, limit: 5, sort_by: 'created_at', order: 'desc' })
      .then((data) => {
        setProfiles(data)
        setStatus('')
      })
      .catch((error: Error) => setStatus(error.message))
  }, [])

  const averageAge = useMemo(() => {
    if (profiles.data.length === 0) {
      return 0
    }

    const totalAge = profiles.data.reduce((total, profile) => total + profile.age, 0)
    return Math.round(totalAge / profiles.data.length)
  }, [profiles.data])

  const highConfidence = profiles.data.filter(
    (profile) => profile.gender_probability >= 0.8 || profile.country_probability >= 0.8,
  ).length

  return (
    <section className="workspace app-workspace">
      <div className="workspace-intro">
        <p className="eyebrow">Dashboard</p>
        <h1>Profile intelligence at a glance.</h1>
        <p>Track available profile volume, fresh lookups, and confidence signals from the backend.</p>
      </div>

      {status ? <p className="status-line">{status}</p> : null}

      <section className="metrics-grid" aria-label="Dashboard metrics">
        <article>
          <span>Total profiles</span>
          <strong>{profiles.total.toLocaleString()}</strong>
        </article>
        <article>
          <span>Latest page</span>
          <strong>{profiles.data.length}</strong>
        </article>
        <article>
          <span>Average age</span>
          <strong>{averageAge || '-'}</strong>
        </article>
        <article>
          <span>High confidence</span>
          <strong>{highConfidence}</strong>
        </article>
      </section>

      <ProfileTable profiles={profiles.data} />
    </section>
  )
}
