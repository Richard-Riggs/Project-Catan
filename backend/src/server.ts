import express from 'express';
import SocketIO from 'socket.io';

const app = express();


// TODO: send app file
// use this project structure: https://www.coreycleary.me/project-structure-for-an-express-rest-api-when-there-is-no-standard-way
app.get('/', (req: any, res: any) => {
    res.send('This is neat!');
});

const port = 8000;

const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


// SOCKET IO
const options = { 
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    },
    path: '/socket'
 };

const io = new SocketIO.Server(server, options);
const game = io.of('/game');

game.on('connection', (socket: SocketIO.Socket) => {
    console.log('a user connected');
});
