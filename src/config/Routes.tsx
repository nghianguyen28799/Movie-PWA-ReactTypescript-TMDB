import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PlayMovie from "../components/PlayMovie/PlayMovie";
import Category from "../pages/Category/Category";
import Home from "../pages/Home/Home";
import MultipleSearch from "../pages/MultipleSearch/MultipleSearch";
import NotFound from "../pages/NotFound/NotFound";

const Routes = () => {
  return (
    <Switch>
      <Route path="/home" exact component={Home} />
      <Route path="/playvideo/:category/:id" exact component={PlayMovie} />
      <Route path="/library/:category" exact component={Category} />
      <Route path="/search/query=:query" exact component={MultipleSearch} />
      <Route path="/" exact={true}>
        <Redirect to="/home" />
      </Route>
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default Routes;
