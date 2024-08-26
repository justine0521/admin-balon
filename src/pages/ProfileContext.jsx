import React, { createContext, useState } from 'react';
import Icon from '../images/defaultProfile.png';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [imageUrl, setImageUrl] = useState(Icon);

  return (
    <ProfileContext.Provider value={{ imageUrl, setImageUrl }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
