import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session'

import {Questions} from '../api/questions.js';

import Question from './Question.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import Result from './Result.js';

// App component - represents the whole app
class App extends Component {
    constructor(props) {
        super(props);
        // if(Session.get()) {
        Session.set('q_num', 1);
        // }
        this.state = {
            hideCompleted: false,
        };
    }

    handleSubmit(event) {

        let questionNumber = Number(Session.get('q_num')) + 1
        Session.set('q_num', questionNumber);
        event.preventDefault();

        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Meteor.call('questions.insert', 1);

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    toggleHideCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    }

    yesSubmit(event) {
        let questionNumber = Number(Session.get('q_num'));
        Meteor.call('questions.insert', questionNumber, 1);
        event.preventDefault();
        Session.set('q_num', questionNumber + 1);
    }

    noSubmit(event) {
        let questionNumber = Number(Session.get('q_num'));
        Meteor.call('questions.insert', questionNumber, 0);
        event.preventDefault();
        Session.set('q_num', questionNumber + 1);
    }

    renderResult() {
        let list = [];

        for (let index = 1; 10 >= index; ++index) {
            list.push(<Result key={ index } questionNumber={ index }/>)
        }

        return(
            <div>
                { list }
            </div>
        )

    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>React 合宿アンケート</h1>

                    {/*<label className="hide-completed">*/}
                        {/*<input*/}
                            {/*type="checkbox"*/}
                            {/*readOnly*/}
                            {/*checked={this.state.hideCompleted}*/}
                            {/*onClick={this.toggleHideCompleted.bind(this)}*/}
                        {/*/>*/}
                        {/*Hide Completed Tasks*/}
                    {/*</label>*/}

                    <AccountsUIWrapper/>

                </header>

                {this.props.currentUser ?
                    <Question questionNumber={Session.get('q_num')}/> : <p>ログインして</p>
                }

                {this.props.currentUser && 10 >= Number(Session.get('q_num')) ?
                    <form className="new-task">
                        <button onClick={this.yesSubmit.bind(this)}>Yes</button>
                        <button onClick={this.noSubmit.bind(this)}>No</button>
                    </form> :
                    ``
                }

                {this.props.currentUser && 10 >= Number(Session.get('q_num')) ?
                    <Result questionNumber={Session.get('q_num')}/>
                    :''
                }
                {
                    this.renderResult()
                }


            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('tasks');
    Meteor.subscribe('questions');

    return {
        totalCount: Questions.find({ questionsNumber: Session.get('q_num') }).count(),
        yesCount: Questions.find({
            $and: [
                { questionsNumber: Session.get('q_num') },
                { answer: 1 },
            ],
        }).count(),

        noCount: Questions.find({
            $and: [
                { questionsNumber: Session.get('q_num') },
                { answer: 0 },
            ],
        }).count(),

        currentUser: Meteor.user(),
    };
})(App);
