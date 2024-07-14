import { createContext, useContext, useState, useEffect } from 'react';
import './App.css';
import AllRoutes from './pages/AllRoutes';

const UserContext = createContext();

function App() {
  
  // Theme
  const [isDarkTheme, setIsDarkTheme] = useState(localStorage.getItem('theme') === 'dark-theme');

  const toggleTheme = () => {
    setIsDarkTheme((prevState) => !prevState);
  };

  useEffect(() => {
    localStorage.setItem('theme', (isDarkTheme)? 'dark-theme': 'light-theme');
  }, [isDarkTheme]);


  return (
    <UserContext.Provider value={{
      isDarkTheme, 
      toggleTheme
      }}>
      <AllRoutes />
    </UserContext.Provider>
  )
}

export const useContextAPI = () => useContext(UserContext);
export default App;
