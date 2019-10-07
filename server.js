const express=require('express');
const svr=express();

const authRouter=require('./routes/authRoute')

svr.set('view engine', 'ejs')
svr.use(express.urlencoded({extended: true}))
svr.use(express.json())

const SERVER_PORT = process.env.PORT || 3000

function checkLogin(req, res, next) {
    if(req.user) {
        return next()
    }
    else {
        res.send('<h1>Error 403</h1><h3>Login First!!<h3>')
    }
}

svr.get('/', (req, res) => {
    res.render("home")
})

svr.get('/profile', checkLogin, (req, res) => {
    let email=req.user.email;
    console.log(email);
    res.render('profile', email)
})

svr.use('/authenticate', authRouter)

svr.listen(SERVER_PORT, ()=>{
    console.log("Server Started");
})