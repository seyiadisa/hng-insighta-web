import type { PaginatedProfiles, Profile, ProfileFilters } from '../types'
import { apiFetch, backendUrl, getCsrfToken } from './auth'

function buildQuery(params: Record<string, string | number | undefined>) {
  const query = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      query.set(key, String(value))
    }
  })

  return query.toString()
}

async function profileRequest<T>(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers)
  headers.set('X-API-Version', '1')
  headers.set('X-CSRF-Token', getCsrfToken())

  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await apiFetch(path, {
    ...init,
    headers,
  })

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

export function listProfiles(filters: ProfileFilters) {
  const query = buildQuery(filters)
  return profileRequest<PaginatedProfiles>(`/api/profiles${query ? `?${query}` : ''}`)
}

export function getProfile(profileId: string) {
  return profileRequest<Profile>(`/api/profiles/${profileId}`)
}

export function searchProfiles(q: string, page = 1, limit = 10) {
  const query = buildQuery({ q, page, limit })
  return profileRequest<PaginatedProfiles>(`/api/profiles/search?${query}`)
}

export function createProfile(name: string) {
  return profileRequest<Profile>('/api/profiles', {
    method: 'POST',
    body: JSON.stringify({ name }),
  })
}

export function deleteProfile(profileId: string) {
  return profileRequest<void>(`/api/profiles/${profileId}`, {
    method: 'DELETE',
  })
}

export function getExportProfilesUrl() {
  return `${backendUrl}/api/profiles/export?format=csv`
}

export async function downloadProfilesCsv() {
  const headers = new Headers()
  headers.set('X-API-Version', '1')

  const response = await apiFetch('/api/profiles/export?format=csv', {
    headers,
  })

  if (!response.ok) {
    throw new Error(`Export failed with ${response.status}`)
  }

  const blob = await response.blob()
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'profiles.csv'
  link.click()
  URL.revokeObjectURL(url)
}
