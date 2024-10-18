const http = require('http');
const app = require('./index');
const { connection } = require('./config/db');
require("dotenv").config();

let server;
const PORT = process.env.PORT || 8080;

const startServer = async () => {
    if (server) {
        console.log('Server is already running.');
        return;
    }

    server = http.createServer(app);
    
    await new Promise((resolve, reject) => {
        server.listen(PORT, async () => {
            try {
                await connection;
                // console.log("Connected to DB");
                // console.log(`Running at port ${PORT}`);
                resolve();
            } catch (error) {
                // console.error("Error while connecting to DB:", error);
                reject(error);
            }
        });
    });
};
const closeServer = () => {
    return new Promise((resolve) => {
        if (server) {
            server.close((err) => {
                if (err) {
                    console.error('Error closing server:', err);
                } else {
                    console.log('Server closed');
                }
                server = null;
                resolve();
            });
        } else {
            console.log('Server is not running.');
            resolve();
        }
    });
};

module.exports = { startServer, closeServer };
