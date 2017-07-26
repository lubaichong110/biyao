require.config({//配置main_index.js所依赖的模块
	paths:{
		"jquery":"jquery-1.11.3",
		"cookie":"jquery.cookie",
		"yzm":"gVerify"
	}
})
require(["jquery"],function($){//先加载$，再加载cookie
	require(["cookie","yzm"],function(cookie,yzm){
     //引入尾部文件
     $(function(){
             $(".bottom").load("../data/data.html footer");
     })
     
     $(".account-phoneCode span").click(function(){
     	$(".account-imgCode").css("display","block");
     })
     
		     //将字符串转为对象
		function convertStrToObj(str){
			if(!str){
				return {};
			}
			//假设不为空："test1,123:test2,abc:test3,888:李涛,123"
			var users = str.split(":"); //将字符串转为数组 ["test1,123","test2,abc","test3,888"]
			var obj = {};
			/*
			 * var obj = new Object();
			 * obj["name"] = "zhangsan";
			 * 
			 */
			//遍历数组
			for(var i = 0; i < users.length; i ++){
				//将字符串转为数组
				var userData = users[i].split(",");
				//["test1",123] ["test2","abc"] ["test3",888]
				obj[userData[0]] = userData[1];
			}
			return obj;
		}
		
		//将对象转为字符串
		function convertObjToStr(obj){
			////假设不为空："test1,123:test2,abc:test3,888:李涛,123"
			var str = "";
			for(var usn in obj){
				var pwd = obj[usn];
				if(str){
					//看是否是第一组用户名和密码，如果不是，先在前面添加一个：
					str += ":";
				}
				str += usn + ',' + pwd;
			}
			return str;
		}

     
     
     var arr=[false,false,false,false];
     var complete = false;//表单提交，开始要让它默认不提交，
     function regCheck(){
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
     	//验证二维码
     	var verifyCode = new GVerify("container");
     	var res="";
     	$(".account-imgCode span").click(function(){
     		verifyCode.refresh();//刷新二维码
     	})
     	$("#imgCode").blur(function(){
     		res = verifyCode.validate($("#imgCode").val());//判断输入 二维码是否正确
     		console.log(res)
     		if(res){
     			arr[1]=true;
     			$(".account-imgCode .account-error").css("display","none");
     			$(this).removeClass("input-error");
     		}else{
     			$(".account-imgCode .account-error").css("display","block");
     			$(this).addClass("input-error");
     			$(".account-imgCode .account-error").html("图片验证码格式错误")
     		}
     	})
     	//验证短信验证码
     	$("#phoneCode").blur(function(){
     		if(!$(this).val()){
     			$(this).addClass("input-error");
     			$(".account-phoneCode .account-error").css("display","block");
     			$(".account-phoneCode .account-error").html("请输入短信验证码");
     		}
     	})
     	//验证密码格式
     	var regPwd =/^[a-zA-Z]\w{5,17}$/;
     	$("#password").blur(function(){
     		if(!regPwd.test($("#password").val())){
     			$(this).addClass("input-error");
     			$(this).next().css("display","block");
     			$(this).next().html("密码格式错误");
     		}else{
     			$(this).removeClass("input-error");
     			$(this).next().css("display","none");
     			arr[2]=true;
     		}
     	})
     	//验证再次输入密码
     	$("#repeatPassword").blur(function(){
     		if($(this).val()==$("#password").val()){
     			$(this).removeClass("input-error");
     			$(this).next().css("display","none");
     			arr[3]=true;
     		}else{
     			$(this).addClass("input-error");
     			$(this).next().css("display","block");
     			$(this).next().html("两次密码不一致，请重新输入");
     		}
     	})
     	
     }
     regCheck()
     
      $(".account-btn").click(function(){
      	console.log(complete)
      	
     		for(var i=0;i<arr.length;i++){
			 	if(arr[i] == false){
			 		regCheck()
			 		return ;
			 	}else{
			 		complete=true;
			 	}
			 }//判断是否能提交
			 if(complete){
			 	var username =$("#userName").val();
			 	var pwd =$("#password").val();
			 	//console.log(username+pwd)
			 	//提交数据，在这里就设置cookie
			 	//获取cookie中的用户信息
			 	var users = $.cookie("registerUsers") ? $.cookie("registerUsers") : "";
			 	//将字符串转为对象
			 	//console.log(users)
			 	users = convertStrToObj(users);
			 	if(username in users){ //判断usn属性是否在users对象中。
					alert("用户名已经被注册");
					return;
				}else{
					//注册成功，设置用户信息的cookie
					//registerUsers 设置cookie的name(key)值
					//将用户添加到已注册用户列表对象中
					users[username] = pwd;
					//将用户信息对象转化回字符串，以便于设置cookie
					userStr = convertObjToStr(users);
					//设置用户信息cookie
					$.cookie("registerUsers",userStr,7);
					//console.log(decodeURIComponent(document.cookie))
					location.href="http://localhost/JS/biyao/html/login.html";
				}
			 }
     	})
      

	})
})