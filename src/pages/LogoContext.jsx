import React, { createContext, useState } from 'react';
import Logo from '../images/Logo.png'

const LogoContext = createContext();

export const LogoProvider = ({ children }) => {
  const [imageUrl, setImageUrl] = useState(Logo);

  return (
    <LogoContext.Provider value={{ imageUrl, setImageUrl }}>
      {children}
    </LogoContext.Provider>
  );
};

export default LogoContext;
