import Spinner from '../components/ui/loaders/Spinner';
import { useAuth } from '../hooks';

export const GamePage = () => {
  const { established, authenticated } = useAuth();
  return (
    <div className="p-4 container mx-auto">
      {!established ? (
        <Spinner></Spinner>
      ) : authenticated ? (
        'Play'
      ) : (
        'Log in to play'
      )}
    </div>
  );
};

export default GamePage;
