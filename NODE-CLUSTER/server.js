
const cluster = require('node:cluster');
const os = require('node:os');
const express = require('express');

const totalCPU = os.cpus().length;

// Distribute connections using round-robin scheduling
cluster.schedulingPolicy = cluster.SCHED_RR;

if (cluster.isPrimary) {
    console.log('Primary PID:', process.pid);

    for (let i = 0; i < totalCPU; i++) {
        cluster.fork();
    }

    cluster.on('online', (worker) => {
        console.log('Worker online:', worker.process.pid);
    });

} else {
    const app = express();

   
app.get('/', (req, res) => {
    console.log('Request handled by:', process.pid);

    res.setHeader('Connection', 'close');

    res.json({
        message: 'Hello from server',
        workerPID: process.pid
    });
});


    app.listen(9000, () => {
        console.log('Worker listening:', process.pid);
    });
}
