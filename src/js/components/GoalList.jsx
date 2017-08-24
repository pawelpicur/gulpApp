import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goalRef } from '../firebase';
import { setGoals } from '../actions';

class GoalList extends Component {

    componentDidMount() {
        goalRef.on('value', snap => {
            let goals = [];
            snap.forEach(goal => {
                const { email, title } = goal.val();
                goals.push({ email, title });
            })
            console.log('goals', goals)
            this.props.setGoals(goals);
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
    }

    render() {
        console.log('this.props.goals', this.props.goals);
        return (
            <div className='form-inline'>
                <div>
                    goal list
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) { 
    const { goals } = state;
    return {
        goals
    }
}
export default connect(mapStateToProps, { setGoals })(GoalList);
