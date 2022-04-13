import express from "express"
const router = express.Router()

router.get('/', (req,res)=>{
    if (!req.user.isAuthenticated()) res.redirect('/account/login')
    
    if(req.user.role ==  'user') res.render('user_dashboard.ejs')
    
    res.render('super_dashboard.ejs')
    
})

router.get('/create', (req,res)=>{
    res.render('create.ejs')
})

router.post('/create', (req,res)=>{

})




export default router