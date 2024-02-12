import { User } from "./user.js";
import { FileHandle, open } from 'fs/promises';
import { fileURLToPath } from "url";
import { dirname, join, parse } from 'path';

const pathToDB = join(dirname(fileURLToPath(import.meta.url)), '..', 'db.txt');

export const saveUser = async (user: User) => {
    let handle = await open(pathToDB, 'a+');
    let users = await parseUsers(handle);
    users.push(user);

    handle.truncate();
    handle.write(JSON.stringify(users));
    handle.close();
}

export const getUsers = async (): Promise<User[]> => {
    try {
        let handle = await open(pathToDB, 'r');
        let users = parseUsers(handle);
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