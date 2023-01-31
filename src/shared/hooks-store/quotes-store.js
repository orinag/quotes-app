import { initStore } from "./store";

const configureStore = () => {
  const actions = {
    getQuotes: (curState, quotes) => {
      const newState = curState;
      newState.quotes = quotes;

      return { ...newState };
    },
    addQuote: (curState, newQuote) => {
      const newState = curState;
      newState.quotes.push(newQuote);

      return { ...newState };
    },
    editQuote: (curState, quote) => {
      const quotes = curState.quotes;
      const quoteIndex = curState.quotes.findIndex((q) => q.id === quote.id);
      quotes[quoteIndex] = quote;

      return { ...curState, quotes };
    },
    deleteQuote: (curState, quoteId) => {
      const newState = curState;
      newState.quotes.pop();

      return { ...newState };
    },
  };

  initStore(actions, {
    quotes: [],
  });
};

export default configureStore;
