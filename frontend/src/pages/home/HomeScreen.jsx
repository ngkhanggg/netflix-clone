import React from 'react'

import { useAuthStore } from '../../store/authUser'

const HomeScreen = () => {
  const { signout } = useAuthStore()
  return (
    <div>
      HomeScreen
      <button onClick={signout}>Sign Out</button>
    </div>
  )
}

export default HomeScreen