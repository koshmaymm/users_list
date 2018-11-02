import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MainList from './components/MainList';
import About from './components/About';
import Contact from './components/Contact';
import Code from './components/Code';

import MainMenu from './nav/MainMenu';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <MainMenu />
          </header>
          <div>
            <Route exact path="/" component={MainList} />
            <Route exact path="/about" component={About} />
            <Route exact path="/code" component={Code} />
            <Route exact path="/contact" component={Contact} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
