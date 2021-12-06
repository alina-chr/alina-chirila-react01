import { useEffect } from 'react';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser } from '../actions/creators/auth';
import { UserStats } from '../components/profile';
import { useUsers } from '../hooks/useUsers';

export const RankPage = ({ match }) => {
  const dispatch = useDispatch();
  const userId = match.params.id;

  const { users, established } = useUsers();
  const user = users[userId];
  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  // delete this
  if (!user) {
    return <></>;
  }

  return (
    <div className="mx-auto p-4 container">
      {!established ? (
        <>
          <header>
            <h1 className="text-3xl bold">Searching for stats ... </h1>
          </header>
          <section className="mt-8">
            <Link to={`/ranks`} className="flex justify-center items-center">
              <span className="p-2 text-green-500">
                {/* should I use classnames here? */}
                <IoArrowBackCircleSharp></IoArrowBackCircleSharp>
              </span>
              <span>Go Back to Ranks Page</span>
            </Link>
          </section>
        </>
      ) : (
        <>
          <header>
            <h1 className="text-3xl bold">User rank {user.id}</h1>
          </header>
          <section className="mt-8">
            <UserStats {...user.stats}></UserStats>
          </section>
        </>
      )}
    </div>
  );
};

export default RankPage;
