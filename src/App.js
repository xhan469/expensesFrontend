import { useEffect } from 'react';
import './App.css';
import SignInPage from './components/signInPage';
import SignUpPage from './components/signUpPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HomePage from './components/homePage';
import { userAuthenticated } from './app/authenticationSlice';
import NavBar from './components/navBar';


const App = () => {
  const { isLoggedIn } = useSelector(state => state.authenticationSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if(token!==undefined && token!==null){
      dispatch(userAuthenticated({token}));

    }
  }, []);

  return (
    <BrowserRouter>
    <NavBar></NavBar>
      <Routes>
        <Route path="/" element={isLoggedIn ? <HomePage /> : <SignInPage />} />
        <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <SignUpPage />} />
        <Route path="/signin" element={isLoggedIn ? <Navigate to="/" /> : <SignInPage />} />
        <Route path="*" element={<h2>Page not found!</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
