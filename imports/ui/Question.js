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
                questionMessage = '今回の合宿は楽しかったですか？';
                break;
            case 2:
                questionMessage = '温泉入った？';
                break;
            case 3:
                questionMessage = '海行った？';
                break;
            case 4:
                questionMessage = 'お土産買った？';
                break;
            case 5:
                questionMessage = '成長できた？';
                break;
            case 6:
                questionMessage = '目標は達成できた？';
                break;
            case 7:
                questionMessage = '作ったものに満足してる？';
                break;
            case 8:
                questionMessage = 'Reactが好きだ！仲良くなれそう！';
                break;
            case 9:
                questionMessage = 'React チョットデキル ようになった？';
                break;
            case 10:
                questionMessage = 'また合宿に参加したいですか？';
                break;
            default:
                questionMessage = 'ありがとうございました！';
                break;
        }

        return (
            <p>{questionMessage}</p>
        );
    }
}