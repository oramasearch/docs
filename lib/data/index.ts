import { OramaCloud } from '@orama/core'

if (!process.env.NEXT_PUBLIC_ORAMA_PROJECT_ID || !process.env.NEXT_PUBLIC_ORAMA_API_KEY) {
  throw new Error('Orama project ID and API key must be set in environment variables.')
}

export const collectionManager = new OramaCloud({
  projectId: process.env.NEXT_PUBLIC_ORAMA_PROJECT_ID,
  apiKey: 'c1_nP2ETUctm_rRJ0CiUGUHQqBwdzujsqHCtNTdRVK$V_WArF-mzzKBITHTaSr'
})

export const promptSuggestions = [
  'Tell me about Orama Cloud',
  'Do I need an external inference provider?',
  'How does Orama generate text embeddings?',
  'What SDKs does Orama provide?',
  'How do I insert data into Orama Cloud?'
]
