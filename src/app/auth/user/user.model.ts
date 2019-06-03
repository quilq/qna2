// export class User {
//     constructor(
//         public _id: string = '',
//         public username: string = '',
//         public email: string = ''
//     ) { }
// }

export class User {
    _id: string;
    username: string;
    email: string;
    constructor(_id = '', username = '', email = '') {
        this._id = _id;
        this.username = username;
        this.email = email;
    }
}