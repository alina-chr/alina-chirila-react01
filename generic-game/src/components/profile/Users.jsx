import { ImUser } from 'react-icons/im';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { Spinner } from '../ui/loaders';

export const Users = () => {
  const users = useSelector((state) => {
    const { entities: users } = state.users;
    return users;
  });

  const { user: currentUser, established, authenticated } = useAuth();

  if (Object.entries(users).length <= 0) {
    return <>no users</>;
  }

  return (
    <ul className="border rounded-md shadow">
      {Object.values(users).map(({ id, stats }) => {
        return (
          <li className="border-b p-3" key={id}>
            {!established ? (
              <Spinner></Spinner>
            ) : !authenticated ? (
              <Link
                to={`ranks/${id}`}
                className="flex justify-between items-center"
              >
                <ImUser></ImUser>
                <span className="truncate inline-block w-32">{id}</span>
                <span>Games played: {stats.gamesPlayed}</span>
              </Link>
            ) : id === currentUser.id ? (
              <Link
                to={`/profile`}
                className="flex justify-between items-center text-green-500"
              >
                <ImUser></ImUser>
                <span className="truncate inline-block w-32">{id}</span>
                <span>Games played: {stats.gamesPlayed}</span>
              </Link>
            ) : (
              <Link
                to={`ranks/${id}`}
                className="flex justify-between items-center"
              >
                <ImUser></ImUser>
                <span className="truncate inline-block w-32">{id}</span>
                <span>Games played: {stats.gamesPlayed}</span>
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Users;
