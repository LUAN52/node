const express = require('express');
const path = require('path');

const app = express();


app.set('view-engine','ejs');
app.use(express.static('public'));
app.use(express.static('css'));


app.set("views",path.join(__dirname,'/views'));


app.get('/login',function(req,resp)
{
    resp.render('login.ejs')
})

app.listen(3000)
