const express = require('express')
const app = express()
const nodemailer = require("nodemailer")
const bodyParser = require('body-parser')
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index.ejs')
})
app.post('/send-mail', (req, res) => {
    var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "Your Email",
            pass: "Email password"
        }
    });
    var mailOptions,host,link;
    host=req.get('host');
    link="http://"+req.get('host')+"/verify-email?id="+'sender';
    mailOptions={
        to : "Sender Email",
        subject : "Please confirm your Email account",
        html : "Please Click on the link to verify your email. <br><br> <a href="+link+">Click here to verify</a>"
    }
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            return res.send(error)
        }else{
            return res.send('okk')
        }
    });
})
app.get('/verify-email', (req, res) => {
    res.render('verify.ejs', {
        id: req.query.id
    })
})

app.listen(4020)
