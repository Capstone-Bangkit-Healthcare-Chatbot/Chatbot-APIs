const express = require('express');
const bodyParser = require('body-parser');
const articleRoutes = require('./routes/articleRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use('/api', articleRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
