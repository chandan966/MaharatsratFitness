const KEY = 'carrental_listings'

export const getListings = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] }
}
export const saveListings = (items) => localStorage.setItem(KEY, JSON.stringify(items))