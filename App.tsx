import { AppProvider } from './src/contexts/AppContext'
import { Router } from './src/router/Router'

export default function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  )
}
