const express = require('express');
const articleRouter = require('./routes/article');
const app = express();
const mongoose = require('mongoose');


app.set('view-engine','ejs');

app.use('/articles',articleRouter);


mongoose.connect("mongodb+srv://luan:<tombraider4>@cluster0.qu7qi.mongodb.net/<blog>?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true 
})


app.get('/',function(req,resp)
{
    const articles = [
        {
            title:"titulo",
            createdAt: new Date(),
            discription:'teste discription'

        }]
    resp.render('articles/index.ejs',{text:articles});
})


app.listen(2000);