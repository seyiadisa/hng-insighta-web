import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type Page = 'landing' | 'user'

const sampleSignals = [
  'career arc',
  'public footprint',
  'communication style',
  'collaboration fit',
]

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

function createInsight(name: string) {
  const trimmedName = name.trim()
  const letters = trimmedName.replace(/[^a-z]/gi, '').length
  const score = Math.min(98, Math.max(62, 58 + letters * 3))

  return {
    score,
    headline:
      trimmedName.length > 0
        ? `${trimmedName} reads as a focused, high-context profile.`
        : 'Enter a name to generate a starter profile.',
    summary:
      trimmedName.length > 0
        ? 'Insighta Labs would combine verified public signals, naming patterns, and context prompts to build a first-pass picture for review.'
        : 'Search by name to see how the user workspace will frame early signals before deeper enrichment.',
  }
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="github-icon">
      <path
        fill="currentColor"
        d="M12 .5A11.5 11.5 0 0 0 8.36 22.9c.58.11.79-.25.79-.56v-2.02c-3.22.7-3.9-1.38-3.9-1.38-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.04 1.76 2.72 1.25 3.38.96.11-.75.41-1.25.74-1.54-2.57-.29-5.27-1.28-5.27-5.72 0-1.26.45-2.3 1.19-3.11-.12-.29-.52-1.48.11-3.07 0 0 .98-.31 3.18 1.19a10.95 10.95 0 0 1 5.8 0c2.2-1.5 3.17-1.19 3.17-1.19.64 1.59.24 2.78.12 3.07.74.81 1.18 1.85 1.18 3.11 0 4.45-2.71 5.43-5.29 5.72.42.36.79 1.07.79 2.16v3.21c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z"
      />
    </svg>
  )
}

function LandingPage({ onContinue }: { onContinue: () => void }) {
  return (
    <main className="landing-page">
      <nav className="topbar" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Insighta Labs home">
          <span className="brand-mark">IL</span>
          <span>Insighta Labs</span>
        </a>
      </nav>

      <section className="hero-shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow">People insight, without the noise</p>
          <h1>Know the person behind the name.</h1>
          <p className="lede">
            Insighta Labs turns a name into a careful first read: useful
            context, likely signals, and clearer questions before you reach out.
          </p>
          <button className="github-button" type="button" onClick={onContinue}>
            <GithubIcon />
            Continue with GitHub
          </button>
        </div>

        <aside className="insight-panel" aria-label="Insight preview">
          <div className="scan-line" />
          <div className="panel-header">
            <span>Sample profile</span>
            <strong>82%</strong>
          </div>
          <div className="profile-chip">
            <span className="avatar">MA</span>
            <div>
              <strong>Maya Adebayo</strong>
              <span>Founder, community builder</span>
            </div>
          </div>
          <div className="signal-grid">
            {sampleSignals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>
        </aside>
      </section>
    </main>
  )
}

function UserPage({ onSignOut }: { onSignOut: () => void }) {
  const [name, setName] = useState('Ada Lovelace')
  const [searchedName, setSearchedName] = useState('Ada Lovelace')
  const insight = useMemo(() => createInsight(searchedName), [searchedName])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSearchedName(name)
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
          <h1>Start with a name.</h1>
          <p>
            Search a person and Insighta will prepare the first layer of
            context for deeper review.
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
            <p className="muted">Confidence</p>
            <strong>{insight.score}%</strong>
            <span>{insight.summary}</span>
          </article>

          <article className="next-card">
            <p className="muted">Next best prompts</p>
            <ul>
              <li>What relationship are you trying to understand?</li>
              <li>Which region, company, or public source should matter most?</li>
              <li>Should Insighta prioritize professional or social context?</li>
            </ul>
          </article>
        </section>
      </section>
    </main>
  )
}

function App() {
  const [page, setPage] = useState<Page>('landing')

  return page === 'landing' ? (
    <LandingPage onContinue={() => setPage('user')} />
  ) : (
    <UserPage onSignOut={() => setPage('landing')} />
  )
}

export default App
