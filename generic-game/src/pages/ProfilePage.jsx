import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { requestDeleteUserStats } from '../actions/creators/auth';
import { Authorize } from '../components/auth';
import { ProfileForm, Creature } from '../components/profile';
import { UserProfile } from '../components/profile/UserProfile';
import { Button } from '../components/ui';
import { useAuth } from '../hooks';

export const ProfilePage = () => {
  const history = useHistory();
  const { authenticated, established, user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authenticated && established) {
      history.push('/');
    }
  }, [authenticated, history, established]);

  return (
    <Authorize>
      <div className="container mx-auto p-4">
        <header></header>

        <section className="flex justify-between flex-wrap mt-8">
          <div className="w-full md:w-8/12">
            {/* create UserProfile component, and populate it with info from the store */}
            <UserProfile></UserProfile>
            <div className="text-center">
              <Button
                type="button"
                title="Delete my data"
                className="mt-5"
                skin="secondary"
                onClick={() => dispatch(requestDeleteUserStats(user))}
              >
                Forget my data
              </Button>
            </div>
          </div>

          <div className="w-full md:w-4/12 flex justify-center mt-8 md:mt-0">
            <Creature></Creature>
          </div>
        </section>

        {established ? (
          <section className="mt-4 md:w-1/4 md:mt-12 mx-auto">
            <ProfileForm></ProfileForm>
          </section>
        ) : (
          '...logging you in'
        )}
      </div>
    </Authorize>
  );
};

export default ProfilePage;
