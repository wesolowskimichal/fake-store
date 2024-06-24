import { StyleSheet, Text, View } from 'react-native'
import { ColorScheme, ColorSchemeColors, SettingsScreenProps } from '../../types/Types'
import { Screen } from '../screen/Screen'
import { DropDown } from '../../components/dropDown/DropDown'
import { useScreeen } from '../../hooks/useScreenContext'
import { useMemo } from 'react'

export const SettingsScreen = ({ navigation, route }: SettingsScreenProps) => {
  const { colors, colorScheme, setColorScheme } = useScreeen()
  const styles = useMemo(() => createStyles(colors), [colors])
  return (
    <Screen navigation={navigation} route={route} noScrollWrapper>
      <View style={styles.wrapper}>
        <Text style={styles.settingsText}>Color Theme: </Text>
        <DropDown
          defaultMainElement={colorScheme}
          data={['dark', 'light']}
          onSelect={(colorScheme: string) => setColorScheme(colorScheme as ColorScheme)}
        />
      </View>
    </Screen>
  )
}

const createStyles = (colors: ColorSchemeColors) =>
  StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      backgroundColor: colors.cColor,
      height: 40,
      alignItems: 'center'
    },
    settingsText: {
      color: colors.dColor,
      fontWeight: '500',
      fontSize: 15
    }
  })
