import { Role } from "./role";

export class User {
    userId!: number;
    userName!: string;
    password!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    profileImage! : string;
    roles?: Role[];

    constructor(){}

}
