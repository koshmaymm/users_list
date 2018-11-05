import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { 
    PageHeader, 
    Button, 
    Form, 
    FormGroup, 
    Col, 
    FormControl, 
    ControlLabel, 
    Checkbox 
} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import moment from "moment";
 
import "react-datepicker/dist/react-datepicker.css";
import { USERS_LIST_URL } from '../constants/index';

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
          startDate: moment(),
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
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeBirthday = this.handleChangeBirthday.bind(this);
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

    handleChange(e) {
        const name = e.target.name;
        let val = e.target.value;
        if (name === "is_active") { val = e.target.checked }
        this.setState({ [name]: val});
    }

    handleChangeBirthday(date){
        this.setState({ 
            birth_date: date.format('YYYY-MM-DD'),
            startDate: date,
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
        if(!this.state.id || !this.state.gender || !this.state.birth_date) {
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
                    This is edit page with data from user ID {this.state.id}
                </PageHeader>

                <Form horizontal>
                    <FormGroup controlId="formHorizontalFirstName">
                        <Col componentClass={ControlLabel} sm={5}>
                            Name
                        </Col>
                        <Col sm={7}>
                            <FormControl 
                                type="text"
                                placeholder="First Name"
                                value={this.state.first_name}
                                onChange={this.handleChange}
                                name="first_name"
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalSurname">
                        <Col componentClass={ControlLabel} sm={5}>
                            Surname
                        </Col>
                        <Col sm={7}>
                            <FormControl 
                                type="text" 
                                placeholder="Surname" 
                                value={this.state.last_name}
                                onChange={this.handleChange}
                                name="last_name"
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalBirthday">
                        <Col componentClass={ControlLabel} sm={5}>
                            Birthday
                        </Col>
                        <Col sm={7}>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChangeBirthday}
                                dateFormat="YYYY-MM-DD"
                                className="datepicker"
                            />
                        </Col>
                    </FormGroup>
                    
                    <FormGroup controlId="formControlsSelect">
                        <Col componentClass={ControlLabel} sm={5}>
                            Gender
                        </Col>
                        <Col sm={7}>
                            <FormControl 
                                componentClass="select" 
                                placeholder="Gender"
                                value={this.state.gender}
                                onChange={this.handleChange}
                                name="gender"
                            >
                                <option value={'male'}>male</option>
                                <option value={'female'}>female</option>
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalJob">
                        <Col componentClass={ControlLabel} sm={5}>
                            Job
                        </Col>
                        <Col sm={7}>
                            <FormControl 
                                type="text"
                                placeholder="Job"
                                value={this.state.job}
                                onChange={this.handleChange}
                                name="job"
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalBiography">
                        <Col componentClass={ControlLabel} sm={5}>
                            <ControlLabel>Biography</ControlLabel>
                        </Col>
                        <Col sm={7}>
                            <FormControl
                                componentClass="textarea" 
                                placeholder="Biography"
                                value={this.state.biography}
                                onChange={this.handleChange}
                                name="biography"
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={5}>
                            <ControlLabel>Status</ControlLabel>
                        </Col>
                        <Col sm={7}>
                            <Checkbox 
                                inline 
                                checked={this.state.is_active === true}
                                onChange={this.handleChange}
                                name="is_active"
                            >
                                Active
                            </Checkbox>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={5} sm={5}>
                            <Button type="submit" bsStyle="success">Save Info</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Fragment>
        )
    }
}
export default EditUser;