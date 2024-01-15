import { Users } from './user';

export namespace Auth {
    export namespace Login {
        export interface Request {
            username: string;
            password: string;
        }
        export type Response = Users.User;
    }
}
