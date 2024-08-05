import { createContext, useContext, useState, useEffect, useRef } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import AllRoutes from './pages/AllRoutes';
import Sidebar from './components/Sidebar/Sidebar';
import Popup from './components/Popup/Popup';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';

const UserContext = createContext();

function App() {

  // Theme
  const [isDarkTheme, setIsDarkTheme] = useState(localStorage.getItem('theme') === 'dark-theme');

  const toggleTheme = () => {
    setIsDarkTheme((prevState) => !prevState);
  };

  useEffect(() => {
    localStorage.setItem('theme', (isDarkTheme) ? 'dark-theme' : 'light-theme');
  }, [isDarkTheme]);

  // Mobile Sidebar

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  // Popups

  // Sign In

  const [isSigninOpen, setIsSigninOpen] = useState(false);

  const toggleSignin = () => {
    setIsSigninOpen((prevState) => !prevState);
  };

  // Sign Up

  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const toggleSignup = () => {
    setIsSignupOpen((prevState) => !prevState);
  };

  // Switch Auth

  const switchAuth = () => {
    toggleSignin();
    toggleSignup();
  };

  // Logged in 

  const [loggedUserDetails, setLoggedUserDetails] = useState({});

  const getUserDetails = async (url, jwtToken) => {
    if (!jwtToken) {
      return;
    }
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        }
      });
      const resJson = await res.json();
      setLoggedUserDetails(resJson.data)
    }
    catch (err) {
      console.log(err.message);
    }
  };

  // Logout

  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const toggleLogoutPanel = () => {
    setIsLogoutOpen((prevState) => !prevState);
  };

  const logout = () => {
    localStorage.removeItem('jwt-token');
    setLoggedUserDetails({});
    setIsLogoutOpen(false);
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwt-token');
    const url = `${import.meta.env.VITE_API_URL}users/view`;
    getUserDetails(url, jwtToken);
  }, []);

  return (
    <UserContext.Provider value={{
      isDarkTheme,
      toggleTheme,
      sidebarRef,
      isSidebarOpen,
      toggleSidebar,
      toggleSignin,
      toggleSignup,
      switchAuth,
      loggedUserDetails,
      setLoggedUserDetails,
      logout,
      isLogoutOpen,
      toggleLogoutPanel
    }}>
      <Navbar />
      <AllRoutes />
      {
        isSidebarOpen && <Sidebar />
      }
      {
        isSigninOpen &&
        (
          <Popup popupToggle={toggleSignin}>
            <SignIn />
          </Popup>
        )
      }
      {
        isSignupOpen &&
        (
          <Popup popupToggle={toggleSignup}>
            <SignUp />
          </Popup>
        )
      }

    </UserContext.Provider>
  )
}

export const useContextAPI = () => useContext(UserContext);
export default App;
