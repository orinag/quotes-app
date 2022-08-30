import { createContext, useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";

const QuotesContext = createContext({
  allQuotes: [],
  addQuote: () => {},
  deleteQuote: () => {},
  addComment: () => {},
  isLoading: false,
});

export const ContextProvider = (props) => {
  const [quotes, setQuotes] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const handleAddQuote = (newQuote) => {
    setQuotes((prevQuotes) => {
      return [...prevQuotes, newQuote];
    });
  };

  const handleDeleteQuote = (id) => {
    console.log(id);

    const deletedIndex = quotes.findIndex((quote) => quote._id === id);

    const newQuotes = quotes
      .slice(0, deletedIndex)
      .concat(quotes.slice(deletedIndex + 1, quotes.length));
    setQuotes(newQuotes);
    history.push("/quotes");
  };

  const handleAddComment = (id, newComment) => {
    let editedQuote;
    const currentQuote = quotes.find((quote) => quote._id === id);
    console.log(currentQuote);
    if (currentQuote) {
      editedQuote = currentQuote.comments.push({
        name: newComment.name.value,
        comment: newComment.comment.value,
      });
      console.log(currentQuote.comments);
    }
  };

  const sendRequest = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/quotes");

      const data = await response.json();

      setQuotes(
        data.quotes.map((quote) => {
          return {
            _id: quote.id,
            content: quote.content,
            author: quote.author,
            comments: [],
          };
        })
      );

      props.quotesPass(quotes);

      if (!response.ok) {
        throw new Error("error");
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }, [props]);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  return (
    <QuotesContext.Provider
      value={{
        allQuotes: quotes,
        addQuote: handleAddQuote,
        deleteQuote: handleDeleteQuote,
        addComment: handleAddComment,
        isLoading: isLoading,
      }}
    >
      {props.children}
    </QuotesContext.Provider>
  );
};

export default QuotesContext;
