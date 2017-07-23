require.config({//配置main_index.js所依赖的模块
	paths:{
		"jquery":"jquery-1.11.3",
		"fnMoudle":"fnMoudle",
		"cookie":"jquery.cookie"
	}
})
require(["jquery"],function($){
	require(["cookie","fnMoudle"],function(cookie,fnMoudle){
		$(".code").load("../data/data.html .sharCode",function(){
			fnMoudle.code();
			//fnMoudle.menu();
		});
	    $(".top").load("../data/data.html header",function(){
	    	fnMoudle.logStatus();
	    });
		$(".nav_fixed").load("../data/data.html .nav");
        $(".bottom").load("../data/data.html footer");
        
        var $lis =$(".editor-picture ul li");//li
        for(let i=0;i<$lis.length;i++){
        	$lis.eq(i).click(function(){
        		$(".editor-picture p img").attr({src:"../img/shop1_1_ (1)_"+(i+1)+".jpg"});
        	})
        }
        //右侧小图
        var $color =$(".color");
        for(var i=0;i<$color.length;i++){
        	
        	$color.eq(i).click(function(){
        		for(var i=0;i<$color.length;i++){
        			$color.eq(i).find("em").css("display","none");
        			$color.eq(i).css({border: "1px solid #ccc"})
        		}
        		$(".editor-picture p img").attr({src:$(this).find("img").attr("src")});
        		$(this).find("em").css("display","block");
        		$(this).css({border: "1px solid #523669"})
        	})
        	$color.eq(i).mouseover(function(){
        		$(this).find("i").css("display","block");
        	})
        	$color.eq(i).mouseleave(function(){
        		$(this).find("i").css("display","none");
        	})
        }
        //size
        var $size = $(".size ul li");
        for(var i=0;i<$size.length;i++){
        	$size.eq(i).click(function(){
        		for(var i=0;i<$size.length;i++){
        			$size.eq(i).find("em").css("display","none");
        			$size.eq(i).css({border: "1px solid #ccc"})
        		}
        		$(this).find("em").css("display","block");
        		$(this).css({border: "1px solid #523669"})
        	})
        }
        //-
        $(".panel-minus").click(function(){
        	if($(".panel-number").text()>1){
        		$(".panel-number").text($(".panel-number").text()-1)
        	}
        })
        //+
        $(".panel-add").click(function(){
        	$(".panel-number").text(Number($(".panel-number").text())+1)
        })
        
        //sup_logo
        $(".sup_logo").mouseenter(function(){
        	$(this).find("div").css("display","block");
        })
        $(".sup_logo").mouseleave(function(){
        	$(this).find("div").css("display","none");
        })
        
        //选项卡
        $(".view_title ul li").eq(0).click(function(){
        	$(".view_detail").css("display","block")
        	$(".view_comment").css("display","none")
        })
        $(".view_title ul li").eq(1).click(function(){
        	$(".view_detail").css("display","none")
        	$(".view_comment").css("display","block")
        })

	})
})