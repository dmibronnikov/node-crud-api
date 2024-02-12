import { User } from "./user.js";
import { IncomingMessage, ServerResponse } from "http";
import { deleteUser, getUsers, saveUser } from './db.js';
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

export const userGet = async (userID: string): Promise<User> =>  {
    if (!isValidUUID(userID)) {
        throw new ServerError(400, `invalid userID ${userID}`);
    }

    let users = (await getUsers()).filter(user => { return user.id === userID });
    if (users.length > 0) {
        return users[0];
    } else {
        throw new ServerError(404, `No user is found for ${userID}`);
    }
}

export const userCreate = async (body: string | null): Promise<User> => {
    if (body != null) {
        let userBody: UserBody = JSON.parse(body);
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

export const userUpdate = async (userID: string, body: string | null) => {
    if (!isValidUUID(userID)) {
        throw new ServerError(400, `invalid userID ${userID}`);
    }

    if (body != null) {
        let userBody: UserBody = JSON.parse(body);
        if (userBody.name === undefined) { throw new ServerError(400, 'name is required'); }
        if (userBody.age === undefined) { throw new ServerError(400, 'age is required'); }
        if (userBody.hobbies === undefined) { throw new ServerError(400, 'hobbies are required'); }

        let user = new User(userBody.name, userBody.age, userBody.hobbies, userID);
        await saveUser(user);

        return user;
    } else {
        throw new ServerError(400, `invalid body`);
    }
}

export const userDelete = async (userID: string) => {
    if (!isValidUUID(userID)) {
        throw new ServerError(400, `invalid userID ${userID}`);
    }

    let result = await deleteUser(userID);
    if (!result) {
        throw new ServerError(404, `user with userID ${userID} not found`);
    }
}

const isValidUUID = (str: string) => {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    return regexExp.test(str);
}