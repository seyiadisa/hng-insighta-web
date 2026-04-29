export type Role = 'analyst' | 'admin'

export type Profile = {
  id: string
  name: string
  gender: 'male' | 'female' | string
  gender_probability: number
  age: number
  age_group: string
  country_id: string
  country_name: string
  country_probability: number
  created_at: string
}

export type PaginatedProfiles = {
  status: string
  page: number
  limit: number
  total: number
  total_pages: number
  links: {
    self: string
    next: string | null
    prev: string | null
  }
  data: Profile[]
}

export type ProfileFilters = {
  gender?: string
  country_id?: string
  min_age?: string
  max_age?: string
  min_gender_probability?: string
  min_country_probability?: string
  sort_by?: string
  order?: string
  page?: number
  limit?: number
}

export type ProfileTableProps = {
  profiles: Profile[]
  onDelete?: (profileId: string) => void
}
