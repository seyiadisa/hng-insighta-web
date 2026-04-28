import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { createInsight, getInitials } from '../insightData'
import { useNavigate } from 'react-router'

export function UserPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('Ada Lovelace')
  const [searchedName, setSearchedName] = useState('Ada Lovelace')
  const insight = useMemo(() => createInsight(searchedName), [searchedName])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSearchedName(name)
  }

  function onSignOut() {
    navigate('/')
  }

  return (
    <main className="user-page">
      <header className="workspace-header">
        <a className="brand" href="#workspace" aria-label="Insighta Labs dashboard">
          <span className="brand-mark">IL</span>
          <span>Insighta Labs</span>
        </a>
        <button className="text-button" type="button" onClick={onSignOut}>
          Sign out
        </button>
      </header>

      <section className="workspace" id="workspace">
        <div className="workspace-intro">
          <p className="eyebrow">Workspace</p>
          <h1>Run a name lookup.</h1>
          <p>
            Search a first name and Insighta will organize estimated age,
            nationality, and gender signals from the backend APIs.
          </p>
        </div>

        <form className="search-card" onSubmit={handleSubmit}>
          <label htmlFor="person-name">Person name</label>
          <div className="search-row">
            <input
              id="person-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Grace Hopper"
            />
            <button type="submit">Generate insight</button>
          </div>
        </form>

        <section className="result-layout" aria-label="Generated insight">
          <article className="profile-card">
            <span className="avatar large">{getInitials(searchedName) || 'IN'}</span>
            <div>
              <p className="muted">Current search</p>
              <h2>{searchedName || 'Unnamed person'}</h2>
              <p>{insight.headline}</p>
            </div>
          </article>

          <article className="score-card">
            <p className="muted">Combined confidence</p>
            <strong>{insight.confidence}%</strong>
            <span>{insight.summary}</span>
          </article>

          <article className="metric-card age-card">
            <p className="muted">Agify</p>
            <strong>{insight.estimatedAge}</strong>
            <span>estimated age</span>
          </article>

          <article className="metric-card country-card">
            <p className="muted">Nationalize</p>
            <strong>{insight.topCountry}</strong>
            <span>highest country match</span>
          </article>

          <article className="metric-card gender-card">
            <p className="muted">Genderize</p>
            <strong>{insight.genderSignal}</strong>
            <span>probabilistic gender signal</span>
          </article>

          <article className="next-card">
            <p className="muted">Backend response checklist</p>
            <ul>
              <li>Return each provider result with its probability or count.</li>
              <li>Handle missing data with a clear unavailable state.</li>
              <li>Keep predictions framed as estimates, not facts.</li>
            </ul>
          </article>
        </section>
      </section>
    </main>
  )
}
