import { initializeGoogleAuth } from '../../../api/googleAuth';
import { readUser, readUsers } from '../../../api/users';
import {
  deleteUserProfile,
  deleteUserStats,
  getUserProfile,
  getUserStats,
  postUserProfile,
  postUserStats,
} from '../profile';
import { setNetworkError } from '../ui';
import {
  AUTH_LOGOUT,
  AUTH_LOGIN,
  SET_USERS,
  SET_USER,
} from './../../types/auth';

export const login = (user) => {
  return async (dispatch) => {
    const { id } = user;

    // read
    // determine if user is there
    // if not, create
    try {
      await dispatch(getUserStats(id));
    } catch (response) {
      const { status: httpStatus } = response;

      if (httpStatus === 404) {
        await dispatch(postUserStats(id));
      }

      if (httpStatus === 500) {
        await dispatch(setNetworkError('500 Internal Server Error...'));
      }
    }

    // read profile
    // determine if user has a profile
    // if not, create
    try {
      // dispatch getUserProfile
      await dispatch(getUserProfile(id));
      //!test setNetworkError
      // await dispatch(postUserProfile(id));
    } catch (response) {
      // dispatch postUserProfile
      const { status: httpStatus } = response;
      if (httpStatus === 404) {
        await dispatch(postUserProfile(id));
      }
      if (httpStatus === 500) {
        await dispatch(setNetworkError('500 Internal Server Error...'));
      }
    }

    dispatch(setLogin(user));
  };
};

export const setLogin = (user) => {
  return {
    type: AUTH_LOGIN,
    payload: user,
  };
};

export const logout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

export const requestSignIn = () => {
  return async () => {
    return initializeGoogleAuth().then((GoogleAuth) => {
      GoogleAuth.signIn();
    });
  };
};

export const requestSignOut = () => {
  return async () => {
    return initializeGoogleAuth().then((GoogleAuth) => {
      GoogleAuth.signOut();
    });
  };
};

export const requestDeleteUserStats = (user) => {
  return async (dispatch) => {
    const { id } = user;
    try {
      await dispatch(deleteUserStats(id));
    } catch (response) {
      const { status: httpStatus } = response;
      if (httpStatus === 404) {
        await dispatch(setNetworkError(` 404 Error ... `));
      }
    }

    try {
      await dispatch(deleteUserProfile(id));
    } catch (response) {
      const { status: httpStatus } = response;
      if (httpStatus === 404) {
        await dispatch(setNetworkError(` 404 Error ...`));
      }
    }
    dispatch(requestSignOut());
  };
};

// should be in a users slice!!!
export const getUsers = (force = false) => {
  return async (dispatch, getState) => {
    const state = getState();
    const cached = state.users.cached;

    if (cached === true && force === false) {
      return;
    }

    try {
      const users = await readUsers();

      dispatch(setUsers(users));
    } catch (response) {
      console.log(response);
    }
  };
};

// shuld be in user slice
export const getUser = (userId, force = false) => {
  return async (dispatch, getState) => {
    const state = getState();
    const user = state.users.entities[userId];

    if (user !== undefined && force === false) {
      return;
    }

    try {
      const stats = await readUser(userId);

      dispatch(
        setUser({
          id: userId,
          stats,
        }),
      );
    } catch (response) {
      console.log(response);
    }
  };
};

// should be in a users slice!!!
export const setUsers = (users) => {
  return {
    type: SET_USERS,
    payload: users,
  };
};

// should be in a users slice!!!
export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};
