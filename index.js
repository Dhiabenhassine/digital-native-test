const express = require("express");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const user = require("./Router/userRouter");
const post = require ("./Router/postRouter")

const app = express();
app.use(express.json());
app.use(bodyParser.json()); 
const PORT = process.env.PORT || 3000;

app.use("/user", user);
app.use("/post",post)


app.listen(PORT,function(){
    console.log("listening on port "+ PORT);
})
