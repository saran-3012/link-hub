import { createContext, useContext, useState, useEffect, useRef } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import AllRoutes from './pages/AllRoutes';
import Sidebar from './components/Sidebar/Sidebar';
import Popup from './components/Popup/Popup';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import EditProfile from './components/EditProfile/EditProfile';

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

  // Logged in 

  const [loggedUserDetails, setLoggedUserDetails] = useState({
    bio : "",
    email : "",
    id : "",
    name : "",
    profession : "",
    username : "",
    views : 0
  });

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
      setLoggedUserDetails(resJson.data);
      setIsSignupOpen(false);
      setIsSigninOpen(false);
    }
    catch (err) {
      console.log(err.message);
    }
  };

  // Popups

  // Sign In

  const [isSigninOpen, setIsSigninOpen] = useState(false);

  const toggleSignin = () => {
    if (loggedUserDetails?.name && !isSigninOpen) {
      return;
    }
    setIsSigninOpen((prevState) => !prevState);
  };

  // Sign Up

  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const toggleSignup = () => {
    if (loggedUserDetails?.name && !isSignupOpen) {
      return;
    }
    setIsSignupOpen((prevState) => !prevState);
  };

  // Switch Auth

  const switchAuth = () => {
    toggleSignin();
    toggleSignup();
  };

  // Logout

  const logout = () => {
    localStorage.removeItem('jwt-token');
    setLoggedUserDetails({});
  };

  // Check if already logged in

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwt-token');
    const url = `${import.meta.env.VITE_API_URL}users/view`;
    getUserDetails(url, jwtToken);
  }, []);

  // User profile edit mode

  const [isProfileEditMode, setIsProfileEditMode] = useState(false);

  const toggleProfileEditMode = () => {
    setIsProfileEditMode((prevState) => !prevState);
  };

  // User links

  const [userLinks, setUserLinks] = useState([]);

  // Add Link

  const [isAddLinkOpen, setIsAddLinkOpen] = useState(false);

  const toggleAddLinkOpen = () => {
    setIsAddLinkOpen((prevState) => !prevState);
  };

  // Edit Link

  const [editLinkDetails, setEditLinkDetails] = useState({});

  // Delete Link

  const [deleteLinkDetails, setDeleteLinkDetails] = useState({});

  // Share Link

  const [isShareLinkOpen, setIsShareLinkOpen] = useState(false);

  const toggleShareLinkOpen = () => {
    setIsShareLinkOpen((prevState) => !prevState);
  };

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
      isProfileEditMode,
      toggleProfileEditMode,
      userLinks,
      setUserLinks,
      isAddLinkOpen,
      toggleAddLinkOpen,
      editLinkDetails,
      setEditLinkDetails,
      deleteLinkDetails,
      setDeleteLinkDetails,
      isShareLinkOpen,
      toggleShareLinkOpen
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
      {
        isProfileEditMode &&
        (
          <Popup popupToggle={toggleProfileEditMode}>
            <EditProfile />
          </Popup>
        )
      }

    </UserContext.Provider>
  )
}

export const useContextAPI = () => useContext(UserContext);
export default App;
