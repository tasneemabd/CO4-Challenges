const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user-model');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/User', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/api/register', async (req, res) => {
  console.log(req.body);
  try {
    const newPassword =await bcrypt.hash(req.body.password,10)
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: 'ok' });
  } catch (err) {
    console.log(err);
    res.json({ status: 'error', error: 'Duplicate email' });
  }
});

app.post('/api/lo', async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    // password: req.body.password,
  })
  if(!user) {return {stutas: 'error', error :'invalid token'}}
  const isPasswordValid= await bcrypt.compare(req.body.password, user.password)

  if (isPasswordValid) {
    const token= jwt.sign({
        name:user.name,
        email:user.email,

    },'secret123')
    return res.json({ status: 'ok', user: token });
  } else {
    return res.json({ status: 'error', user: false });
  }
});
app.get('/api/quote', async (req, res) => {

    const token= req.headers["x-access-token"]
    try{
        const decoded=jwt.verify(token, 'secret123')
        const email=decoded.email
        const user = await User.findOne({email:email })
        return res.json({status:'ok', quote:user.quote})

    }
    catch(error){
console.log(error)
res.json({stutas: 'error', error :'invalid token'})
    }
    
});
app.post('/api/quote', async (req, res) => {

    const token=  req.headers["x-access-token"]
    try{
        const decoded=jwt.verify(token, 'secret123')
        const email=decoded.email
         await User.updateOne({email:email },
        {$set: {quote :req.body.quote}})
        return res.json({status:'ok'})

    }
    catch(error){
console.log(error)
res.json({stutas: 'error', error :'invalid token'})
    }
    
});

app.listen(1000, () => {
  console.log("Server running on port 1000");
});
