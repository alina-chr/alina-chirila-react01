import { useSelector } from 'react-redux';

export const useAuth = () => {
  return useSelector(({ auth }) => {
    return {
      ...auth,
    };
  });
};
//obiect cu toate cheile de pe stare
