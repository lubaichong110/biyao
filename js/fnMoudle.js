define(function(){

	function menu(){
		    //滚动出顶端菜单//回到顶部
		    window.onscroll = function(){ 
				 var t = document.documentElement.scrollTop || document.body.scrollTop; 
				 //console.log(t)
				 if(t>150){
				 	$(".backTop").css("display","block");
				 	$(".sharCode li").css("z-index","99")
				 }else{
				 	$(".backTop").css("display","none");
				 }
				 $(".backTop").click(function(){
				 	var speed=500;//滑动的速度
			        $('body,html').stop().animate({ scrollTop: 0 }, speed);
			        return false;
				 })

            
		    var listLi=$(".nav-list .nav-main");//二级菜单
		    var a1s=$(".nav-main>p a");
		    var a2s=$(".nav-item a")
		    for(let i=0;i<listLi.length;i++){
		    	//console.log($(listLi[i]).children().has("li"))
		    	$(listLi[i]).mouseover(function(){
		    	    $(this).children().has("li").css("display","block");		    		
		    	})
		    	$(listLi[i]).mouseleave(function(){
		    		 $(this).children().has("li").css("display","none");		
		    	})
		    }
		    for(var i=0; i<a1s.length;i++){
		    	$(a1s[i]).mouseover(function(){
		    		this.style.color="#f7b200";
		    	})
		    	$(a1s[i]).mouseleave(function(){
		    		this.style.color="#fff";
		    	})
		    }
		    for(var i=0; i<a2s.length;i++){
		    	$(a2s[i]).css("font-size","12px");
		    	$(a2s[i]).mouseover(function(){
		    		this.style.color="#523669";
		    	})
		    	$(a2s[i]).mouseleave(function(){
		    		this.style.color="#808080";
		    	})
		    }
             //滚动出顶部菜单
				 if( t >= 500 ) {
				  var timerNav=	setTimeout(function(){
				 		$(".nav").css({
				 		"position":"fixed",
				 		"top":"0",
				 		"z-index":"99"
				 	})
				 	$(".nav-logo").css("display","none");
				 	$(".nav-category").css("display","block");
				 	$(".nav-search").css("margin-top","10px");
				 	},100)
				 }else{
				 	clearTimeout(timerNav);
				 	$(".nav").css({
				 		"position":""
				 	})
				 	$(".nav-search").css("margin-top","30px");
				 	$(".nav-logo").css("display","block");
				 	$(".nav-category").css("display","none")
				 }
				 $(".nav-category p").mouseover(function(){
				 	$(".nav-category .nav-list").css("display","block");
				 	$(".nav-category p i").css("background","url(../img/categoryUp.png) no-repeat");
				 })
				 $(".nav-category .nav-list").mouseover(function(){
				 	$(".nav-category .nav-list").css("display","block");
				 	$(".nav-category p i").css("background","url(../img/categoryUp.png) no-repeat");
				 })
				 $(".nav-category .nav-list").mouseleave(function(){
				 	$(".nav-category .nav-list").css("display","none");
				 	$(".nav-category p i").css("background","url(../img/categoryDown.png) no-repeat");
				 })
				 $(".nav-category p").mouseleave(function(){
				 	$(".nav-category .nav-list").css("display","none");
				 	$(".nav-category p i").css("background","url(../img/categoryDown.png) no-repeat");
				 })
			}
		    
		    }//menu
		    
		    //分享框
		    function code(){
		    	$(".shar_btn").click(function(){
		         $(".share_box").css("display","block");
		         $(".sharCode").css({
		         	display:"block",
		         	top: 0,
				    left: 0,
				    zIndex: 110,
				    height: "100%",
				    width: "100%",
				    background: "rgba(0,0,0,.5)"
		         })
		         $(".sharCode>li").css({
		         	display:"none" 
		         })
	       })
			$(".close").click(function(){
				
		    	$(".share_box").css("display","none");
		    	$(".sharCode>li").css({
		         	display:"block" 
		         })
		         $(".sharCode").css({
		         	position: "fixed",
		         	background: "rgba(0,0,0,0)",
		         	width:"48px",
		         	left:"",
		         	top:"",
				    right: "30px",
				    bottom: "100px",
				    zIndex: "101",
				    height: "144px"
		         })
		    })
							 		    		    //回到顶部特效
		    $(".app_code").mouseover(function(){
				 	$(".app_code").css("background","url(../img/rightBar-codeActive.png) no-repeat")
				 })
		    $(".app_code").mouseleave(function(){
				 	$(".app_code").css("background","url(../img/rightBar-code.png) no-repeat")
				 })
			$(".backTop").mouseover(function(){
				 	$(".backTop").css("background","url(../img/rightBar-topActive.png) no-repeat")
			})
			$(".backTop").mouseleave(function(){
				 	$(".backTop").css("background","url(../img/back_top.png) no-repeat")
			})
		    }
		    
		    //接收cookie
		    function logStatus(){
		    	
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
		    	
				//获取到cookie中的用户信息
				var users = $.cookie("loginedUsers",{path:"/biyao"}) ? $.cookie("loginedUsers",{path:"/"}) : "";
				
				//将字符串转为对象
				//users = convertStrToObj(users);
				//console.log(users)
                //获取用户输入的用户名和密码
                if(users){
                	$(".user-out").css({
                		width:130,
                		textAlign:"center"
                	})
                	var str=`
                	<div>
					<i></i>
					<ul>
						<li><a href="#">我的订单</a></li>
						<li><a href="#">个人中心</a></li>
						<li><a href="#">退出登录</a></li>
					</ul>
				</div>`
                	$(".user-out").html(str+users+"<span></span><b></b>");
                	$(".user-out").mouseover(function(){
                		$(".user-out div").css("display","block");
                	})
                	$(".user-out").mouseleave(function(){
                		$(".user-out div").css("display","none");
                	})
                	//退出登录
                	$(".user-out div a").eq(2).click(function(){
                		$.cookie("loginedUsers",null,{path:"/"});
                		window.location.href = "http://localhost/JS/biyao/index.html";
                	})
                }
				
				function convertCartStrToObj(cartStr){
				//如果是空字符串，即没有购物车信息，那么购物车为空，直接返回一个空对象
				if(!cartStr){
					return {};
				}
				var goods = cartStr.split(":");
				var obj = {};
				for(var i = 0; i < goods.length; i ++){
					var data = goods[i].split(",");
					//以商品的id为健，商品的其他信息为值，这个值也设计为一个对象
					obj[data[0]] = {
						name : data[1],
						price : parseFloat(data[2]),
						num : parseInt(data[3]),
						src : data[4],
						color :data[5]
					}
				}
				return obj;
			}
			
				
			//加载购物车中的信息（使商品页与购物车页中的购物车数量同步）
			function loadCart(){
				var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
					var cartObj = convertCartStrToObj(cartStr);
					//获取到购物车中所有商品的数量
					var total = 0;
					for(var id in cartObj){
						total += cartObj[id].num;
					}
					$("#shopCar").html(total);
					
			}
			loadCart()	
				
		   }
		    //添加点击事件
		    function tiaozhuan(){
		    	$(".nav-main p a:first-child").click(function(){
		    		$.cookie("shop_index",0);
		    		location.href="http://localhost/JS/biyao/html/shopList.html";
		    	})
		    	$(".nav-main p a:last-child").click(function(){
		    		$.cookie("shop_index",1);
		    		location.href="http://localhost/JS/biyao/html/shopList.html";
		    	})
		    }
		    
		    
		    
		    
		    
		    return {
		    	menu : menu,
		    	code : code,
		    	logStatus : logStatus,
		    	tiaozhuan : tiaozhuan
		    }
})
