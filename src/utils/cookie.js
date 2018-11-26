export function set({ key, value = '', domain, expires, path }) {
  if (!key) return Promise.reject(new Error('key is invalid'))

  document.cookie = `${key}=${value};domain=${domain};expires=${expires}`

  return Promise.resolve()
}
