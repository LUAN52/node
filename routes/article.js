const expresss = require('express');
const Article = require('../models/article')
const router = expresss.Router();
const purify = require('dompurify');


router.post('/',async function(req,resp){

    let article = new Article();
    console.log(article);
   let sav = SaveAndRende('new.ejs',article);
   await sav(req,resp)
 
})


router.get('/new', function(req,resp)
{
   resp.render('../views/articles/new.ejs',{article:new Article()})
})


router.post('/edit/:id',async function(req,resp)
{  
   let art =  await Article.findById(req.params.id)
   SaveAndRende('/edit.ejs',art)(req,resp);

   
})

router.get('/edit/:id',async function(req,resp)
{  
   const art =  await Article.findById(req.params.id)
   resp.render('../views/articles/edit.ejs',{article:art})
})





router.get('/:slug', async function(req,resp)
{
   
   const arti = await Article.findOne({slug:req.params.slug});
   if(arti==null)  resp.redirect('/')
  
   
   resp.render('../views/articles/show.ejs',{article:arti})
})




router.post( "/:slug",async function(req,resp)
{
      let artic= await Article.deleteOne({slug:req.params.slug});
       
      resp.redirect('/');
      
})


function SaveAndRende(path,obj)
{
   return  async (req,resp)=>
   {
      obj.title = req.body.title,
      obj.description = req.body.desc,
      obj.markdown = req.body.mark

      
     try {
        let arti = await obj.save();
        console.log(arti);


        resp.redirect(`/articles/${arti.slug}`);
       } catch (error) {
            resp.render(`../views/articles/${path}`,{article:arti})
       }
   }
}

module.exports = router