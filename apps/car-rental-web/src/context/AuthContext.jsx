import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

const storageKey = 'carrental_user'

export function AuthProvider({children}){
  const [user, setUser] = useState(null)

  useEffect(() => {
    const raw = localStorage.getItem(storageKey)
    if(raw) setUser(JSON.parse(raw))
  }, [])

  const login = (email, password) => {
    // Demo: accept any non-empty
    const name = email.split('@')[0]
    const u = { email, name }
    setUser(u)
    localStorage.setItem(storageKey, JSON.stringify(u))
    return true
  }

  const signup = (name, email, password) => {
    const u = { name, email }
    setUser(u)
    localStorage.setItem(storageKey, JSON.stringify(u))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(storageKey)
  }

  return (
    <AuthContext.Provider value={{user, login, signup, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)