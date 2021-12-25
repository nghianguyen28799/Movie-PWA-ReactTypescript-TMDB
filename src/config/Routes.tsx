import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PlayMovie from "../components/PlayMovie/PlayMovie";
import Catelog from "../pages/Catelog/Catelog";
import Detail from "../pages/Detail/Detail";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";

const Routes = () => {
  return (
    <Switch>
      
      <Route path="/home" exact component={Home} />
      <Route path="/playvideo/:category/:id" exact component={PlayMovie} />
      <Route path="/" exact={true}>
      {/* <Route path="/:category/search/:keyword" exact component={Catelog} />
      <Route path="/:category/:keyword" exact component={Detail} />
      <Route path="/:category" exact component={Catelog} /> */}
        <Redirect to="/home" />
      </Route>
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default Routes;
