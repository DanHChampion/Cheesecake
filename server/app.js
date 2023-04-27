const express = require('express');
const app = express();
const PORT = 8080;

// JSON Middleware
app.use(express.json());

// CORS Policy
const cors = require('cors');
const corsOptions = {
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
};
app.use(cors(corsOptions));

users = [
    {
        "id": 1,
        "name": "Dan",
        "icon": ""
    },
    {
        "id": 2,
        "name": "Panos",
        "icon": ""
    },
    {
        "id": 3,
        "name": "Dai",
        "icon": ""
    }
];

app.get('/users', (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.json(users);
});


app.get('/randomnum', (req, res) => {
    res.status(200).send({
        num: Math.floor(Math.random() * 10)
    })
});

app.listen(
    PORT,
    () => console.log(`Running on http://localhost:${PORT}`)
);


