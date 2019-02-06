import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import {Questions} from '../api/questions.js';
import {Session} from "meteor/session";


export default class Result extends Component {


    render() {
        let totalCount = Questions.find({ questionsNumber: this.props.questionNumber }).count();
        let yesCount = Questions.find({
            $and: [
                { questionsNumber: this.props.questionNumber },
                { answer: 1 },
            ],
        }).count();

        let noCount = Questions.find({
            $and: [
                { questionsNumber: this.props.questionNumber },
                { answer: 0 },
            ],
        }).count();
        return (
            <div>
                <p>質問 { this.props.questionNumber } の回答</p>
                <p>トータル回答数：{totalCount}</p>
                <p>Yes：{yesCount}</p>
                <p>No：{noCount}</p>
            </div>
        )
    }
}