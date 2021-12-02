import { SiLetterboxd } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '../ui/Button';
import { requestSignOut, requestSignIn } from '../../actions/creators/auth';
import { FaUserAlt } from 'react-icons/fa';
import { Spinner } from '../ui/loaders';
import { useAuth } from '../../hooks';
import { useNetworkError } from '../../hooks/useNetworkError';

export const Header = () => {
  const dispatch = useDispatch();
  const { authenticated, established, user } = useAuth();
  const networkError = useNetworkError();
  const refreshPage = () => {
    window.location.reload(false);
  };
  const renderUserControls = () => {
    if (!established) {
      return <Spinner></Spinner>;
    }

    if (authenticated) {
      const username = user.firstName;
      return (
        <>
          <Link to="/profile" title={`Hello ${username}, go to profile.`}>
            <Button element="span" className="inline-flex h-full items-center">
              <FaUserAlt></FaUserAlt>
            </Button>
          </Link>

          <Button
            skin="primaryInverted"
            type="button"
            title="Log out"
            onClick={() => {
              dispatch(requestSignOut());
            }}
            className="ml-2"
          >
            Log out
          </Button>
        </>
      );
    } else {
      return (
        <Button
          type="button"
          title="Log in"
          onClick={() => {
            dispatch(requestSignIn());
          }}
          className="drilldown demo"
        >
          Log in
        </Button>
      );
    }
  };

  return (
    <header className="shadow p-4">
      {networkError.length !== 0 ? (
        <div className="flex justify-between mb-5 bg-black text-white">
          {networkError}
          <Button
            type="button"
            title="Reload"
            className="mr-5 mt-1 mb-1"
            onClick={refreshPage}
          >
            Reload
          </Button>
        </div>
      ) : (
        <></>
      )}
      <div className="container mx-auto flex justify-between items-center">
        <header>
          <h1 className="uppercase text-lg font-bold">
            <Link to="/" title="Go home" className="flex items-center">
              <SiLetterboxd className="mr-2"></SiLetterboxd>
              Word Game
            </Link>
          </h1>
        </header>

        <div>{renderUserControls()}</div>
      </div>
    </header>
  );
};

export default Header;
