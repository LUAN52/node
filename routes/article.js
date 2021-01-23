const expresss = require('express');
const router = expresss.Router();


router.post('/',function(req,resp){
    
})


router.get('/new',function(req,resp)
{
   resp.render('../views/articles/new.ejs')
})

module.exports = router