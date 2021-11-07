import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
export const Logo = () => {
  const { dispatch } = useContext(AppContext);
  const navigateHome = () => {
    dispatch({
      type: 'setScreen',
      payload: 'home',
    });
  };
  return (
    <img
      src="images/sw_logo.png"
      alt="swapi logo"
      className="mb-2"
      onClick={navigateHome}
    />
  );
};
