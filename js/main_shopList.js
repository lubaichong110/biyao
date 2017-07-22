require.config({//配置main_index.js所依赖的模块
	paths:{
		"jquery":"jquery-1.11.3",
		"fnMoudle":"fnMoudle"
	}
})
require(["jquery","fnMoudle"],function($,fnMoudle){
	$(function(){
		$(".code").load("../data/data.html .sharCode",function(){
			fnMoudle.code();
		});
		$(".top").load("../data/data.html header");
		$(".nav_fixed").load("../data/data.html .nav");
        $(".bottom").load("../data/data.html footer");
        fnMoudle.menu();
        

		
        
        
        var shop_index =0;//男装
        //加载商品列表信息
        $.getJSON("../data/shopList.json",function(res){
        	//console.log(res[0].obj[0].obj[0].info)
        	var data =res[shop_index]
        	console.log(data.obj[0].obj.length)
            var str ="";
            for(var i=0;i<data.obj.length;i++){
            	str+=`
		            <ul class="shop_ul">
					<li class="shop_li">
						<dl>
							<dt>`+data.obj[i].name+`</dt>
							<dd></dd>
						</dl>
						<ul>`
            	           
            	           for(var j=0;j<data.obj[i].obj.length;j++){
            	           	str+=`<li>
								<a href="#">
									<i><img src="`+data.obj[i].obj[j].img+`"/></i>
									<dl>
										<dt>`+data.obj[i].obj[j].info+`</dt>
										<dd>`+data.obj[i].obj[j].price+`</dd>
									</dl>
								</a>
							</li>`
            	           }
            	           
				str+=`</ul>
					</li>
				</ul>`
            }
            $(".shop-list").append(str)
            	var t = document.documentElement.scrollTop || document.body.scrollTop;
                var $shopLi =$(".cateBread ul li");
	        	var $shopUl =$(".shop_ul");
        	
        		for(let i=0;i<$shopLi.length;i++){
	        		$($shopLi[i]).click(function(){
	        			console.log($shopUl)
	        		
	        			console.log($shopUl.eq(i).offset().top)
	        			var str =$shopUl.eq(i).offset().top-100;
	        			var speed=10;
	        			$('body,html').stop().animate({ scrollTop: str }, speed);
	        		})
        	   }
	            
        })
            
        	
        
        
        
	})//$
})