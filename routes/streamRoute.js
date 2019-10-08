var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId; 

const { connectdb }=require('../database/db')




router.get('/:id',(req,res)=>{
    console.log("req para",req.params.id)
    var o_id = new ObjectId(req.params.id);
    connectdb('guideApp_demo')
    .then(db => db.collection('users').find({ _id:o_id }))
    .then(user => user.toArray())
    .then((user) => {
        console.log("user in strema",user[0])
         res.render("profile_fill",{data:user[0]})
    })
    .catch(err=>{
        return err
    })
   
})

router.post('/tourist_data/:id/complete_profile',(req,res)=>{
    console.log("complete pro",req.body)
    // let nuser = {
    //     email:req.body.email,
    //     first_name: req.body.first,
    //     last_name:req.body.last,
    //     gender:req.body.gender,
    //     address:req.body.address,
    //     phone:req.body.phone
    // }

    var o_id = new ObjectId(req.params.id);
    connectdb('guideApp_demo')
    .then(db => db.collection('users').update({ _id:o_id },{$set:{
        first_name: req.body.first,
        last_name:req.body.last,
        gender:req.body.gender,
        address:req.body.address,
        phone:req.body.phone
    }}))
    // .then(user=>user.toArray())
    .then(user =>{
//        console.log('newproifle')
  

        // res.send("done")

        // res.redirect('/stream/'+req.params.id+'/welcome_page')
        res.redirect('/starting/'+req.params.id)
    }) 
    .catch(err => {
        console.log(err)
        res.send(err)
    })

})


// router.get('/:id/welcome_page',(req,res)=>{
//     res.send("welcome",req.params.id)
// })

// router.get('/:id/welcome_page',(req,res)=>{
//     res.send("welcome")
// })
module.exports = router;
