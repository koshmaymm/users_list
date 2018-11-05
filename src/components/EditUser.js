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

const smallLength = 256;
const biographyLength = 1024;
class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
          startDate: moment(),
          error_request: null,
          errors: {},
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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getUserId();
    }

    getUserId() {
        const id = this.props.match.params.id;
        if(id) {
            this.setState({ id }, () => {
                this.getUserData();
            });
        } else {
            this.setState({
                id: null,
                first_name: '',
                last_name: '',
                birth_date: this.state.startDate.format('YYYY-MM-DD'),
                gender: 'male',
                job: '',
                biography: '',
                is_active: true,
            });
        }
    }

    handleChange(e) {
        const name = e.target.name;
        let val = e.target.value;
        if (name === "is_active") { val = e.target.checked }
        this.setState({ 
            [name]: val,
            errors: {}
        });
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
                  error_request: err.toString()
                })
            });
        }
    }

    setEditInfo() {
        const { first_name, last_name, birth_date, gender, job, biography, is_active ,id } = this.state;

        if(id === null) {
            const userObjInfo = {
                first_name,
                last_name,
                birth_date,
                gender,
                job,
                biography,
                is_active,
            }

            axios({
                method: 'post',
                url: `${USERS_LIST_URL}`,
                data: userObjInfo
              })
            .catch((err) => {
                this.setState({
                  error_request: err.toString()
                })
            });
            
        } else {
            const userObjInfo = {
                first_name,
                last_name,
                birth_date,
                gender,
                job,
                biography,
                is_active,
                id,
            }

            axios({
                method: 'put',
                url: `${USERS_LIST_URL}${id}/`,
                data: userObjInfo
              })
            .catch((err) => {
                this.setState({
                  error_request: err.toString()
                })
            });
        }
    }

    handleSubmit(event){
        event.preventDefault();
        const fields = this.state;
        if(fields.first_name.length > smallLength || fields.first_name.length === 0) {
            this.setState({
                errors: {
                    first_name:`Name should be less then 
                                ${smallLength}
                                symbols and bigger then 0`
                } 
            }); 
        } else if(fields.last_name.length > smallLength || fields.last_name.length === 0) {
            this.setState({
                errors: {
                    last_name:`Surname should be less then
                    ${smallLength}
                    symbols and bigger then 0`
                } 
            }); 
        } else if(fields.job.length > smallLength || fields.job.length === 0) {
            this.setState({
                errors: {
                    job:`Job should be less then 
                    ${smallLength} 
                    symbols and bigger then 0`
                } 
            }); 
        } else if(fields.biography.length > biographyLength || fields.biography.length === 0) {
            this.setState({
                errors: {
                    biography:`Biography should be less then 
                                ${biographyLength} 
                                symbols and bigger then 0`
                } 
            }); 
        } else {
            this.setState({ 
                errors: {}
            }, () => {
                this.setEditInfo();
            });
        }        
    }

    render() {
        if(!this.state.gender || !this.state.birth_date) {
            return "Loading"
        }
        
        if(this.state.error_request) {
            return (
                <h1>
                  Some problem with user data request
                  <br />
                  {this.state.error_request}
                </h1>
            )
        }

        return (
            <Fragment>
                <PageHeader className="user_header">
                    This is page of Edit/New User
                </PageHeader>

                <Form horizontal onSubmit={(e) => this.handleSubmit(e)}>
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
                                maxLength="256"
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
                                maxLength="256"
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalBirthday">
                        <Col componentClass={ControlLabel} sm={5}>
                            Birthday
                        </Col>
                        <Col sm={7}>
                            <DatePicker
                                value={this.state.birth_date}
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
                                maxLength="256"
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
                                maxLength="1024"
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

                    <FormGroup>
                        <Col smOffset={5} sm={7}>
                            {this.state.errors.first_name}
                            {this.state.errors.last_name}
                            {this.state.errors.job}
                            {this.state.errors.biography}
                        </Col>
                    </FormGroup>
                </Form>
            </Fragment>
        )
    }
}
export default EditUser;