const express = require('express');
const app = express();
const morgan = require('morgan');
const colors = require('colors');

//Settings
//app.set('<NameVar>','<Valor>' );
app.set('port',9000);
app.set('view engine','ejs');

//Middlewares
app.use(express.json());
app.use(morgan('dev'));


//Routes
app.get('/', (req,res) => {
    // res.render('index.html');
    res.redirect('../pages/index.html');
});


//
app.use(express.static('pages'));

app.listen(app.get("port"), () => {
    console.log('Server on port'.yellow,(app.get("port")+'').yellow);
})