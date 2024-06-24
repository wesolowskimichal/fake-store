import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react'
import { Token, User } from '../types/Types'
import { Api } from '../api/Api'
import { ResponseCode } from '../api/core/ResponseCode'
import { LocalData } from '../data/LocalData'
import { LocalResponseCode } from '../data/core/LocalResponseCode'

type AppContextType = {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
  token: Token | null
  setToken: (token: Token | null) => void
}

export const AppContext = createContext<AppContextType>({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {}
})

type AppProviderProps = {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<Token | null>(null)

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        const response = await Api.user.get()
        if (response.responseCode === ResponseCode.POSITIVE) {
          setUser(response.data)
        }
      }

      fetchUser()
    }
  }, [token])

  useEffect(() => {
    const loadToken = async () => {
      const response = await LocalData.getToken()
      if (response.responseCode === LocalResponseCode.POSITIVE) {
        setToken(response.data)
      }
    }

    loadToken()
  }, [])

  const handleSetToken = (token: Token | null) => {
    const updateToken = async () => {
      await LocalData.setToken(token)
    }

    setToken(token)
    updateToken()
  }

  return (
    <AppContext.Provider value={{ user, setUser, token, setToken: handleSetToken }}>{children}</AppContext.Provider>
  )
}
