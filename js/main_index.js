require.config({//配置main_index.js所依赖的模块
	paths:{
		"jquery":"jquery-1.11.3",
		"swiper":"swiper-3.4.2.jquery.min"
	}
})
require(["jquery"],function($){
	require(["swiper"],function(Swiper){
			$(function(){
            var swiper = new Swiper('.swiper-container', {
		        pagination: '.swiper-pagination',
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        paginationClickable: true,
		        spaceBetween: 30,
		        centeredSlides: true,
		        autoplay: 2500,
		        loop: true,
		        effect: 'fade'
		    });
		    
		    //手风琴效果
		    $('.container_2 ul li').mouseover(function(){
		    	$(".container_2 ul li i").css({
		        	"background": "rgba(0,0,0,0.3)"
		        })
		    	$(this).find("i").css({
		            "background": "rgba(0,0,0,0)"
		       })
		        $(this).stop().animate({
		            'width':'600px'
		        }).siblings().stop().animate({
		            'width':"110px"
		        })
		        
		    })
		    //二级菜单
		    function caidan(){
		    	var listLi=$(".nav-list .nav-main");
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
		    }
		    caidan()
		    //滚动出顶端菜单//回到顶部
		    window.onscroll = function(){ 
				 var t = document.documentElement.scrollTop || document.body.scrollTop; 
				 //console.log(t)
				 if(t>0){
				 	$(".backTop").css("display","block");
				 }
				 $(".backTop").click(function(){
				 	var speed=400;//滑动的速度
			        $('body,html').stop().animate({ scrollTop: 0 }, speed);
			        return false;
				 })
				 if( t >= 500 ) {
				 	$(".nav").css({
				 		"position":"fixed",
				 		"top":"0"
				 	})
				 	$(".nav-logo").css("display","none");
				 	$(".nav-category").css("display","block");
				 	$(".nav-search").css("margin-top","10px");
				 }else{
				 	$(".nav").css({
				 		"position":"",
				 		"top":"0"
				 	})
				 	$(".nav-logo").css("display","block");
				 	$(".nav-category").css("display","none")
				 }
				 $(".nav-category p").mouseover(function(){
				 	$(".nav-category .nav-list").css("display","block");
				 	$(".nav-category p i").css("background","url(./img/categoryUp.png) no-repeat");
				 })
				 $(".nav-category .nav-list").mouseover(function(){
				 	$(".nav-category .nav-list").css("display","block");
				 	$(".nav-category p i").css("background","url(./img/categoryUp.png) no-repeat");
				 })
				 $(".nav-category .nav-list").mouseleave(function(){
				 	$(".nav-category .nav-list").css("display","none");
				 	$(".nav-category p i").css("background","url(./img/categoryDown.png) no-repeat");
				 })
				 $(".nav-category p").mouseleave(function(){
				 	$(".nav-category .nav-list").css("display","none");
				 	$(".nav-category p i").css("background","url(./img/categoryDown.png) no-repeat");
				 })
				 
			}
		    //回到顶部特效
		    $(".app_code").mouseover(function(){
				 	$(".app_code").css("background","url(./img/rightBar-codeActive.png) no-repeat")
				 })
		    $(".app_code").mouseleave(function(){
				 	$(".app_code").css("background","url(./img/rightBar-code.png) no-repeat")
				 })
			$(".backTop").mouseover(function(){
				 	$(".backTop").css("background","url(./img/rightBar-topActive.png) no-repeat")
			})
			$(".backTop").mouseleave(function(){
				 	$(".backTop").css("background","url(./img/back_top.png) no-repeat")
			})
		    
		    //ajax加载json向列表传输数据
		    var str ="";
		    $.getJSON("./data/index.json",function(data){
		    	
		    	for(let j=0;j<data.length;j++){
		    		//遍历外包围对象
		    		//console.log(data[j].name)
		    		str+=`
		    		<div class="container_3">
			    		<div class="title">
			    			<p>`+data[j].name+`</p>
			    			<a href="#">查看全部></a>
			    		</div>
			    		<ul class="category_list">`;
			    for(let i=0;i<data[j].obj.length;i++){
			    	//console.log(data[j].obj[i])
		    	    if(i==0){
		    	    	str+=`<li>
	    				<a href="#">
	    					<i><img src="`+data[j].obj[i].img+`" alt="" /></i>
	    					<span>`+data[j].obj[i].info+`</span>
	    				</a>
	    			</li>`
		    	    }else{
	    	    	str+=`<li>
		    				<a href="#">
		    			         <i><img src="`+data[j].obj[i].img+`" alt="" /></i>
		    			         <dl><dt>`+data[j].obj[i].info+`</dt><dd>`+ data[j].obj[i].price +`</dd></dl>
		    				</a>
		    			  </li>`
		    	    }
		    	}//for
		    	str+=`
		    	    </ul>
	    	    </div>
		    	`
		    }
		    $(".main").append(str)
          })
		    var a=1;
		  //滚到到一定高度再加载一堆
		  $(window).scroll(function(){
		  	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; 
		  	//console.log(scrollTop)
		  	if(scrollTop>5600){
		  	var str ="";
		  	if(a){
		  		a=0;
		  		$.getJSON("./data/index2.json",function(data){
		    	
		    	for(let j=0;j<data.length;j++){
		    		//遍历外包围对象
		    		//console.log(data[j].name)
		    		str+=`
		    		<div class="container_3">
			    		<div class="title">
			    			<p>`+data[j].name+`</p>
			    			<a href="#">查看全部></a>
			    		</div>
			    		<ul class="category_list">`;
			    for(let i=0;i<data[j].obj.length;i++){
			    	//console.log(data[j].obj[i])
		    	    if(i==0){
		    	    	str+=`<li>
	    				<a href="#">
	    					<i><img src="`+data[j].obj[i].img+`" alt="" /></i>
	    					<span>`+data[j].obj[i].info+`</span>
	    				</a>
	    			</li>`
		    	    }else{
	    	    	str+=`<li>
		    				<a href="#">
		    			         <i><img src="`+data[j].obj[i].img+`" alt="" /></i>
		    			         <dl><dt>`+data[j].obj[i].info+`</dt><dd>`+ data[j].obj[i].price +`</dd></dl>
		    				</a>
		    			  </li>`
		    	    }
		    	}//for
		    	str+=`
		    	    </ul>
	    	    </div>
		    	`
		    }
		    $(".main").append(str)
          })
		  	}
		  	}
		  })
		  
		    
        })//$
	})//require
})
