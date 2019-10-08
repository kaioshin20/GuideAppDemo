var express = require('express');
var router = express.Router();

var ObjectId = require('mongodb').ObjectId; 

const { connectdb }=require('../database/db')


router.get("/:id",(req,res)=>{
    var o_id = new ObjectId(req.params.id);
    connectdb('guideApp_demo')
    .then(db => db.collection('users').find({ _id:o_id }))
    .then(user => user.toArray())
    .then((user) => {
        console.log("user in strema",user[0])
         res.render("welcome_pageofuser",{data:user[0]})
    })
    .catch(err=>{
        return err
    })

    // res.send("welcome here33")
   
})

router.get("/History/:id",(req,res)=>{
    var o_id = new ObjectId(req.params.id);
    connectdb('guideApp_demo')
    .then(db => db.collection('users').find({ _id:o_id }))
    .then(user => user.toArray())
    .then((user) => {
        console.log("user in strema",user[0])
        // res.render("welcome_pageofuser",{data:user[0]})
   res.send("history")
    })
    .catch(err=>{
        return err
    })

    // res.send("welcome here33")
   
})

router.get("/newTrip/:id",(req,res)=>{
    var o_id = new ObjectId(req.params.id);
    connectdb('guideApp_demo')
    .then(db => db.collection('users').find({ _id:o_id }))
    .then(user => user.toArray())
    .then((user) => {
        console.log("user in strema",user[0])
        // res.render("welcome_pageofuser",{data:user[0]})
   //res.send("new Trip")
    
res.render('tourist/newTrip',{data:user[0]._id})
})
    .catch(err=>{
        return err
    })

    // res.send("welcome here33")
   
})

router.get("/profile/:id",(req,res)=>{
    var o_id = new ObjectId(req.params.id);
    connectdb('guideApp_demo')
    .then(db => db.collection('users').find({ _id:o_id }))
    .then(user => user.toArray())
    .then((user) => {
        console.log("user in strema",user[0])
         res.render("tourist/profile",{data:user[0]})
   res.send("profile")
    })
    .catch(err=>{
        return err
    })

    // res.send("welcome here33")
   
})

module.exports=router