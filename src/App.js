import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Grid, Col, Row } from 'react-bootstrap';

import MainList from './components/MainList';
import About from './components/About';
import Contact from './components/Contact';
import Code from './components/Code';

import MainMenu from './nav/MainMenu';


class App extends Component {
  render() {
    return (
      <Router>
        <Grid className="App">
          <Row className="App-header">
            <Col xs={12} md={12}>
              <MainMenu />
            </Col>  
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <Route exact path="/" component={MainList} />
              <Route exact path="/about" component={About} />
              <Route exact path="/code" component={Code} />
              <Route exact path="/contact" component={Contact} />
            </Col>
          </Row>
        </Grid>
      </Router>
    );
  }
}

export default App;
