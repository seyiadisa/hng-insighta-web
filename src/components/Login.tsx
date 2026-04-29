import { Link } from 'react-router'
import { signInWithGithub } from '../utils/auth'
import { GithubIcon } from './GithubIcon'

export function LoginPage() {
  return (
    <main className="login-page">
      <nav className="topbar" aria-label="Login navigation">
        <Link className="brand" to="/" aria-label="Insighta Labs home">
          <span className="brand-mark">IL</span>
          <span>Insighta Labs</span>
        </Link>
      </nav>

      <section className="login-shell">
        <div className="login-panel">
          <p className="eyebrow">Login</p>
          <h1>Enter the workspace with GitHub.</h1>
          <p>
            Insighta uses GitHub OAuth. After authorization, the backend stores your access and refresh tokens in
            secure cookies.
          </p>
          <button className="github-button" type="button" onClick={signInWithGithub}>
            <GithubIcon />
            Continue with GitHub
          </button>
        </div>
      </section>
    </main>
  )
}
