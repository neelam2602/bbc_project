$(document).ready(function(){
	// alert("working")
	$(".btn_email").click(function(){
		// alert("email button working")
		var Info = $("#email").serialize();
		// alert(Info)
		$.post("/mail_action",Info).then(function(response){
			alert(response)
		})
	})
})

//create database email_info;

// create table user_info(
// 	id int auto_increment primary key,
// 	username varchar(255),
// 	mob_num bigint,
// 	email_id varchar(255),
// 	subject varchar(255)
// );