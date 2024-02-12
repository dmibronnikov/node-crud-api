import 'dotenv/config';
import cluster from 'cluster';
import { availableParallelism } from 'os';

let ports = new Map<number, number>();

cluster.schedulingPolicy = cluster.SCHED_RR;
cluster.setupPrimary({ exec: 'build/src/server.js' });

for (let i = 0; i < availableParallelism() - 1; i++) {
    let port = 4001 + i;
    let worker = cluster.fork({ PORT: port, SHARED_PORT: process.env.PORT });
    ports.set(worker.id, port);
}

cluster.on('exit', (worker, code, signal) => {
    let port = ports.get(worker.id)
    ports.delete(worker.id);

    if (port !== undefined) {
        let worker = cluster.fork({ PORT: port });
        ports.set(worker.id, port);
    }
});