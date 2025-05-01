import { createContext, useContext, useState } from "react";
import LoginPopup from "./LoginPopup";


const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <LoginContext.Provider value={{ isLoginOpen, setIsLoginOpen }}>
      {children}
      {isLoginOpen && <LoginPopup isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
