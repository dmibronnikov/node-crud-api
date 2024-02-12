import { User } from "./user.js";
import { IncomingMessage, ServerResponse } from "http";
import { getUsers, saveUser } from 'db';
import { Request } from "./requestValidator.js";
import { randomUUID } from "crypto";

export const usersGet = async (request: Request): Promise<User[] | User> =>  {
    let user1 = new User("test", 34, [], randomUUID());
    let user2 = new User("test", 34, [], randomUUID());
    let user3 = new User("test", 34, [], randomUUID());
    return [user1, user2, user3];
}

export const userCreate = async (request: Request, res: ServerResponse) => {

}

export const userUpdate = async (request: Request, res: ServerResponse) => {
    
}

export const userDelete = async (request: Request, res: ServerResponse) => {

}

const validateGetUsersRequest = (request: Request) => {
    
};