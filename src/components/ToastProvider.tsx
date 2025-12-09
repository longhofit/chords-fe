import type { ReactNode } from 'react'
import { createContext, useContext, useMemo, useState, useCallback } from 'react'

type ToastType = 'success' | 'error'

type Toast = {
  id: number
  type: ToastType
  message: string
}

type ToastContextValue = {
  showToast: (type: ToastType, message: string, durationMs?: number) => void
  showSuccess: (message: string, durationMs?: number) => void
  showError: (message: string, durationMs?: number) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

type ProviderProps = {
  children: ReactNode
}

export function ToastProvider({ children }: ProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback(
    (type: ToastType, message: string, durationMs = 3200) => {
      const id = Date.now() + Math.random()
      setToasts((prev) => [...prev, { id, type, message }])
      window.setTimeout(() => removeToast(id), durationMs)
    },
    [removeToast],
  )

  const value = useMemo<ToastContextValue>(
    () => ({
      showToast,
      showSuccess: (message, durationMs) => showToast('success', message, durationMs),
      showError: (message, durationMs) => showToast('error', message, durationMs),
    }),
    [showToast],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

type ToastViewportProps = {
  toasts: Toast[]
}

function ToastViewport({ toasts }: ToastViewportProps) {
  return (
    <div className="toast-viewport">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      ))}
    </div>
  )
}

