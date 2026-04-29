import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router'
import type { Role } from '../types'
import { signOut } from '../utils/auth'
import { getCurrentRole } from '../utils/profileHelpers'

export function WorkspaceLayout() {
  const [role] = useState<Role>(() => getCurrentRole())
  const [status, setStatus] = useState('')
  const navigate = useNavigate()

  async function onSignOut() {
    try {
      setStatus('Signing out...')
      await signOut()
      navigate('/')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not sign out')
    }
  }

  return (
    <main className="app-page">
      <header className="workspace-header app-header">
        <Link className="brand" to="/dashboard" aria-label="Insighta Labs dashboard">
          <span className="brand-mark">IL</span>
          <span>Insighta Labs</span>
        </Link>
        <nav className="app-nav" aria-label="Workspace navigation">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/profiles">Profiles</NavLink>
          <NavLink to="/search">Search</NavLink>
          <NavLink to="/account">Account</NavLink>
        </nav>
        <div className="header-actions">
          <span className="role-pill">{role}</span>
          <button className="text-button" type="button" onClick={onSignOut}>
            Sign out
          </button>
        </div>
      </header>
      {status ? <p className="workspace-status">{status}</p> : null}
      <Outlet />
    </main>
  )
}
