import { randomUUID } from "crypto"

export class User {
    id: string;
    name: string;
    age: number;
    hobbies: string[];

    constructor(name: string, age: number, hobbies: string[] = [], id: string = randomUUID()) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.hobbies = hobbies;
    }
}