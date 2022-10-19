import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./shared/components/Navigation/Header";
import NewQuotePage from "./quotes/pages/NewQuotePage";
import AllQuotes from "./quotes/components/AllQuotes/AllQuotes";
import { Fragment, useEffect } from "react";
import configureQuotesStore from "./shared/hooks-store/quotes-store";
import configureAuthStore from "./shared/hooks-store/auth-store";
import AuthPage from "./users/pages/AuthPage";
import UserPage from "./users/pages/UserPage";
import { useStore } from "./shared/hooks-store/store";

configureAuthStore();
configureQuotesStore();
function App() {
  const dispatch = useStore()[1];

  useEffect(() => {
    
    const storedData = JSON.parse(localStorage.getItem("userData"));
    
    if (storedData && storedData.token) {
      dispatch("login", storedData);
    }
  }, []);
  return (
    <Fragment>
      <Header />
      <main>
        <Switch>
          <Route path="/auth" exact>
            <AuthPage />
          </Route>

          <Route path="/new-quote" exact>
            <NewQuotePage />
          </Route>
          <Route path="/my-account" exact>
            <UserPage />
          </Route>
          <Route path="/" exact>
            <AllQuotes />
          </Route>
          <Redirect to={"/"} />
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
