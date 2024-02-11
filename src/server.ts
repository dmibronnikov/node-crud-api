import http from 'http';

let hostname = 'localhost';

let server = http.createServer((req, res) => {
    res.statusCode = 201;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Hello World from ${process.env.port}\n`);
});

if (process.env.port !== undefined) {
    server.listen({
        host: hostname,
        port: +process.env.port,
        exclusive: true
    });
}

if (process.env.sharedPort !== undefined) {
    server.listen({
        host: hostname,
        port: +process.env.sharedPort,
        exclusive: false,
    });
}