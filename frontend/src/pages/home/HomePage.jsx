import { useAuthStore } from '../../store/authUser'
import HomeScreen from './HomeScreen'
import AuthScreen from './AuthScreen'

function HomePage() {
  const {user} = useAuthStore()

  return (
    <>
      {user ? <HomeScreen /> : <AuthScreen />}
    </>
  )
}

export default HomePage
