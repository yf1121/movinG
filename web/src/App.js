import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
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
        <Route exact path="/" component={Input} />
      </Router>
    );
  }
}

export default App;
