var express = require('express');
// console.log(express)

var mysql = require('mysql');
var bodyParser = require('body-parser')

const nodemailer = require('nodemailer');

// let transporter = nodemailer.createTransport({
//         host: 'mail.php-training.in',
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: 'vishal@php-training.in', // generated ethereal user
//             pass: 'Vishal@123' // generated ethereal password
//         },tls: {
//         rejectUnauthorized:false
//     }
// });

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'neelamsoni854@gmail.com',
        pass: 'shyamkalavati'
    }
});


var connection = mysql.createConnection({
	host : "localhost",
	user : "root",
	password:"",
	database : "email_info"
})
// console.log(connection)


var app = express();
// console.log(app)
app.set('view engine','pug');
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/abc', express.static(__dirname + '/public'));//inside current_dir/public/abc

app.get('/',function(req,res){
	res.render('home');
})

app.post('/submit_action',function(req,res){
	data1 = req.body.x1;
	// console.log(data1)
	data2 = req.body.x2;
	data3 = req.body.x3;
	data4 = req.body.x4;
	msg = "My name is "+data1 +" and my mobile num is "+ data2;
	// console.log(msg);
	

	const mailOptions = {
	  from: 'neelamsoni854@gmail.com', // sender address
	  to: data3, // list of receivers
	  subject: data4, // Subject line
	  text: msg// plain text body
	};
	transporter.sendMail(mailOptions, function (err, info) {
	   if(err)
	     console.log(err)
	   else
	     res.send("Mail sent successfully")
	});
    // connection.query("insert into user_info (username,mob_num,email_id,subject) values ('"+data1+"','"+data2+"','"+data3+"','"+data4+"')",function(err,result){
    // 	if(err){
    // 		console.log(err)
    // 	}
    // 	else{
    // 		console.log("success")
    // 	}
    // })
})
app.post('/mail_action',function(req,res){
	// res.send("hello")
	data1 = req.body.x1;
	// console.log(data1)
	data2 = req.body.x2;
	data3 = req.body.x3;
	data4 = req.body.x4;
	msg = "My name is "+data1 +" and my mobile num is "+ data2;
	let mailOptions = {
        from: "neelamsoni854@gmail.com", // sender address
        to: data3, // list of receivers
        subject: data4, // Subject line
        text:msg// plain text body
        
    };

	transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.send("mail sent successfully")//calls alert(response)
    });
    connection.query("insert into user_info (username,mob_num,email_id,subject) values ('"+data1+"','"+data2+"','"+data3+"','"+data4+"')",function(err,result){
    	if(err){
    		console.log(err)
    	}
    	else{
    		console.log("successfully added to database")
    	}
    })
})
app.listen(3001)