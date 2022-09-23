import { initStore } from "./store";

const configureStore = () => {
  const actions = {
    getQuotes: (curState, quotes) => {
      console.log(quotes);
      console.log(curState);
      curState = quotes;

      return { quotes: quotes };
    },
    addQuote: (curState, newQuote) => {
      return { ...curState, ...newQuote };
    },
  };

  initStore(actions, {
    quotes: [],
  });
};

export default configureStore;
