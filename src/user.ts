import { UUID, randomUUID } from "crypto"

export class User {
    id: UUID;
    name: string;
    age: number;
    hobbies: string[];

    constructor(name: string, age: number, hobbies: string[] = [], id: UUID = randomUUID()) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.hobbies = hobbies;
    }
}