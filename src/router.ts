import { userCreate, userDelete, userUpdate, usersGet } from "./controller.js";
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
                let users = await usersGet();
                res.statusCode = 200;
                res.end(JSON.stringify(users));
                break;
            case HTTPMethod.POST:
                let user = await userCreate(request);
                res.statusCode = 201;
                res.end(JSON.stringify(user));
                break;
            case HTTPMethod.PUT:
                await userUpdate(request, res);
                break;
            case HTTPMethod.DELETE:
                await userDelete(request, res);
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