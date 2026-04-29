import { createBrowserRouter, redirect } from 'react-router'
import { AccountPage } from './components/Account'
import { DashboardPage } from './components/Dashboard'
import { LandingPage } from './components/Landing'
import { LoginPage } from './components/Login'
import { ProfileDetailPage } from './components/ProfileDetail'
import { ProfilesPage } from './components/Profiles'
import { SearchPage } from './components/Search'
import { WorkspaceLayout } from './components/WorkspaceLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LandingPage,
  },
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    Component: WorkspaceLayout,
    children: [
      {
        path: '/dashboard',
        Component: DashboardPage,
      },
      {
        path: '/profiles',
        Component: ProfilesPage,
      },
      {
        path: '/profiles/:profileId',
        Component: ProfileDetailPage,
      },
      {
        path: '/search',
        Component: SearchPage,
      },
      {
        path: '/account',
        Component: AccountPage,
      },
    ],
  },
  {
    path: '*',
    loader: () => redirect('/'),
  },
])
