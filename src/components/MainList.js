import React, { Component } from 'react';

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
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://frontend-candidate.dev.sdh.com.ua/v1/contact/', true);
            xhr.send();

            if (xhr.status !== 200) {
                 
                console.log(xhr);
                console.log(xhr.responseText);

            } else {
                console.log(xhr); 
            }
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