const authStorageKey = 'insighta:mock-auth'

export async function signInWithGithub() {
  const res = await fetch(`${import.meta.env.BACKEND_URL}/auth/github`)
  const data = await res.json();

  
}

// export function isAuthenticated() {
//   return window.localStorage.getItem(authStorageKey) === 'true'
// }

// export function signInWithGithub() {
//   window.localStorage.setItem(authStorageKey, 'true')
// }

// export function signOut() {
//   window.localStorage.removeItem(authStorageKey)
// }
