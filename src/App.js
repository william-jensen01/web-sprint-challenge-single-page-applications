import React from "react";
import Form from './Components/Form';
import Homepage from './Components/Homepage';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <>
    <Switch>
        <Route exact path="/" component={Homepage}/>
        <Route exact path="/pizza" component={Form}/>
    </Switch>
    </>
  );
};
export default App;
