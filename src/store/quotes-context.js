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
    const addRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/add-quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            author: newQuote.author,
            content: newQuote.content,
          }),
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error("Unknown error occurred, please try again.");
        }
      } catch (err) {}
    };
    addRequest();
  };

  const handleDeleteQuote = (id) => {
    setIsLoading(true);
    const deleteRequest = async () => {
      const response = await fetch(`http://localhost:5000/${id}/delete-quote`, {
        method: "DELETE",
      });
      const data = await response.json();
    };

    deleteRequest().then(() => {
      getAllRequest();
    });

    setIsLoading(false);
  };

  const handleAddComment = (id, newComment) => {
    let editedQuote;
    const currentQuote = quotes.find((quote) => quote._id === id);

    if (currentQuote) {
      editedQuote = currentQuote.comments.push({
        name: newComment.name.value,
        comment: newComment.comment.value,
      });
    }
  };

  const getAllRequest = useCallback(async () => {
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

      history.push("/quotes");

      if (!response.ok) {
        throw new Error("error");
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }, [props]);

  useEffect(() => {
    getAllRequest();
  }, [getAllRequest]);

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
