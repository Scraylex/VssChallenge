export const setItem = (label: string, value: object) => window.localStorage.setItem(label, JSON.stringify(value))

export const getItem = <T,>(label: string): T | undefined => {
  try {
    const item = window.localStorage.getItem(label)
    if (item === undefined || item === null) {
      return undefined
    }
    return JSON.parse(item) as T
  } catch {
    return undefined
  }
}

export const removeItem = (label: string): void => {
  window.localStorage.removeItem(label)
}
