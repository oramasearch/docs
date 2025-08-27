import { OramaCloud } from '@orama/core'

if (!process.env.NEXT_PUBLIC_ORAMA_PROJECT_ID || !process.env.NEXT_PUBLIC_ORAMA_API_KEY) {
  throw new Error('Orama project ID and API key must be set in environment variables.')
}

export const collectionManager = new OramaCloud({
  projectId: process.env.NEXT_PUBLIC_ORAMA_PROJECT_ID,
  apiKey: 'c1_nP2ETUctm_rRJ0CiUGUHQqBwdzujsqHCtNTdRVK$V_WArF-mzzKBITHTaSr'
})

export const promptSuggestions = [
  'When I should use Orama JS?',
  'What is the power of Orama?',
  'What are the minimum requirements for Orama Core?',
  'I’d like to install Orama on my server',
  'How many datasource can Orama support?'
]
