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
             function getCookie(){ //获取cookie    
		         var loginCode = $.cookie(username); //获取cookie中的用户名    
		         var pwd =  $.cookie(password); //获取cookie中的登陆密码    
		         if(pwd){//密码存在的话把“记住用户名和密码”复选框勾选住    
		            $("[name='checkbox']").attr("checked","true");    
		         }    
		         if(loginCode){//用户名存在的话把用户名填充到用户名文本框    
		            $("#login_code").val(loginCode);    
		         }    
		         if(pwd){//密码存在的话把密码填充到密码文本框    
		            $("#login_password").val($.base64.decode(pwd));   
		         }    
		    }
             $(.account-btn).click(function(){
             	var username =$("#userName").val();
             	var password =$("#password").val();
             	
             })
			function login(){     
			    var userName = $('#login_code').value;    
			    if(userName == ''){    
			        alert("请输入用户名。");    
			        return;    
			    }    
			    var userPass = $('#login_password').value;    
			    if(userPass == ''){    
			        alert("请输入密码。");    
			        return;    
			    }    
			    //判断是否选中复选框，如果选中，添加cookie  
			    if($("[name='checkbox']").attr("checked","true")){    
			        //添加cookie    
			        setCookie();    
			        alert("记住密码登录。");    
			        window.location = "http://www.baidu.com";    
			    }else{    
			        alert("不记密码登录。");    
			        window.location = "http://www.baidu.com";    
			    }    
			}    
         })
	})
})