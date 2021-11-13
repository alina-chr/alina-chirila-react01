import Spinner from '../components/ui/loaders/Spinner';
import { useAuth } from '../hooks';
import { useDispatch } from 'react-redux';
import { requestSignIn } from '../actions/creators/auth';

export const HomePage = () => {
  const { authenticated, established } = useAuth();
  const dispatch = useDispatch();
  return (
    <div className="p-4 container mx-auto">
      {!established ? (
        <Spinner></Spinner>
      ) : authenticated ? (
        'user logged in'
      ) : (
        <div className="text-center">
          <button
            className="w-75 md:max-w-xl w-3/4 py-20 border rounded-md shadow hover:bg-gray-100"
            type="button"
            title="Login"
            onClick={() => {
              dispatch(requestSignIn());
            }}
          >
            Login to get started
          </button>
        </div>
      )}
    </div>
  );
};
export default HomePage;
