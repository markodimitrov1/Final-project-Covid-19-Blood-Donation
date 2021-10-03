import "./App.css";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import "bootstrap/dist/css/bootstrap.css";
import ProtectedRoute from "./components/protectedroute/ProtectedRoute";
import Profile from "./components/profile/Profile";
import React, { useState } from "react";
import { LoginContext } from "./context/LoginContext";
import Sidebar from "./components/sidebar/Sidebar";
import Donors from "./components/donors/Donors";
import Settings from "./components/settings/Settings";
import UserArticle from "./components/userarticle/UserArticle";
import Articles from "./components/articles/Articles";
import UserDonations from "./components/userdonations/UserDonations";
import { Col, Row } from "react-bootstrap";
import Footer from "./components/footer/Footer";

function App() {
  const [isAut, setIsAuth] = useState(false);
  console.log(isAut);

  return (
    <div className="App">
      <Router>
        <LoginContext.Provider value={{ isAut, setIsAuth }}>
          <Header />
          <div className="Conteinerr">
            {isAut ? (
              <>
                <Sidebar />
                <div className="Container">
                <Switch className="routes">
                  <div>
                    <Route exact path="/" component={Home} />
                    <ProtectedRoute
                      path="/settings"
                      component={Settings}
                      isAuth={isAut}
                    />
                    <ProtectedRoute
                      path="/write"
                      component={UserArticle}
                      isAuth={isAut}
                    />
                    <ProtectedRoute
                      path="/history"
                      component={UserDonations}
                      isAuth={isAut}
                    />
                    <Route path="/donors" component={Donors} />
                    <Route path="/articles" component={Articles} />
                  </div>
                </Switch>
                
                </div>
                
              </>
            ) : (
              <>
                <Switch className="routes">
                 
                    <Route exact path="/" component={Home} />
                    <ProtectedRoute
                      path="/settings"
                      component={Settings}
                      isAuth={isAut}
                    />
                    <ProtectedRoute
                      path="/write"
                      component={UserArticle}
                      isAuth={isAut}
                    />
                    <ProtectedRoute
                      path="/history"
                      component={UserDonations}
                      isAuth={isAut}
                    />
                    <Route path="/donors" component={Donors} />
                    <Route path="/articles" component={Articles} />
                  
                </Switch>
                
              </>
            )}

           
          </div>
         
        </LoginContext.Provider>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
