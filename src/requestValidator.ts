import { IncomingMessage } from "http";
import { ServerError } from './serverError.js';

export enum Route {
    users = 'users'
}

export enum HTTPMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export class Request {
    route: Route;
    method: HTTPMethod;
    parameters: string[] | null;
    body: string | null

    constructor(route: Route, method: HTTPMethod, parameters: string[] | null = null, body: string | null = null) {
        this.route = route;
        this.method = method;
        this.parameters = parameters;
        this.body = body;
    }
}

export const parseRequest = async (req: IncomingMessage): Promise<Request> => {
    return new Promise<Request>((resolve, reject) => {
        let httpMethod: HTTPMethod
        switch (req.method) {
            case HTTPMethod.GET:
                httpMethod = HTTPMethod.GET;
                break;
            case HTTPMethod.POST:
                httpMethod = HTTPMethod.POST;
                break;
            case HTTPMethod.PUT:
                httpMethod = HTTPMethod.PUT;
                break;
            case HTTPMethod.DELETE:
                httpMethod = HTTPMethod.DELETE;
                break;
            default:
                reject(new ServerError(404, 'Unsupported http method'));
        }

        let route: Route | null = null;
        let parameters: string[] = [];
        if (req.url !== undefined) {
            let components = req.url.split('/').filter(n => n).slice(1);
            if (components.length > 0) {
                switch (components[0]) {
                    case Route.users:
                        route = Route.users;
                        break;
                    default:
                        break;
                }

                parameters.push(...components.slice(1));
            }
        }

        if (route !== null) {
            let requestRoute = route;
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });

            req.on('end', () => {
                let request = new Request(requestRoute, httpMethod, parameters, body);
                resolve(request);
            });
        } else {
            reject(new ServerError(404, 'Unsupported route'));
        }
    });
}