// npx loadtest -n 1200 -c 400 -k http://localhost:3000/{route}

import http from 'http';
import cluster from 'cluster';
import { availableParallelism } from 'os';

let ports = new Map<number, number>();
    
    cluster.schedulingPolicy = cluster.SCHED_RR;
    cluster.setupPrimary({ exec: 'src/server.ts' });
    
    for (let i = 0; i < availableParallelism() - 1; i++) {
        let port = 4001 + i;
        let worker = cluster.fork({ port: port, sharedPort: 4000 });
        ports.set(worker.id, port);
    }

    cluster.on('exit', (worker, code, signal) => {
        let port = ports.get(worker.id)
        ports.delete(worker.id);

        if (port !== undefined) {
            let worker = cluster.fork({ port: port });
            ports.set(worker.id, port);
        }
    });