import { Link } from 'react-router'
import type { ProfileTableProps } from '../types'
import { formatPercent } from '../utils/profileHelpers'

export function ProfileTable({ profiles, onDelete }: ProfileTableProps) {
  if (profiles.length === 0) {
    return <p className="empty-state">No profiles to show yet.</p>
  }

  return (
    <div className="table-shell">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Country</th>
            <th>Confidence</th>
            <th aria-label="Actions" />
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.id}>
              <td>
                <Link to={`/profiles/${profile.id}`}>{profile.name}</Link>
              </td>
              <td>{profile.age}</td>
              <td>{profile.gender}</td>
              <td>{profile.country_name}</td>
              <td>{formatPercent(Math.max(profile.gender_probability, profile.country_probability))}</td>
              <td>
                {onDelete ? (
                  <button className="table-action" type="button" onClick={() => onDelete(profile.id)}>
                    Delete
                  </button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
