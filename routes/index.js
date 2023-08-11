var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get('/', function(req, res) {
  let filesdupe=[];
    fs.readdir("./uploads", {withFileTypes:true},function(err, file){
      file.forEach(function(dirent){
        filesdupe.push({name:dirent.name, folderhaikya: dirent.isDirectory()})
      })
      //concole.log(filesdup)
      res.render('index', {filesdupe: filesdupe});
    })  
    
  }); 

router.get("/createfile",function(req,res){
  fs.writeFile(`./uploads/${req.query.name}`,"",function(err){
    if(err){
      console.log("nahi huaaa");
    }
    else{
      res.redirect("/");
    }
  });
});

router.get("/createfolder",function(req,res){
  fs.mkdir(`./uploads/${req.query.name}`,function(err){
    if(err){
      console.log("nahiHua");
    }
    else{
      res.redirect("/");
    }
  });
});

// delete folder & file
router.get('/deletefile/:name',function(req,res){
  fs.unlink(`./uploads/${req.params.name}`,function(err){
   res.redirect('/')
  });
});

router.get('/deletefolder/:name',function(req,res){
  fs.rmdir(`./uploads/${req.params.name}`,function(err){
   res.redirect('/')
  });
});
// router.get("/filename/:file.name", function(req,res){
//   res.send(req.params.name);
// })

router.get("/file/:name", function(req,res){
  let filesdupe=[];
    fs.readdir("./uploads", {withFileTypes:true},function(err, file){
      file.forEach(function(dirent){
        filesdupe.push({name:dirent.name, folderhaikya: dirent.isDirectory()})
      })
        fs.readFile(`./uploads/${req.params.name}`, "utf-8", function(err, data){
           res.render('fileopened', {files:filesdupe, filename: req.params.name ,filedata:data});
    })
  });

});

router.get("/public/:name", function(req,res){
  fs.unlink(`./uploads/$(req.query.name)`, (err) => {
    if (err) throw err;
    console.log('was deleted');
  });
})

module.exports = router;
