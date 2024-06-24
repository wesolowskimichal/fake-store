import { useMemo, useState } from 'react'
import { Pressable, StyleSheet, Text, View, ViewProps } from 'react-native'
import { useScreeen } from '../../hooks/useScreenContext'
import { ColorScheme, ColorSchemeColors } from '../../types/Types'

type DropDownProps = {
  data: string[]
  defaultMainElement: string
  onSelect?: (element: string) => void
  wrapperStyle?: ViewProps
}

export const DropDown = ({ data, defaultMainElement, onSelect, wrapperStyle }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [mainElement, setMainElement] = useState(defaultMainElement)

  const { colors } = useScreeen()
  const styles = useMemo(() => createStyles(colors), [colors])

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleSelect = (element: ColorScheme) => {
    setMainElement(element)
    if (onSelect) {
      onSelect(element)
    }
    setIsOpen(false)
  }

  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      <Pressable onPress={toggleDropdown} style={[styles.element, styles.mainElement]}>
        <Text style={styles.elementText}>{mainElement}</Text>
      </Pressable>
      {isOpen && (
        <View style={styles.list}>
          <Pressable
            key={`${mainElement}--1`}
            onPress={() => handleSelect(mainElement as ColorScheme)}
            style={[styles.element, styles.mainElement]}
          >
            <Text style={styles.mainElementText}>{mainElement}</Text>
          </Pressable>
          {data
            .filter(element => element !== mainElement)
            .map((element, index) => (
              <Pressable
                key={`${element}-${index}`}
                onPress={() => handleSelect(element as ColorScheme)}
                style={[styles.element, element === mainElement ? styles.mainElement : {}]}
              >
                <Text style={styles.elementText}>{element}</Text>
              </Pressable>
            ))}
        </View>
      )}
    </View>
  )
}

const createStyles = (colors: ColorSchemeColors) =>
  StyleSheet.create({
    wrapper: {
      position: 'relative'
    },
    element: {
      backgroundColor: colors.dColor,
      padding: 5,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 5
    },
    mainElement: {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: colors.aColor
    },
    mainElementText: {
      color: colors.cColor
    },
    list: {
      position: 'absolute',
      width: '100%',
      zIndex: 1000
    },
    elementText: {
      color: colors.aColor
    }
  })
