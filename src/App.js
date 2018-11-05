import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Grid, Col, Row } from 'react-bootstrap';

import MainList from './components/MainList';

import User from './components/User';
import EditUser from './components/EditUser';

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
              <Route path="/users/:id" component={User}/>
              <Route path="/edit-user/:id" component={EditUser}/>
            </Col>
          </Row>
        </Grid>
      </Router>
    );
  }
}

export default App;
