import React, {Component} from 'react';


import {Questions} from '../api/questions.js';

export default class Result extends Component {

    render() {
        const message = [
            '今回の合宿は楽しかったですか？',
            '温泉入った？',
            '海行った？',
            'お土産買った？',
            '成長できた？',
            '目標は達成できた？',
            '作ったものに満足してる？',
            'Reactが好きだ！仲良くなれそう！',
            'React チョットデキル ようになった？',
            'また合宿に参加したいですか？',
            'また合宿に参加したいですか？',
        ];
        let totalCount = Questions.find({questionsNumber: this.props.questionNumber}).count();
        let yesCount = Questions.find({
            $and: [
                {questionsNumber: this.props.questionNumber},
                {answer: 1},
            ],
        }).count();

        let noCount = Questions.find({
            $and: [
                {questionsNumber: this.props.questionNumber},
                {answer: 0},
            ],
        }).count();
        return (

            <div>
                <p>質問{this.props.questionNumber +  ': ' + message[this.props.questionNumber - 1]}  の回答</p>
                <p>トータル回答数：{totalCount}</p>
                <p>Yes：{yesCount}</p>
                <p>No：{noCount}</p>
            </div>
        )
    }
}