const express=require('express');
const svr=express();
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const authRouter=require('./routes/authRoute')
const streamRouter=require('./routes/streamRoute')
const path=require('path')
const startRouter=require('./routes/startRoute')


svr.set('view engine', 'ejs')
svr.use(express.urlencoded({extended: true}))
svr.use(express.json())

svr.use(bodyParser.urlencoded({extended:false}));
svr.use(express.urlencoded({ extended: false }));
svr.use(cookieParser());
svr.use(express.static(path.join(__dirname, 'public')));


const SERVER_PORT = process.env.PORT || 3000

// function checkLogin(req, res, next) {
//     if(req.user) {
//         return next()
//     }
//     else {
//         res.send('<h1>Error 403</h1><h3>Login First!!<h3>')
//     }
// }

svr.get('/', (req, res) => {
    res.render("home")
})

// svr.get('/profile',  (req, res) => {
//     let email=req.user.email;
//     console.log(email);
//     res.render('profile', email)
// })

svr.use('/authenticate', authRouter)
 svr.use('/stream', streamRouter)
 svr.use('/starting', startRouter)



// svr.get('/stream/:id', (req, res) => {

//      res.render("profile_fill",{id:req.params.id})
//     // res.send("prfile file")
//     console.log(req.params.id)
//     // console.log("reached")
// })


svr.listen(SERVER_PORT, ()=>{
    console.log("Server Started");
})