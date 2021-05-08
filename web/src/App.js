import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Home from './Home.js';
import Input from './Input.js';

// const Switcher = () => {
//   <>
//     <Switch>
      
//     </Switch>
//   </>
// }

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/:room" component={Input} />
      </Router>
    );
  }
}

export default App;
