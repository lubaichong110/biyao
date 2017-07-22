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
     
     var arr=["flase","flase","flase","flase"];
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
     		console.log($("#userName").val())
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
//   		for(var i=0;i<arr.length;i++){
//			 	if(arr[i]==false){
//			 		//console.log("1")
//			 		return ;
//			 	}else{
//			 		complete=true;
//			 	}
//			 }//判断是否能提交
			 if(!complete){
			 	var username =$("#userName").val();
			 	var pwd =$("#password").val();console.log(username+pwd)
			 	//提交数据，在这里就设置cookie
			 	//删除指定路径cookie $.cookie('the_cookie', null, { path: '/' })
			 	$.cookie("user",username, { expires: 7, path: '/JS/biyao' });
			 	$.cookie("pwd",pwd, { expires: 7, path: '/JS/biyao' }); 
			 	//console.log($.cookie(username))
			 }
     	})
      

	})
})