import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faSadTear
} from "@fortawesome/free-solid-svg-icons";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";

library.add(faSearch, faSadTear);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid h-100 App d-flex justify-content-center">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/orders" component={Orders} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
