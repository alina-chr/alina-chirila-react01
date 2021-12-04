import { Button } from '.';
import { useNetworkError } from '../../hooks/useNetworkError';

export const NetworkError = () => {
  const networkError = useNetworkError();
  const refreshPage = () => {
    window.location.reload(false);
  };
  return (
    <>
      {networkError.length !== 0 ? (
        <div className="flex justify-between m5 bg-black text-white">
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
    </>
  );
};
