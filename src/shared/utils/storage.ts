export const storage = {
  getString(key: string): string {
    return window.localStorage.getItem(key) ?? ''
  },
  setString(key: string, value: string): void {
    window.localStorage.setItem(key, value)
  },
  getObject<T>(key: string): T | null {
    const raw = window.localStorage.getItem(key)

    if (!raw) {
      return null
    }

    try {
      return JSON.parse(raw) as T
    } catch {
      window.localStorage.removeItem(key)
      return null
    }
  },
  setObject<T>(key: string, value: T): void {
    window.localStorage.setItem(key, JSON.stringify(value))
  },
  remove(key: string): void {
    window.localStorage.removeItem(key)
  }
}
