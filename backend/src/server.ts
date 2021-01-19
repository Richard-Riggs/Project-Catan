import express from 'express';

const app = express();
const port = 8000;

// TODO: send app file
// use this project structure: https://www.coreycleary.me/project-structure-for-an-express-rest-api-when-there-is-no-standard-way
app.get('/', (req, res) => {
    res.send('This is neat!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
