import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Navigation/Header";
import NewQuotePage from "./Pages/NewQuotePage";
import AllQuotes from "./components/AllQuotes/AllQuotes";
import { Fragment } from "react";
import Comments from "./components/Comments/Comments";
import MarkedQuotePage from "./Pages/MarkedQuotePage";

function App() {
  return (
    <Fragment>
      <Header />
      <main>
        <Switch>
          <Route path="/quotes" exact>
            <AllQuotes />
          </Route>
          <Route path="/:quoteId">
            <Route path="/:quoteId/comments"></Route>
          </Route>
          <Route path="/new-quote" exact>
            <NewQuotePage />
          </Route>

          <Redirect to="/quotes" />
        </Switch>
      </main>
      <footer className="footer">
        <p>Make Contect : 0524563239</p>
        <p>all-right-reserved</p>
      </footer>
    </Fragment>
  );
}

export default App;
