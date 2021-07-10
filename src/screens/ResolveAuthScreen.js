import React, { useEffect, useContext } from 'react';
import { Context as AuthContect } from '../context/AuthContext';

const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContect);

  useEffect(() => {
    tryLocalSignin();
  }, []);

  return null;
};

export default ResolveAuthScreen;
