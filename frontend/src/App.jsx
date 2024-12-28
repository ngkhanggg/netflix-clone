import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authUser';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Loader } from 'lucide-react';

export default function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore()

  useEffect(() => {
    authCheck()
  }, [authCheck])

  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10"/>
        </div>
      </div>
    )
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={user ? <Navigate to={"/"} /> : <SignUpPage />} />
        <Route path='/signin' element={user ? <Navigate to={"/"} /> : <SignInPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  )
}
