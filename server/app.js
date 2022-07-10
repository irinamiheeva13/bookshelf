const express = require('express');

const app = express();
const PORT = 3005;

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log('Server started!');
});
