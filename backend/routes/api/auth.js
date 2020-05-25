const router = require('express').Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const upload = require('../middleware/file-upload');

router.post('/register', async (req, res) => {

    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send("Email is already exist");

    //hash pass
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
});

router.get('/register', (req, res) => {
 res.send("REGISTER");
});


//LOGIN

router.post('/login', async (req, res) => {

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Email is not found");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send("Invalid password");

    //Token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('authorization', token).send(token);
});

router.post('/upload', upload.array('image', 1), (req, res) => {
  res.send({ image: req.file });
});

module.exports = router;
