import * as CONFIG from './../../config/dogshit'

const API_URL = CONFIG.dogshit.uri
const DEFAULT_HEADERS = new Headers({
  'Content-Type': 'application/json',
})

export async function dogshitsList() {
  const reqInit = {
    method: 'GET',
    headers: DEFAULT_HEADERS,
  }

  const response = await fetch(`${API_URL}/turds`, reqInit)
  if (!response.ok) {
    console.error(await response.json())
    throw new Error('Bad Request')
  }

  return response.json()
}

export async function dogshitsAdd(newEntry) {
  const reqInit = {
    method: 'POST',
    headers: DEFAULT_HEADERS,
  }

  const response = await fetch(`${API_URL}/add`, reqInit)
  if (!response.ok) {
    console.error(await response.json())
    throw new Error('Bad request')
  }
  return response.json()
}

export async function dogshitsGet(id) {
  const reqInit = {
    method: 'GET',
    headers: DEFAULT_HEADERS,
  }

  const response = await fetch(`${API_URL}/turds/${id}`, reqInit)

  if (!response.ok) {
    console.error(await response.json())
    throw new Error('Bad request')
  }
  return response.json()
}
