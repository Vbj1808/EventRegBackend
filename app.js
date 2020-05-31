const express = require('express');


const app = express();

app.use(express.json({extended: false}));
app.get('/', (req,res) => res.send('Hello world'))


const port = process.env.PORT || 8082;



app.listen(port, () => console.log(`Server running successfully on port ${port}`));