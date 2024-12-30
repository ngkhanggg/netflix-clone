import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Loader } from 'lucide-react';
import HomePage from './pages/home/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import WatchPage from './pages/WatchPage';
import SearchPage from './pages/SearchPage';
import Footer from './components/Footer';
import { useAuthStore } from './store/authUser';

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
        <Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to={"/signin"} />} />
        <Route path='/search/' element={user ? <SearchPage /> : <Navigate to={"/signin"} />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  )
}
