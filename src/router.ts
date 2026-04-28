import { createElement, useState } from 'react'
import type { ReactNode } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router'
import { LandingPage } from './components/Landing'
import { UserPage } from './components/User'

const authStorageKey = 'insighta:mock-auth'

function getInitialAuthState() {
  return window.localStorage.getItem(authStorageKey) === 'true'
}

function ProtectedRoute({
  isAuthenticated,
  children,
}: {
  isAuthenticated: boolean
  children?: ReactNode
}) {
  if (!isAuthenticated) {
    return createElement(Navigate, { to: '/', replace: true })
  }

  return children
}

function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(getInitialAuthState)
  const navigate = useNavigate()

  function handleGithubAuth() {
    window.localStorage.setItem(authStorageKey, 'true')
    setIsAuthenticated(true)
    navigate('/user')
  }

  function handleSignOut() {
    window.localStorage.removeItem(authStorageKey)
    setIsAuthenticated(false)
    navigate('/')
  }

  return createElement(
    Routes,
    null,
    createElement(Route, {
      path: '/',
      element: createElement(LandingPage, { onContinue: handleGithubAuth }),
    }),
    createElement(Route, {
      path: '/user',
      element: createElement(
        ProtectedRoute,
        { isAuthenticated },
        createElement(UserPage, { onSignOut: handleSignOut }),
      ),
    }),
    createElement(Route, {
      path: '*',
      element: createElement(Navigate, { to: '/', replace: true }),
    }),
  )
}

export function AppRouter() {
  return createElement(BrowserRouter, null, createElement(AppRoutes))
}
