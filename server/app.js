const app = require('express')();
const PORT = 8080;

// CORS Policy
const cors = require('cors');
const corsOptions = {
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.get('/randomnum', (req, res) => {
    res.status(200).send({
        num: Math.floor(Math.random() * 10)
    })
});

app.listen(
    PORT,
    () => console.log(`Running on http://localhost:${PORT}`)
);


