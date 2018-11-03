import React, { Component } from 'react';
import { USERS_LIST_URL } from '../constants/index';

class MainList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        list_of_users: null,
      };
  
      this.getUsersList = this.getUsersList.bind(this);
    }
  
    componentDidMount() {
      this.getUsersList();
    }
  
    getUsersList() {
            fetch(USERS_LIST_URL)
              .then(res => {
              return res.json()
            }).then(res => {
                console.log(res);
                this.setState({
                  list_of_users: res,
                })
              }).catch((error) => {
                console.log(error)
              } );
    }
  
    render() {
      if (!this.state.list_of_users) {
        return 'Loading...';
      }
      return (
        <h2>This is MainList Page</h2>
      );
    }
  }

  export default MainList;