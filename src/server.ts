import 'dotenv/config';
import http from 'http';
import { route } from './router.js';

let hostname = 'localhost';

let server = http.createServer(route);

if (process.env.PORT !== undefined) {
    server.listen({
        host: hostname,
        port: +process.env.PORT,
        exclusive: true
    }, () => {
        console.log(`Server ${process.pid} is running on port ${process.env.PORT}`);
    });
}

if (process.env.SHARED_PORT !== undefined) {
    server.listen({
        host: hostname,
        port: +process.env.SHARED_PORT,
        exclusive: false,
    }, () => {
        console.log(`Server ${process.pid} is sharing port ${process.env.SHARED_PORT}`);
    });
}