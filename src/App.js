/*
this project is consist from 4 pahe 
1-home
2-choose between Note and wallet 
3-wallet page 
4-Note page 
//////
the user can register in sginup page and can log in if user has an account befor 
the application is connecte to the database to get the data of note and wallet after save in in mongodb 
;*/

import { useContext, Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NoteApp from "./Note Components/NoteApp";
import Layout from "./components/Layout/Layout";

import AuthPage from "./pages/LoginAndSignUpPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./store of browser provider/auth-context";
import ChooseGat from "./components/ChooseBetween/ChooseGat";
import Wallet from "./Wallet Components/WalletApp";
function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Fragment>
          <div className="main-wrapper">
            <Route path="/" exact>
              <HomePage />
            </Route>
            {!authCtx.isLoggedIn && (
              <Route path="/auth">
                <AuthPage />
              </Route>
            )}

            <Route path="/choosePage">
              {authCtx.isLoggedIn && <ChooseGat />}
              {!authCtx.isLoggedIn && <Redirect to="/auth" />}
            </Route>
            <Route path="/NotOrWallet">
              {authCtx.categoryType === "wallet" && <Wallet />}
              {authCtx.categoryType === "note" && <NoteApp />}
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </div>
        </Fragment>
      </Switch>
    </Layout>
  );
}

export default App;
