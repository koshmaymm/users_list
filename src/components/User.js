import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PageHeader, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { USERS_LIST_URL } from '../constants/index';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          id: null,
          first_name: null,
          last_name: null,
          birth_date: null,
          gender: null,
          job: null,
          biography: null,
          is_active: null,
        };
    
        this.getUserId = this.getUserId.bind(this);
        this.getUserData = this.getUserData.bind(this);
    }

    componentDidMount() {
        this.getUserId();
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
            .then(response => {
                const data = response.data;
                this.setState({ 
                    id: data.id,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    birth_date: data.birth_date,
                    gender: data.gender,
                    job: data.job,
                    biography: data.biography,
                    is_active: data.is_active,
                });
            })
            .catch((err) => {
                this.setState({
                  error: err.toString()
                })
            });
        }
    }

    render() {
        if(!this.state.id) {
            return "Loading"
        }

        if(this.state.error) {
            return (
                <h1>
                  Some problem with user data request
                  <br />
                  {this.state.error}
                </h1>
            )
        }

        return (
            <Fragment>
                <PageHeader className="user_header">
                    This is page of user ID {this.state.id}
                </PageHeader>
                <ListGroup>
                    <ListGroupItem header="First Name">
                        {this.state.first_name}
                    </ListGroupItem>
                    <ListGroupItem header="Last Name">
                        {this.state.last_name}
                    </ListGroupItem>
                    <ListGroupItem header="Birth day">
                        {this.state.birth_date}
                    </ListGroupItem>
                    <ListGroupItem header="Gender">
                        {this.state.gender}
                    </ListGroupItem>
                    <ListGroupItem header="Job">
                        {this.state.job}
                    </ListGroupItem>
                    <ListGroupItem header="Biography">
                        {this.state.biography}
                    </ListGroupItem>
                    <ListGroupItem header="Status">
                        {(!this.state.is_active && "inactive") || "active"}
                    </ListGroupItem>
                    <ListGroupItem bsStyle="warning">
                        <Button bsStyle="warning">
                            <Link to={`/edit-user/${this.state.id}`}>
                                Edit
                            </Link>
                        </Button>
                    </ListGroupItem>
                    <ListGroupItem bsStyle="danger">
                        <Button bsStyle="danger">DELETE</Button>
                    </ListGroupItem>
                </ListGroup>
            </Fragment>
        )
    }
}
export default User;