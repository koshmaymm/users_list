import React, { Component } from 'react';

import { Jumbotron, Button } from 'react-bootstrap';

import { USERS_LIST_URL } from '../constants/index';

class MainList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        listOfUsers: [],
        error: null,
      };
  
      this.getUsersListData = this.getUsersListData.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
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
                  listOfUsers: [...this.state.listOfUsers, ...res]
                })
                console.log(res);
              }).catch((err) => {
                console.log(err)
                this.setState({
                  error: err.toString()
                })
              });
    }

    handleClick(item){
      console.log(item);
      console.log(item.id);
    }

    handleDelete(item){
      console.log(`user ${item.id} was deleted`);
    }

    showUsersList() {
      if (this.state.listOfUsers !== 0) {
        return this.state.listOfUsers.map((item) => (
          <Jumbotron key={item.id} className="card_user">
            <h3 onClick={() => this.handleClick(item)} 
                className="firstLastName">
                {item.first_name}&nbsp;
                {item.last_name}
            </h3>
            <h4 className="bDGender">{item.birth_date}&nbsp;{item.gender}</h4>
            <Button
                bsStyle="danger"
                onClick={() => this.handleDelete(item)}
            >
                  DELETE
            </Button>
          </Jumbotron>
        ));
      }
      return <p>You haven`t any users</p>;
    }
  
    render() {

      if (!this.state.listOfUsers) {
        return 'Loading...';
      }

      if (this.state.error) {
        return (
          <h1>
            Some problem with users request
            <br />
            {this.state.error}
          </h1>
        ) 

      }

      return (
        <div>
          <h1>Users Page</h1>
          <br />
          {this.showUsersList()}
        </div>
      );
    }
  }

  export default MainList;