import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/Types'
import { HomeSccreen } from '../screeens/home/Home'
import { ScreenProvider } from '../contexts/ScreenContext'
import { ProductScreen } from '../screeens/product/Product'
import { ProductsScreen } from '../screeens/products/Products'
import { SettingsScreen } from '../screeens/settings/Setting'

const Stack = createNativeStackNavigator<RootStackParamList>()

export function Router() {
  return (
    <ScreenProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeSccreen}
            options={{
              headerShown: false,
              presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_right'
            }}
          />
          <Stack.Screen
            name="Product"
            component={ProductScreen}
            options={{
              headerShown: false,
              presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_right'
            }}
          />
          <Stack.Screen
            name="Products"
            component={ProductsScreen}
            options={{
              headerShown: false,
              presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_right'
            }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              headerShown: false,
              presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_right'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ScreenProvider>
  )
}
