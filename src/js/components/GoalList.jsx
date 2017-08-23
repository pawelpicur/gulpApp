import React, { Component } from 'react';
import { goalRef } from '../firebase';


class GoalList extends Component {

    componentDidMount() {
        goalRef.on('value', snap => {
            let goals = [];
            snap.forEach(goal => {
                const { email, title } = goal.val();
                goals.push({ email, title });
            })
            console.log('goals', goals)
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
    }

    render() {
        return (
            <div className='form-inline'>
                <div>
                    goal list
                </div>
            </div>
        )
    }
}
export default GoalList;
