export const sampleSignals = [
  { label: 'Agify', value: 'age range' },
  { label: 'Nationalize', value: 'likely countries' },
  { label: 'Genderize', value: 'gender signal' },
]

export const featureCards = [
  {
    title: 'Age estimate',
    source: 'Agify',
    copy: 'Estimate the likely age range connected to a first name.',
  },
  {
    title: 'Origin signals',
    source: 'Nationalize',
    copy: 'Rank likely country associations with probability scores.',
  },
  {
    title: 'Gender signal',
    source: 'Genderize',
    copy: 'Surface a probabilistic gender signal when the data supports it.',
  },
]

export function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export function createInsight(name: string) {
  const trimmedName = name.trim()
  const letters = trimmedName.replace(/[^a-z]/gi, '').length
  const confidence = Math.min(96, Math.max(54, 52 + letters * 4))
  const estimatedAge = Math.min(64, Math.max(18, 19 + letters * 2))
  const countryOptions = ['Nigeria', 'United States', 'Ghana', 'United Kingdom']
  const topCountry = countryOptions[letters % countryOptions.length]
  const genderSignal = letters % 2 === 0 ? 'Female leaning' : 'Male leaning'

  return {
    confidence,
    estimatedAge,
    topCountry,
    genderSignal,
    headline:
      trimmedName.length > 0
        ? `${trimmedName} has enough name signal for a first-pass demographic read.`
        : 'Enter a name to generate a starter profile.',
    summary:
      trimmedName.length > 0
        ? 'The backend will combine Agify, Nationalize, and Genderize responses into one concise profile for review.'
        : 'Search by name to preview the demographic signals Insighta will organize before deeper enrichment.',
  }
}
