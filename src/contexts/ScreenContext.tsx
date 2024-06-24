import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useMemo, useState } from 'react'
import { ColorScheme, ColorSchemeColors } from '../types/Types'
import { Appearance } from 'react-native'
import { LocalData } from '../data/LocalData'
import { LocalResponseCode } from '../data/core/LocalResponseCode'

export const lightColors: ColorSchemeColors = {
  aColor: '#F3EEEA',
  bColor: '#EBE3D5',
  cColor: '#B0A695',
  dColor: '#776B5D'
}

export const darkColors: ColorSchemeColors = {
  aColor: '#0D0D0D',
  bColor: '#404040',
  cColor: '#262626',
  dColor: '#A6A6A6'
}

type ScreenContextType = {
  colorScheme: ColorScheme
  setColorScheme: (colorScheme: ColorScheme) => void
  colors: ColorSchemeColors
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}

export const ScreenContext = createContext<ScreenContextType>({
  colorScheme: 'dark',
  setColorScheme: () => {},
  colors: lightColors,
  loading: true,
  setLoading: () => {}
})

type ScreenProviderProps = {
  children: ReactNode
}

export const ScreenProvider = ({ children }: ScreenProviderProps) => {
  const systemColorScheme = Appearance.getColorScheme()

  const [colorScheme, setColorScheme] = useState<ColorScheme>(systemColorScheme ?? 'light')
  const [colors, setColors] = useState<ColorSchemeColors>(lightColors)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setColors(colorScheme === 'dark' ? darkColors : lightColors)
  }, [colorScheme])

  useEffect(() => {
    const fetchAppColorScheme = async () => {
      const response = await LocalData.getColorScheme()
      if (response.responseCode === LocalResponseCode.POSITIVE) {
        setColorScheme(response.data!)
      } else {
        await LocalData.setColorScheme(systemColorScheme ?? 'light')
        setColorScheme(systemColorScheme ?? 'light')
      }
    }

    fetchAppColorScheme()
  }, [])

  const contextValue = useMemo(
    () => ({ colorScheme, setColorScheme: handleSetColorScheme, colors, loading, setLoading }),
    [colorScheme, colors, loading]
  )

  const handleSetColorScheme = (colorScheme: ColorScheme) => {
    const updateLocal = async () => {
      await LocalData.setColorScheme(colorScheme)
      setColorScheme(colorScheme)
    }

    updateLocal()
  }

  return (
    <ScreenContext.Provider value={{ colorScheme, setColorScheme: handleSetColorScheme, colors, loading, setLoading }}>
      {children}
    </ScreenContext.Provider>
  )
}
