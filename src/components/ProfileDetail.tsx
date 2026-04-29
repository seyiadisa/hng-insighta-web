import { useState } from 'react'
import { useParams } from 'react-router'
import type { Profile } from '../types'
import { getProfile } from '../utils/api'
import { formatPercent, getInitials } from '../utils/profileHelpers'

export function ProfileDetailPage() {
  const { profileId = '' } = useParams()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [status, setStatus] = useState('Loading profile...')
  
  
  if (profileId) {
    getProfile(profileId)
      .then((data) => {
        setProfile(data)
        setStatus('')
      })
      .catch((error: Error) => setStatus(error.message))
  }

  if (!profileId) {
    setStatus('Missing profile id')
    return;
  }

  return (
    <section className="workspace app-workspace">
      {status ? <p className="status-line">{status}</p> : null}
      {profile ? (
        <article className="detail-panel">
          <span className="avatar large">{getInitials(profile.name) || 'IN'}</span>
          <div>
            <p className="eyebrow">Profile detail</p>
            <h1>{profile.name}</h1>
            <dl>
              <div>
                <dt>Gender</dt>
                <dd>
                  {profile.gender} at {formatPercent(profile.gender_probability)}
                </dd>
              </div>
              <div>
                <dt>Age</dt>
                <dd>
                  {profile.age} ({profile.age_group})
                </dd>
              </div>
              <div>
                <dt>Country</dt>
                <dd>
                  {profile.country_name} ({profile.country_id}) at {formatPercent(profile.country_probability)}
                </dd>
              </div>
              <div>
                <dt>Created</dt>
                <dd>{new Date(profile.created_at).toLocaleString()}</dd>
              </div>
            </dl>
          </div>
        </article>
      ) : null}
    </section>
  )
}
