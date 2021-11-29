import { useSelector } from 'react-redux';

export const useProfilecolors = () => {
  const creature = useSelector(({ profile }) => {
    return profile.creature;
  });
  return creature;
};

export default useProfilecolors;

//selector functions are memoized in state slices in modern redux
