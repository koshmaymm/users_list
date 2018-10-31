import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// import Home from './components/Home';

const Home = () => (
  <div>
    Home
  </div>
)

const About = () => (
  <div>
    About
  </div>
)

const Code = () => (
  <div>
    Code
  </div>
)

const Contact = () => (
  <div>
    Contact
  </div>
)

const info = () => (
  <div>
    info
  </div>
)

const MainMenu = () => {
  return (
    <div>
      <Link to="/">
        <button>home</button>
      </Link>
      <Link to="/about">
        <button>About</button>
      </Link>
      <Link to="/code">
        <button>code</button>
      </Link>
      <Link to="/contact">
        <button>contact</button>
      </Link>
    </div>
  );
};


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to React</h1>
              <MainMenu />
          </header>
          <div>
            <Route exact path="/" component={Home} />
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
