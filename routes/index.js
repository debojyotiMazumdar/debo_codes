var express = require('express');
var router = express.Router();

try{

var mongoose=require('mongoose');
mongoose.connect('localhost:27017/test');

var schema=mongoose.Schema;
var userDataSchema=new schema({
   title:{type:String,required:true},
   description:String,
});

var UserData=mongoose.model('UserData',userDataSchema);


  /* GET home page. */
 router.get('/', function(req, res, next) {
   res.render('index', { title: 'Express' });
 });

 router.get('/show-data',async function(req,res,next){
   const doc=await UserData.find();
   console.log(doc);
   res.render('show-data',{items:doc});
});

router.post('/insert',function(req,res,next){
  var item={
    title:req.body.title,
    description:req.body.description,
  }

  var data=new UserData(item);
  data.save();

  res.redirect('/');
});

module.exports = router;

}

catch(error){
  console.log(error);
}
