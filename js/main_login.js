require.config({//配置main_index.js所依赖的模块
	paths:{
		"jquery":"jquery-1.11.3",
		"cookie":"jquery.cookie"
	}
})
require(["jquery"],function($){//先加载$，再加载cookie
	require(["cookie"],function(cookie){
		$(function(){
             $(".bottom").load("../data/data.html footer");
             //获取cookie
            function loginCheck(){
		     	//验证手机号
		     	var regPhone =/^((\d2,3)|(\d{3}\-))?13\d{9}$/;
		     	$("#userName").keyup(function(){
		     		if(regPhone.test($("#userName").val()) || $("#userName").val()==""){
		     	          $(".account-error").css("display","none")
		     	          
		     	    }
		     	})
		     	$("#userName").blur(function(){
		     		//console.log($("#userName").val())
		     		if(!regPhone.test($("#userName").val())){
			     	    $(".account-error").css("display","block");
			     	    $("#userName").addClass("input-error")
			     		$(this).next().html("手机号格式错误")
		     	   }else{
		     	   	arr[0]=true;
		     	   	$(".account-error").css("display","none");
			     	    $("#userName").removeClass("input-error")
		     	   }
		     		if($("#userName").val()==""){
		     	          $(".account-error").css("display","block");
		     	          $(this).next().html("请输入手机号")
		     	          
		     	   }
		     	})
		     	//验证密码格式
		     	$("#password").keyup(function(){
		     		if(regPhone.test($("#password").val()) || $("#password").val()==""){
		     	          $(".account-error").css("display","none")
		     	          
		     	    }
		     	})
		     	$("#password").blur(function(){
		     		//console.log($("#userName").val())
		     		if(!regPhone.test($("#password").val())){
			     	    $(".account-error").css("display","block");
			     	    $("#password").addClass("input-error")
			     		$(this).next().html("密码格式错误")
		     	   }else{
		     	   	arr[0]=true;
		     	   	$(".account-error").css("display","none");
			     	    $("#password").removeClass("input-error")
		     	   }
		     		if($("#password").val()==""){
		     	          $(".account-error").css("display","block");
		     	          $(this).next().html("请输入密码")
		     	          
		     	   }
		     	})
		     	
		     	
     	    }
            loginCheck();
            //是否下次登录
            $(".login-auto span b").click(function(){
            	if($(".login-auto span i").text()=="下次自动登录"){
            		$(this).css("background","url(../img/commonSprite.png) no-repeat -20px -80px")
                $(".login-auto span i").text("请勿在公用电脑上勾选此选项");
            	}else{
            		$(this).css("background","url(../img/commonSprite.png) no-repeat 0px -80px")
                $(".login-auto span i").text("下次自动登录");
            	}
            })
            
            
            	//给登录按钮加点击事件
			$(".account-btn").click(function(){
				//获取用户输入的用户名和密码
				var username = $("#userName").val();
				var pwd = $("#password").val();
				
				//校验用户名和密码是否正确
				//获取到cookie中的用户信息
				var users = $.cookie("registerUsers") ? $.cookie("registerUsers") : "";
				//将字符串转为对象
				users = convertStrToObj(users);
				console.log(users)
				if(users[username] == pwd){
					//登录成功
					$.cookie("loginedUsers",username,7);
					console.log("登录成功!");
					location.href = "http://localhost/JS/biyao/index.html";
				}else{
					//登录失败
					alert("用户名和密码不匹配，请确认后重试！");
				}
			})
            //将字符串转为对象
			function convertStrToObj(str){
				if(!str){ //如果是空字符串
					return {}; //返回空对象
				}
				var users = str.split(":");
				var obj = {};
				for(var i = 0; i < users.length; i ++){
					var userData = users[i].split(",");
					obj[userData[0]] = userData[1];
				}
				return obj;
			}
            
       })
	})
})