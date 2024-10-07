const express = require("express");
const app = express();
const cors = require('cors');
const path = require('path');
const MethodOverride = require('./middleware/MethodOverride.js');
const multer = require('multer');
const morgan = require('morgan');
const form = multer();

const PORT = process.env.PORT || 5000;


app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({
    extended : true
}))
app.use(form.array());
app.use(morgan('tiny'));


app.use(express.static(__dirname + '/public'));


app.use('/public', express.static(path.join(__dirname, 'public')))


app.use(MethodOverride);

require('dotenv').config();

const router = require("./routes/router.js");
router(app);


app.listen(PORT , () => console.log(`server run in ${PORT}`));
