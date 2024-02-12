import http from 'http';
import { route } from './router.js';

let hostname = 'localhost';

let server = http.createServer(route);

if (process.env.port !== undefined) {
    server.listen({
        host: hostname,
        port: +process.env.port,
        exclusive: true
    }, () => {
        console.log(`Server ${process.pid} is running on port ${process.env.port}`);
    });
}

if (process.env.sharedPort !== undefined) {
    server.listen({
        host: hostname,
        port: +process.env.sharedPort,
        exclusive: false,
    }, () => {
        console.log(`Server ${process.pid} is sharing port ${process.env.sharedPort}`);
    });
}