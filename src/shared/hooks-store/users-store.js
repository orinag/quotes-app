import { initStore } from "./store";

const configureStore = () => {
  const actions = {
    getUsers: (curState, users) => {
      const newState = {
        ...curState,
        users: users,
      };
      return newState;
    },
    getUserById: (curState, user) => {
      const newState = {
        ...curState,
        singleUser: user,
      };
      return newState;
    },
  };

  initStore(actions, {
    users: [],
    singleUser: {},
    currentQuotes: [],
  });
};

export default configureStore;
