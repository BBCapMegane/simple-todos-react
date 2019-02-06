import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

export const Questions = new Mongo.Collection('questions');

if (Meteor.isServer) {
    Meteor.publish('questions',function() {
        return Questions.find()
    });
}

Meteor.methods({
    'questions.insert'(questionsNumber,answer) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        // console.log(Questions.find())

        Questions.insert({
            questionsNumber,
            answer,
            createdAt: new Date(),
            username: Meteor.users.findOne(this.userId).username,
        })
    }
});
