import { User } from "user.js";
import { FileHandle, open } from 'fs/promises';
import { fileURLToPath } from "url";
import { dirname, join, parse } from 'path';

const pathToDB = join(fileURLToPath(import.meta.url), 'db.txt');

export const saveUser = async (user: User) => {
    let handle = await open(pathToDB, 'a+');
    let users = await parseUsers(handle);
    users.push(user);

    handle.truncate();
    handle.write(JSON.stringify(users));
    handle.close();
}

export const getUsers = async (): Promise<User[]> => {
    let handle = await open(pathToDB, 'r');
    let users = parseUsers(handle);
    handle.close();

    return users;
}

const parseUsers = async (handle: FileHandle): Promise<User[]> => {
    let usersData = (await handle.readFile()).toString('utf-8');
    return JSON.parse(usersData);
}