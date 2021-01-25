const express = require('express');
const articleRouter = require('./routes/article');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const articleModel = require('./models/article')
const method = require('method-override');



app.set('view-engine','ejs');

app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,"views/articles")))


mongoose.set('useCreateIndex', true)
mongoose.connect("mongodb+srv://luan:mydata@52@cluster0.qu7qi.mongodb.net/blog?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true 
})


app.get('/', async function(req,resp)
{
    const articles = await articleModel.find().sort({createdAt:"desc"});;  
    resp.render('articles/index.ejs',{text:articles});
})

app.use('/articles',articleRouter);
app.listen(2000);