import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Show } from "./Show";
import { Create } from "./Create";
import { Update } from "./Update";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Show} />
          <Route path="/create" component={Create} />
          <Route path="/:id" component={Update} />
        </Switch>
      </Router>
    );
  }
}


export default App;
