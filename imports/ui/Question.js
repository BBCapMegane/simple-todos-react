import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import {Questions} from '../api/questions.js';

export default class Question extends Component {
    render() {
        let questionMessage = '';
        switch (this.props.questionNumber) {
            case 1:
                questionMessage = '今回の合宿は楽しかったですか1';
                break;
            case 2:
                questionMessage = '今回の合宿は楽しかったですか2';
                break;
            case 3:
                questionMessage = '今回の合宿は楽しかったですか3';
                break;
            case 4:
                questionMessage = '今回の合宿は楽しかったですか4';
                break;
            case 5:
                questionMessage = '今回の合宿は楽しかったですか5';
                break;
            case 6:
                questionMessage = '今回の合宿は楽しかったですか6';
                break;
            case 7:
                questionMessage = '今回の合宿は楽しかったですか7';
                break;
            case 8:
                questionMessage = '今回の合宿は楽しかったですか8';
                break;
            case 9:
                questionMessage = '今回の合宿は楽しかったですか9';
                break;
            case 10:
                questionMessage = '今回の合宿は楽しかったですか10';
                break;
            default:
                questionMessage = 'ありがとうございまし！';
                break;
        }

        return (
            <p>{questionMessage}</p>
        );
    }
}