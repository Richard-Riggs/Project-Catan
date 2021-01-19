import express from 'express';

const app = express();
const port = 8000;

app.get('/', (req, res) => {
    res.send('This is neat!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});