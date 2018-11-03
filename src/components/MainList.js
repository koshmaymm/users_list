import React, { Component } from 'react';
import { USERS_LIST_URL } from '../constants/index';

class MainList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        list_of_users: null,
      };
  
      this.getUsersListData = this.getUsersListData.bind(this);
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
                  list_of_users: res,
                })
              }).catch((error) => {
                console.log(error)
              } );
    }

    showUsersList() {
  
      if (this.state.list_of_users !== 0) {
        return this.state.list_of_users.map((item) => (
          <li key={item.id}>
            {item.id}
          </li>
        ));
      }
      return <p>You haven`t any users</p>;
    }
  
    render() {

      if (!this.state.list_of_users) {
        return 'Loading...';
      }

      return (
        <h2>{this.showUsersList()}</h2>
      );
    }
  }

  export default MainList;