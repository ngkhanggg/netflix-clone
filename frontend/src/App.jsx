import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/signin' element={<SignInPage />} />
    </Routes>
  )
}
