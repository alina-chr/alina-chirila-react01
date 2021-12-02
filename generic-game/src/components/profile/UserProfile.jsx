import { useAuth } from '../../hooks';
import { HiOutlineMail } from 'react-icons/hi';
import { BiUserCheck } from 'react-icons/bi';

export const UserProfile = () => {
  const { user } = useAuth();

  return (
    <>
      <section className="flex justify-between flex-wrap mt-8">
        <div className="w-full md:w-8/12">
          <h2 className="text-xl bold">User Info</h2>
          <div className="flex flex-col md:flex-row justify-between mt-8">
            <picture className="mr-8 inline-block rounded-full self-center overflow-hidden shadow mb-4 md:mb-0">
              <img
                src={user.avatar}
                alt={`${user.firstName} ${user.lastName}`}
              ></img>
            </picture>
            <ul className="border rounded-md shadow flex-grow">
              <li className="border-b p-3">
                <BiUserCheck className="mr-2"></BiUserCheck>
                {`${user.firstName} ${user.lastName}`}
              </li>
              <li className="border-b p-3">
                <HiOutlineMail className="mr-2"></HiOutlineMail>
                {user.email}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};
