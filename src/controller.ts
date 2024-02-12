import { User } from "./user.js";
import { IncomingMessage, ServerResponse } from "http";
import { getUsers, saveUser } from './db.js';
import { Request } from "./requestValidator.js";
import { randomUUID } from "crypto";
import { ServerError } from "./serverError.js";

type UserBody = {
    name: string;
    age: number;
    hobbies: string[];
}

export const usersGet = async (): Promise<User[]> => {
    return await getUsers();
}

export const userGet = async (request: Request): Promise<User[] | User> =>  {
    if (request.parameters.length > 0) {
        let userID = request.parameters[0];
        if (userID !== undefined && isValidUUID(userID)) {
            let users = (await getUsers()).filter(user => {
                user.id === userID;
            });

            if (users.length > 0) {
                if (users.length == 1) {
                    return users[0];
                } else {
                    return users;
                }
            } else {
                throw new ServerError(404, `No user is found for ${userID}`);
            }
        } else {
            throw new ServerError(400, `invalid user id ${userID}`);
        }
    } else {
        return await getUsers();
    }
}

export const userCreate = async (request: Request): Promise<User> => {
    if (request.body != null) {
        let userBody: UserBody = JSON.parse(request.body);
        if (userBody.name === undefined) { throw new ServerError(400, 'name is required'); }
        if (userBody.age === undefined) { throw new ServerError(400, 'age is required'); }
        if (userBody.hobbies === undefined) { throw new ServerError(400, 'hobbies are required'); }

        let user = new User(userBody.name, userBody.age, userBody.hobbies);
        await saveUser(user);

        return user;
    } else {
        throw new ServerError(400, `invalid body`);
    }
}

export const userUpdate = async (request: Request, res: ServerResponse) => {
    
}

export const userDelete = async (request: Request, res: ServerResponse) => {

}

const isValidUUID = (str: string) => {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    return regexExp.test(str);
}

const validateGetUsersRequest = (request: Request) => {
    
};