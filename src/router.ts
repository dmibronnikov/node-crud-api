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
                let users = await usersGet(request);
                res.statusCode = 200;
                res.end(JSON.stringify(users));
            case HTTPMethod.POST:
                await userCreate(request, res);
                res.statusCode = 201;
                res.end();
            case HTTPMethod.PUT:
                await userUpdate(request, res);
            case HTTPMethod.DELETE:
                await userDelete(request, res);
        }
    } catch (error) {
        if (error instanceof ServerError) {
            res.statusCode = error.code;
            res.end(error.message);
        } else {
            res.statusCode = 500;
            res.end('Something went wrong.');
        }
    }
}