const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const AccountRoutes = require('./routes/AccountRoutes');
app.use('/account', AccountRoutes);

module.exports = app.listen(3000);
