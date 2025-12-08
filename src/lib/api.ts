const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

type ApiOptions = RequestInit & {
  parseJson?: boolean
}

export async function apiFetch<T>(path: string, options: ApiOptions = {}) {
  const { parseJson = true, headers, ...rest } = options
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include',
    ...rest,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || `Request failed with ${response.status}`)
  }

  if (!parseJson) {
    return null as T
  }

  return (await response.json()) as T
}

export { API_BASE_URL }

