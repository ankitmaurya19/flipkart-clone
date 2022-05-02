const express = require("express");
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
env.config();

const app = express();
// routes
const usersRoutes = require('./total-routes/user');
const adminRoutes = require("./total-routes/admin/user");
const categoryRoutes = require('./total-routes/categories');
const productRoutes = require("./total-routes/product");
const cartRoutes = require("./total-routes/cart");

app.use(bodyParser.urlencoded({extended:true}));
const url = "mongodb+srv://"+process.env.name+":"+process.env.password+"@cluster0.majgp.mongodb.net/"+process.env.database+"?retryWrites=true&w=majority";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('databse Connected');
});

app.use(cors())
app.use('/public' , express.static(__dirname + '/uploads'))
app.use('/api' , usersRoutes);
app.use('/api', adminRoutes);
app.use('/api' , categoryRoutes);
app.use('/api' , productRoutes);
app.use('/api' , cartRoutes);

app.get('/' , function(req , res){
    res.send("Hello");
})

app.listen(3000 , function(){
    console.log(`Your server is running on port ${process.env.PORT}`);
})
