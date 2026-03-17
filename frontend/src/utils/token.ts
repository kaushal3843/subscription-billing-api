export const isLoggedIn = (): boolean => {
  const token = localStorage.getItem("token")
  return !!token
}

export const getToken = (): string | null => {
  return localStorage.getItem("token")
}

export const setToken = (token: string): void => {
  localStorage.setItem("token", token)
}

export const removeToken = (): void => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
}

export const setUser = (user: { role: string }): void => {
  localStorage.setItem("user", JSON.stringify(user))
}

export const getUser = (): { role: string } | null => {
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}

