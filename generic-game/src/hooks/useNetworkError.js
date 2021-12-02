import { useSelector } from 'react-redux';

export const useNetworkError = () => {
  return useSelector(({ ui }) => {
    const { networkError } = ui;
    return networkError;
  });
};
