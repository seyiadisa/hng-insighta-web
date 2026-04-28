import { createBrowserRouter, redirect } from 'react-router'
import { LandingPage } from './components/Landing'
import { UserPage } from './components/User'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LandingPage,
  },
  {
    path: '/user',
    middleware: [],
    Component: UserPage,
  },
  {
    path: '*',
    loader: () => redirect('/'),
  },
])
