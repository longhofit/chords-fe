import type { ApiResponse } from './types'

// Backend now serves APIs under /api; set default accordingly.
// Override with VITE_API_URL if needed (e.g., for production).
const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'

type ApiOptions = RequestInit & {
  parseJson?: boolean
}

export async function apiFetch<T>(path: string, options: ApiOptions = {}) {
  const { parseJson = true, headers, ...rest } = options
  const url = `${API_BASE_URL}${path}`

  try {
    const method = (rest.method ?? 'GET').toUpperCase()
    const hasBody = Boolean(rest.body)
    const computedHeaders: Record<string, string> = {
      ...(headers as Record<string, string>),
    }

    // Only set JSON content-type when sending a body to avoid preflight on simple GETs
    if (hasBody && !computedHeaders['Content-Type']) {
      computedHeaders['Content-Type'] = 'application/json'
    }

    const response = await fetch(url, {
      method,
      headers: computedHeaders,
      credentials: 'include',
      ...rest,
    })

    if (!response.ok) {
      let errorMessage = `Request failed with ${response.status}`
      try {
        const errorText = await response.text()
        if (errorText) {
          try {
            const errorJson = JSON.parse(errorText)
            errorMessage = errorJson.message || errorText
          } catch {
            errorMessage = errorText
          }
        }
      } catch {
        // Use default error message
      }

      if (response.status === 404) {
        errorMessage = `Not found: ${path}. Make sure the backend server is running at ${API_BASE_URL}`
      } else if (response.status === 0 || response.status === 500) {
        errorMessage = `Cannot connect to API at ${API_BASE_URL}. Is the backend server running?`
      }

      throw new Error(errorMessage)
    }

    if (!parseJson) {
      return null as T
    }

    const body = (await response.json()) as ApiResponse<T>
    if (!body.success) {
      throw new Error(body.message || 'Request failed')
    }

    return body.data
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(`Network error: Cannot reach API at ${API_BASE_URL}. Make sure the backend server is running.`)
    }
    throw error
  }
}

export { API_BASE_URL }

