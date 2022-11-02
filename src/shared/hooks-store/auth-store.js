import { initStore } from "./store";

const configureStore = () => {
  const actions = {
    login: (curState, user) => {
      let newState = {
        ...curState,
        currentUser: {
          userId: user.userId,
          email: user.email,
          username: user.username,
        },
        token: user.token,
      };

      return newState;
    },
    logout: () => {
      return {
        currentUser: {},
        token: null,
      };
    },
    signUp: (curState, user) => {
      let newState = {
        ...curState,
        currentUser: {
          userId: user.userId,
          email: user.email,
          username: user.username,
        },
        token: user.token,
      };

      return newState;
    },
    deleteUser: () => {
      localStorage.clear();
      return {
        currentUser: {},
        token: null,
      };
    },
    getQuotesByUser: (curState, quotes) => {
      const newState = {
        ...curState,
        currentQuotes: quotes,
      };

      return newState;
    },
  };

  initStore(actions, {
    currentUser: {},
    token: null,
  });
};

export default configureStore;
