export class User {
    _id: string;
    username: string;
    email: string;
    // questions: Question[];
    // answers: Question[]

    constructor(_id = '', username = '', email = '') {
        this._id = _id;
        this.username = username;
        this.email = email;
        // this.questions = questions;
        // this.answers = answers
    }
}