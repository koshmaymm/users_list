import React, { Component } from 'react';

import { Jumbotron, Button } from 'react-bootstrap';

import { USERS_LIST_URL } from '../constants/index';

class MainList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        listOfUsers: null,
      };
  
      this.getUsersListData = this.getUsersListData.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }
  
    componentDidMount() {
      this.getUsersListData();
    }
  
    getUsersListData() {
            fetch(USERS_LIST_URL)
              .then(res => {
              return res.json()
            }).then(res => {
                this.setState({
                  listOfUsers: res,
                })
                console.log(res);
              }).catch((error) => {
                console.log(error)
              });
    }

    handleClick(item){
      console.log(item);
      console.log(item.id);
    }

    showUsersList() {
      if (this.state.listOfUsers !== 0) {
        return this.state.listOfUsers.map((item) => (
          <Jumbotron key={item.id}>
            <h3 onClick={() => this.handleClick(item)} className="firstLastName">{item.first_name} {item.last_name}</h3>
            <h4 className="bDGender">{item.birth_date} {item.gender}</h4>
            <Button bsStyle="danger">DELETE</Button>
          </Jumbotron>
        ));
      }
      return <p>You haven`t any users</p>;
    }
  
    render() {

      if (!this.state.listOfUsers) {
        return 'Loading...';
      }

      return (
        <h4>{this.showUsersList()}</h4>
      );
    }
  }

  export default MainList;