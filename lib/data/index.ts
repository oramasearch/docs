import { CollectionManager } from '@orama/core'

if (!process.env.NEXT_PUBLIC_ORAMA_COLLECTION_ID) {
  throw new Error('NEXT_PUBLIC_ORAMA_COLLECTION_ID is not defined')
}

if (!process.env.NEXT_PUBLIC_ORAMA_API_KEY) {
  throw new Error('NEXT_PUBLIC_ORAMA_API_KEY is not defined')
}

export const collectionManager = new CollectionManager({
  collectionID: process.env.NEXT_PUBLIC_ORAMA_COLLECTION_ID,
  apiKey: process.env.NEXT_PUBLIC_ORAMA_API_KEY
})

export const promptSuggestions = [
  'When I should use Orama JS?',
  'What is the power of Orama?',
  'What are the minimum requirements for Orama Core?',
  'I’d like to install Orama on my server',
  'How many datasource can Orama support?'
]
