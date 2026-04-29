import type { PaginatedProfiles } from '../types'

export function Pagination({
  profiles,
  onPageChange,
}: {
  profiles: PaginatedProfiles
  onPageChange: (page: number) => void
}) {
  return (
    <div className="pagination" aria-label="Profile pagination">
      <button
        className="text-button"
        type="button"
        disabled={profiles.page <= 1}
        onClick={() => onPageChange(profiles.page - 1)}
      >
        Previous
      </button>
      <span>
        Page {profiles.page} of {profiles.total_pages || 1}
      </span>
      <button
        className="text-button"
        type="button"
        disabled={profiles.page >= profiles.total_pages}
        onClick={() => onPageChange(profiles.page + 1)}
      >
        Next
      </button>
    </div>
  )
}
