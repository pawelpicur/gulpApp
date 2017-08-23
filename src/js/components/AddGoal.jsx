import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goalRef } from '../firebase';


class AddGoal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
    }


    addGoal() {
        console.log('this', this)
        const { title } = this.state;
        const { email } = this.props.user; //props z reduxa
        goalRef.push({email, title});
    }

    render() {
        return (
            <div className='form-inline'>
                <div>
                    <input type="text" placeholder="Add a goal" className="form-control" style={{marginRight: '5px'}} onChange={(event)=> this.setState({title: event.target.value})}/>
                    <button className='btn btn-success' type="button" onClick={()=> this.addGoal()}>Submit</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) { // redux state
    const { user } = state //grab email from state
    return { //return the email
        email
    }
}

export default connect(mapStateToProps, null)(AddGoal) //nie ma action creators, dlatego null jako druga funkcja