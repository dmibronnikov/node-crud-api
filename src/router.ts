import { userCreate, userDelete, userUpdate, usersGet, userGet } from "./controller.js";
import { IncomingMessage, ServerResponse } from "http";
import { HTTPMethod, parseRequest } from "./requestValidator.js";
import { ServerError } from "./serverError.js";

const root = 'api';

export const route = async (req: IncomingMessage, res: ServerResponse) => {
    res.setHeader("Content-Type", "application/json");

    try {
        let request = await parseRequest(req);
        switch (request.method) {
            case HTTPMethod.GET:
                if (request.parameters.length > 0) {
                    let user = await userGet(request.parameters[0]);
                    res.statusCode = 200;
                    res.end(JSON.stringify(user));
                } else {
                    let users = await usersGet();
                    res.statusCode = 200;
                    res.end(JSON.stringify(users));
                }
                break;
            case HTTPMethod.POST:
                let user = await userCreate(request.body);
                res.statusCode = 201;
                res.end(JSON.stringify(user));
                break;
            case HTTPMethod.PUT:
                let updatedUser = await userUpdate(request.parameters[0], request.body);
                res.statusCode = 200;
                res.end(JSON.stringify(updatedUser));
                break;
            case HTTPMethod.DELETE:
                await userDelete(request.parameters[0]);
                res.statusCode = 204;
                res.end();
                break;
        }
    } catch (error) {
        console.log(error);

        if (error instanceof ServerError) {
            res.statusCode = error.code;
            res.end(`{ "error": "${error.message}" }`);
        } else {
            res.statusCode = 500;
            res.end('{ "error": "Something went wrong." }');
        }
    }
}