import type { PaginatedProfiles, Role } from '../types'
import { getCookie } from './auth'

export const emptyProfiles: PaginatedProfiles = {
  status: 'idle',
  page: 1,
  limit: 10,
  total: 0,
  total_pages: 0,
  links: {
    self: '',
    next: null,
    prev: null,
  },
  data: [],
}

export function getCurrentRole(): Role {
  const role = getCookie('role')
  return role === 'admin' ? 'admin' : 'analyst'
}

export function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`
}

export function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}
