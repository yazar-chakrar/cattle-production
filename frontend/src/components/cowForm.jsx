import React, {Component} from 'react';
import Joi from "joi-browser";
import { getMovie } from '../services/fakeMovieService';
import { saveMovie } from './../services/fakeMovieService';
class CowForm extends Component {
    state = {
        data: {
            cowregnumber:"",
            cowbreed:"",
            cowdate:""
        },
        breeds: [],
        errors: {}
    };

    schema ={
        _id: Joi.string(),
        registerNumber: Joi.number().min(100000000).max(999999999).required().label("Register Number"),
        dateIn: Joi.date().label("Date In"),
        breed: Joi.string().required().label("Breed")
    };
    componentDidMount() {
        const breeds = ['Action', 'Thriller', 'Montbeliard', 'Holstein']
        this.setState({breeds})
    };

    doSubmit =()=>{
        saveMovie(this.state.data);
        this.props.history.push("/cows")
    }
    handleSubmit = e =>{
        e.preventDefault();

        //
        const cowregnumber = document.getElementById('cowregnumber').value;
        const cowbreed = document.getElementById('cowbreed').value;
        const cowdate = document.getElementById('cowdate').value;
        console.log('Submitted', cowregnumber, cowbreed, cowdate)
    }

    render(){
        return (
            <div>
                <h1>Add cow</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="cowregnumber">Register Number</label>
                        <input id="cowregnumber" type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cowbreed">Breed</label>
                        <input id="cowbreed" type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cowdate">Date</label>
                        <input id="cowdate" type="text" className="form-control" />
                    </div>
                    <button className="btn btn-primary">Add cow</button>
                </form>
            </div>)
    }
}

export default CowForm