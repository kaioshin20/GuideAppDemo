const express=require('express');
const svr=express();

const authRouter=require('./routes/authRoute')

svr.set('view engine', 'ejs')
svr.use(express.urlencoded({extended: true}))
svr.use(express.json())

const SERVER_PORT = process.env.PORT || 3000

svr.get('/', (req, res) => {
    res.render("home")
})

svr.use('/authenticate', authRouter)

svr.listen(SERVER_PORT, ()=>{
    console.log("Server Started");
})