import { getCookie } from '../utils/auth'
import { getCurrentRole } from '../utils/profileHelpers'

export function AccountPage() {
  const role = getCurrentRole()
  const csrfAvailable = Boolean(
    getCookie('csrf_token') || getCookie('csrf') || getCookie('XSRF-TOKEN') || getCookie('xsrf-token'),
  )

  return (
    <section className="workspace app-workspace">
      <div className="workspace-intro">
        <p className="eyebrow">Account</p>
        <h1>Session settings.</h1>
        <p>
          GitHub OAuth cookies are sent securely with backend requests. Profile requests include the readable CSRF
          token when it is present.
        </p>
      </div>
      <section className="account-grid">
        <article>
          <span>Role</span>
          <strong>{role}</strong>
        </article>
        <article>
          <span>CSRF cookie</span>
          <strong>{csrfAvailable ? 'Ready' : 'Not found'}</strong>
        </article>
      </section>
    </section>
  )
}
