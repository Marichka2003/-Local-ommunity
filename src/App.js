import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/header';
import Home from './components/Home/home';
import Appeal from './components/Appeal/appeal';
import Infrastructure from './components/Infrastructure/infrastructure';
import Map from './components/Map/map';
import Departments from './components/Departments/departments';
import AppealAll from './components/AppealAll/appealall';
import AllNews from './components/AllNews/AllNews';
import AllFuture from './components/AllFuture/AllFuture';
import Footer from './components/Footer/footer';
import Settlements from './components/Settlements/Settlements';
import Authorization from './components/Authorization/authorization';
import SignUp from './components/SignUp/signup';
import Search from './components/Search/Search';
import User from './components/User/User';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';
import { AuthProvider } from './AuthContext';
import i18n from './i18n';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('isLoggedIn', isLoggedIn);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isLoggedIn]);

  const handleLogout = () => {
    console.log('Logging out...');
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <div className="App">
      <LanguageSelector />
      <AuthProvider>
        <Router>
          <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
            <Route path="/Appeal" element={<Appeal isLoggedIn={isLoggedIn} />} />
            <Route path="/Infrastructure" element={<Infrastructure isLoggedIn={isLoggedIn} />} />
            <Route path="/Map" element={<Map isLoggedIn={isLoggedIn} />} />
            <Route path="/Departments" element={<Departments isLoggedIn={isLoggedIn} />} />
            <Route path="/AppealAll" element={<AppealAll />} isLoggedIn={isLoggedIn} />
            <Route path="/Footer" element={<Footer />} isLoggedIn={isLoggedIn} />
            <Route path="/Settlements" element={<Settlements isLoggedIn={isLoggedIn} />} />
            <Route path="/Authorization" element={<Authorization setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/SignUp" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/Search" element={<Search isLoggedIn={isLoggedIn} />} />
            <Route path="/User" element={<User isLoggedIn={isLoggedIn} />} />
            <Route path="/i18n" element={<i18n isLoggedIn={isLoggedIn} />} />
            <Route path="/AllNews" element={<AllNews isLoggedIn={isLoggedIn} />} />
            <Route path="/AllFuture" element={<AllFuture isLoggedIn={isLoggedIn} />} />
            <Route path="/logout" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
