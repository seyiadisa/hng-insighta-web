import { useState } from 'react'
import { LandingPage } from './components/Landing'
import { UserPage } from './components/User'
import './App.css'

type Page = 'landing' | 'user'

function App() {
  const [page, setPage] = useState<Page>('landing')

  return page === 'landing' ? (
    <LandingPage onContinue={() => setPage('user')} />
  ) : (
    <UserPage onSignOut={() => setPage('landing')} />
  )
}

export default App
