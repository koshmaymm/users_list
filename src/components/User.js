import React, { Component } from 'react';

import axios from 'axios'

import { USERS_LIST_URL } from '../constants/index';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          id: null,
          userData: null,
        };
    
        this.getUserId = this.getUserId.bind(this);
        this.getUserData = this.getUserData.bind(this);
    }

    componentDidMount() {
        this.getUserId();
        this.getUserData();
    }

    getUserId() {
        const id = this.props.match.params.id;
        this.setState({ id }, () => {
            this.getUserData();
        });
        
    }

    getUserData() {
        if(this.state.id !== null) {
            axios.get(`${USERS_LIST_URL}${this.state.id}`)
            .then(response => console.log(response))
        }
    }

    render() {
        if(!this.state.id) {
            return "Loading"
        }

        return(
            <h1>This is User Page with ID {this.state.id}</h1>
        )
    }
}
export default User;