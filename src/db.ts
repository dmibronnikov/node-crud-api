import { User } from "./user.js";
import { FileHandle, open } from 'fs/promises';
import { fileURLToPath } from "url";
import { dirname, join, parse } from 'path';

const pathToDB = join(dirname(fileURLToPath(import.meta.url)), '../..', 'db.txt');

export const saveUser = async (newUser: User) => {
    let handle = await open(pathToDB, 'a+');
    let users = (await parseUsers(handle))
    let filteredUsers = users.filter(user => { return user.id !== newUser.id });
    filteredUsers.push(newUser);

    handle.truncate();
    handle.write(JSON.stringify(filteredUsers));
    handle.close();
}

export const deleteUser = async (userID: string): Promise<boolean> => {
    let handle = await open(pathToDB, 'a+');
    let users = await parseUsers(handle);
    let filteredUsers = users.filter(user => { return user.id !== userID });

    handle.truncate();
    handle.write(JSON.stringify(filteredUsers));
    handle.close();

    return filteredUsers.length !== users.length;
}

export const getUsers = async (): Promise<User[]> => {
    try {
        let handle = await open(pathToDB, 'r');
        let users = await parseUsers(handle);
        handle.close();

        return users;
    } catch {
        return [];
    }
}

const parseUsers = async (handle: FileHandle): Promise<User[]> => {
    let usersData = (await handle.readFile()).toString('utf-8');
    if (usersData.length > 0) {
        return JSON.parse(usersData);
    } else {
        return [];
    }
}