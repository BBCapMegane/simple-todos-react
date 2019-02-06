import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session'

import {Questions} from '../api/questions.js';

import Question from './Question.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';

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

    render() {
        return (
            <div className="container">
                <header>
                    <h1>React 合宿 {this.props.q_count} {this.props.yesCount} {this.props.noCount}</h1>

                    <label className="hide-completed">
                        <input
                            type="checkbox"
                            readOnly
                            checked={this.state.hideCompleted}
                            onClick={this.toggleHideCompleted.bind(this)}
                        />
                        Hide Completed Tasks
                    </label>

                    <AccountsUIWrapper/>

                </header>

                {this.props.currentUser && 10 >= Number(Session.get('q_num')) ?
                    <Question questionNumber={Session.get('q_num')}/> : ''
                }

                {this.props.currentUser && 10 >= Number(Session.get('q_num')) ?
                    <form className="new-task">
                        <button onClick={this.yesSubmit.bind(this)}>Yes</button>
                        <button onClick={this.noSubmit.bind(this)}>No</button>
                    </form> :
                    <p>ログインして</p>
                }

                {this.props.currentUser && 10 >= Number(Session.get('q_num')) ?
                    <div>
                        <p>質問 {Session.get(Session.get('q_num'))} の回答</p>
                        <p>トータル回答数：{this.props.q_count}</p>
                        <p>Yes：{this.props.yesCount}</p>
                        <p>No：{this.props.noCount}</p>
                    </div>
                    :''
                }
            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('tasks');
    Meteor.subscribe('questions');

    return {
        q_count: Questions.find({ questionsNumber: Session.get('q_num') }).count(),
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
