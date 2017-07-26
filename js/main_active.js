require.config({//配置main_index.js所依赖的模块
	paths:{
		"jquery":"jquery-1.11.3",
		"cookie":"jquery.cookie",
		"fnMoudle":"fnMoudle"
	}
})
require(["jquery"],function($){
	require(["cookie","fnMoudle"],function(cookie,fnMoudle){
		 $(".code").load("../data/data.html .sharCode",function(){
			fnMoudle.code();
			fnMoudle.menu();
		});
	    $(".top").load("../data/data.html header",function(){
	    	fnMoudle.logStatus();
	    });
		$(".nav_fixed").load("../data/data.html .nav");
        $(".bottom").load("../data/data.html footer");
          
          
  
        $.getJSON("../data/active.json",function(res){
    	var str ="";
    	for(var i=0;i<1;i++){
    		//console.log(res[i].saleTime)//7月7日
//      		console.log(res[i].item[0].salePoint)//
//      		console.log(res[i].item[0].price)//
//      		console.log(res[i].item[0].title)//
//      		console.log(res[i].item[0].imageUrl)//
            str +=`<li>
				<div class="newTitle"> <b>`+res[i].saleTime+`</b></div>`
    		for(var j=0;j<res[i].item.length;j++){
    			//console.log(res[i].item[j])
    			str+=`
    			<a href="javascript:;" class="pro">
					<dl>
						<dt>
							<h2>`+res[i].item[j].salePoint+`</h2>
							<h3>`+res[i].item[j].price+`</h3>
						</dt>
						<dd>`+res[i].item[j].title+`</dd>
					</dl>
					<img src="`+res[i].item[j].imageUrl+`"/>
				</a>
    			`
    		}
    		str+=`</li>`;
    	}
    	$(".newProduct ul").append(str)
    	$(".pro").click(function(){
			$.cookie("shop_index",0);
			location.href="http://localhost/JS/biyao/html/shopList.html";
		})
    })
            var start_index =1;
          	var end_index =2;
          $(window).scroll(function(){
		  	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; 
		  	console.log(scrollTop)
		  	console.log($(".newProduct ul li a:last-child").offset().top)
            if(scrollTop>$(".newProduct ul li a:last-child").offset().top-500){
            	        $.getJSON("../data/active.json",function(res){
                            var last_index = res.length;
				        	var str ="";
				        	for(var i=start_index;i<end_index;i++){
				        		//console.log(res[i].saleTime)//7月7日
				//      		console.log(res[i].item[0].salePoint)//
				//      		console.log(res[i].item[0].price)//
				//      		console.log(res[i].item[0].title)//
				//      		console.log(res[i].item[0].imageUrl)//
				                str +=`<li>
									<div class="newTitle"> <b>`+res[i].saleTime+`</b></div>`
				        		for(var j=0;j<res[i].item.length;j++){
				        			//console.log(res[i].item[j])
				        			str+=`
				        			<a href="javascript:;">
										<dl>
											<dt>
												<h2>`+res[i].item[j].salePoint+`</h2>
												<h3>`+res[i].item[j].price+`</h3>
											</dt>
											<dd>`+res[i].item[j].title+`</dd>
										</dl>
										<img src="`+res[i].item[j].imageUrl+`"/>
									</a>
				        			`
				        		}
				        		str+=`</li>`;
				        	}
				        	
				        	$(".newProduct ul").append(str)
				        	start_index++;
                            end_index++;
                            if(end_index>last_index){
                            	end_index=last_index;
                            }
				        	
				        })
            	
            }
          })
        
   
	})
})