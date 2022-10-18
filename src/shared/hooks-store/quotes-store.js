import { initStore } from "./store";

const configureStore = () => {
  const actions = {
    getQuotes: (curState, quotes) => {
      curState = quotes;

      return { quotes: quotes };
    },
    addQuote: (curState, newQuote) => {
      return { ...curState, ...newQuote };
    },
    deleteQuote: (curState, quoteId) => {
      return { ...curState };
    },
  };

  initStore(actions, {
    quotes: [],
  });
};

export default configureStore;
