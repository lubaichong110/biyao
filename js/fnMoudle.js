define(function(){
	function menu(){
		    //滚动出顶端菜单//回到顶部
		    
		    window.onscroll = function(){ 
				 var t = document.documentElement.scrollTop || document.body.scrollTop; 
				 //console.log(t)
				 if(t>100){
				 	$(".backTop").css("display","block");
				 	$(".sharCode li").css("z-index","99")
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
				 		    		    //回到顶部特效
		    $(".app_code").mouseover(function(){
				 	$(".app_code").css("background","url(/biyao/img/rightBar-codeActive.png) no-repeat")
				 })
		    $(".app_code").mouseleave(function(){
				 	$(".app_code").css("background","url(/biyao/img/rightBar-code.png) no-repeat")
				 })
			$(".backTop").mouseover(function(){
				 	$(".backTop").css("background","url(/biyao/img/rightBar-topActive.png) no-repeat")
			})
			$(".backTop").mouseleave(function(){
				 	$(".backTop").css("background","url(/biyao/img/back_top.png) no-repeat")
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
				    right: "30px",
				    bottom: "100px",
				    height: "144px",
		         	top: "",
				    width: "",
				    background: ""
		         })
		    })
		    }
		    return {
		    	menu : menu,
		    	code : code
		    }
})
