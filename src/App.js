import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home'
import Orders from './pages/Orders';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid h-100 App">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/orders" component={Orders} />
            <Route component={() => <h1>NotFound!</h1>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
