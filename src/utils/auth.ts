export const backendUrl = import.meta.env.VITE_BACKEND_URL ?? ''

export function signInWithGithub() {
  window.location.href = `${backendUrl}/auth/github`
}

export async function signOut() {
  const response = await apiFetch('/auth/logout/', {
    method: 'POST',
    headers: {
      'X-CSRF-Token': getCsrfToken(),

    }
  })

  if (!response.ok) {
    throw new Error(`Logout failed with ${response.status}`)
  }
}

export function getCookie(name: string) {
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${encodeURIComponent(name)}=`))

  return cookie ? decodeURIComponent(cookie.split('=').slice(1).join('=')) : ''
}

export function getCsrfToken() {
  return (
    getCookie('csrf_token')
  )
}

export async function apiFetch(path: string, init: RequestInit = {}, retryOnUnauthorized = true) {
  const response = await fetchWithAuth(path, init)

  if (response.status !== 401 || !retryOnUnauthorized) {
    return response
  }

  const refreshResponse = await fetchWithAuth('/auth/refresh', {
    method: 'POST',
    headers: {
      'X-CSRF-Token': getCsrfToken(),
    }
  })

  if (!refreshResponse.ok) {
    window.location.href = '/'
    return response
  }

  return fetchWithAuth(path, init)
}

function fetchWithAuth(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers)
  const csrfToken = getCsrfToken()

  if (csrfToken) {
    headers.set('X-CSRF-Token', csrfToken)
  }

  return fetch(`${backendUrl}${path}`, {
    ...init,
    credentials: 'include',
    headers,
  })
}
