const app = require('express')();
// const server = require('http').createServer(app);
const options = { 
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
 };

// TODO: send app file
// use this project structure: https://www.coreycleary.me/project-structure-for-an-express-rest-api-when-there-is-no-standard-way
app.get('/', (req: any, res: any) => {
    res.send('This is neat!');
});

const port = 8000;

const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const io = require('socket.io')(server, options);



io.on('connection', (socket: SocketIO.Socket) => {
    console.log('a user connected');
});




// const io = require('socket.io').listen(server);
